# Backend Setup

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The server will run on `http://localhost:8000`

## API Endpoints

### POST `/pipelines/parse`

Parses a pipeline and returns analysis results.

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "position": {"x": 0, "y": 0},
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "string",
      "source": "string",
      "target": "string",
      "sourceHandle": "string",
      "targetHandle": "string"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edge": 4,
  "is_dag": true
}
```

## DAG Detection

The backend uses topological sort (Kahn's algorithm) to detect cycles in the graph. If the graph has no cycles, it's a Directed Acyclic Graph (DAG).
