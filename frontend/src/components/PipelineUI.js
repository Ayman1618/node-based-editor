// PipelineUI.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { NumberNode } from './nodes/numberNode';
import { ConditionNode } from './nodes/conditionNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';

import 'reactflow/dist/style.css';
import './PipelineUI.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  number: NumberNode,
  condition: ConditionNode,
  transform: TransformNode,
  filter: FilterNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          event.stopPropagation();
    
          // Check if reactFlowInstance is available
          if (!reactFlowInstance || !reactFlowWrapper.current) {
            console.warn('ReactFlow instance not ready');
            return;
          }

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const data = event.dataTransfer.getData('application/reactflow');
          
          if (data) {
            try {
              const appData = JSON.parse(data);
              const type = appData?.nodeType;
        
              // check if the dropped element is valid
              if (typeof type === 'undefined' || !type) {
                console.warn('Invalid node type:', type);
                return;
              }
        
              const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
              });

              const nodeID = getNodeID(type);
              const newNode = {
                id: nodeID,
                type,
                position,
                data: getInitNodeData(nodeID, type),
                selected: false,
                dragging: false,
              };
        
              console.log('Adding node:', newNode);
              addNode(newNode);
            } catch (error) {
              console.error('Error parsing drop data:', error);
            }
          } else {
            console.warn('No drop data found');
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div className="pipeline-ui-wrapper">
            <div ref={reactFlowWrapper} className="pipeline-ui-container">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                    connectionLineType='smoothstep'
                    deleteKeyCode={null}
                    multiSelectionKeyCode={null}
                >
                    <Background color="#e0e0e0" gap={gridSize} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </div>
    )
}
