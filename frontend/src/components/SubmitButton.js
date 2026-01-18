// SubmitButton.js
import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { ResultModal } from './ResultModal';
import './SubmitButton.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);
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
      
      // Display results in a user-friendly modal
      setResult(result);
      setShowModal(true);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running at ${API_BASE_URL}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
      
      {result && (
        <ResultModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          result={result}
        />
      )}
    </>
  );
}
