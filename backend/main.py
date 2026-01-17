from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edge: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG).
    Uses topological sort algorithm - if we can complete topological sort,
    the graph is a DAG (no cycles).
    """
    # Build adjacency list and calculate in-degrees
    node_ids = {node.id for node in nodes}
    adjacency_list = {node_id: [] for node_id in node_ids}
    in_degree = {node_id: 0 for node_id in node_ids}
    
    # Build graph from edges
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adjacency_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    # Topological sort using Kahn's algorithm
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    processed_count = 0
    
    while queue:
        current = queue.pop(0)
        processed_count += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in adjacency_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG (no cycles)
    # If processed_count < len(node_ids), there's a cycle
    return processed_count == len(node_ids)

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse the pipeline and return:
    - Number of nodes
    - Number of edges
    - Whether the pipeline is a DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edge = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edge=num_edge,
        is_dag=is_dag_result
    )
