// SubmitButton.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import './SubmitButton.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (nodes.length === 0) {
      alert('Please add at least one node to the pipeline before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare pipeline data - extract only necessary fields
      const pipelineData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        }))
      };

      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Display user-friendly alert with the results
      const message = `
Pipeline Analysis Results:

📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edge}
${result.is_dag ? '✅' : '❌'} Is DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag 
  ? 'This pipeline is a valid Directed Acyclic Graph!' 
  : 'Warning: This pipeline contains cycles and is not a valid DAG.'}
      `.trim();

      alert(message);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running at ${API_BASE_URL}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <button 
        className="submit-button" 
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <span className="submit-button-text">
          {isLoading ? 'Processing...' : 'Submit Pipeline'}
        </span>
      </button>
    </div>
  );
}
