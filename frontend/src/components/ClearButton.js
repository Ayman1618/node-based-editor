// ClearButton.js

import { useStore } from '../store';
import './ClearButton.css';

export const ClearButton = () => {
  const clearCanvas = useStore((state) => state.clearCanvas);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the canvas? This will remove all nodes and connections.')) {
      clearCanvas();
    }
  };

  return (
    <button className="clear-button" onClick={handleClear} title="Clear Canvas">
      <span className="clear-button-icon">🗑️</span>
      <span className="clear-button-text">Clear Canvas</span>
    </button>
  );
}
