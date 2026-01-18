import './ResultModal.css';

export const ResultModal = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Pipeline Analysis Results</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="result-stat">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">Number of Nodes</div>
              <div className="stat-value">{result.num_nodes}</div>
            </div>
          </div>
          
          <div className="result-stat">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <div className="stat-label">Number of Edges</div>
              <div className="stat-value">{result.num_edge}</div>
            </div>
          </div>
          
          <div className="result-stat">
            <div className="stat-icon">{result.is_dag ? '✅' : '❌'}</div>
            <div className="stat-content">
              <div className="stat-label">Is DAG</div>
              <div className={`stat-value ${result.is_dag ? 'stat-success' : 'stat-error'}`}>
                {result.is_dag ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
          
          <div className={`result-message ${result.is_dag ? 'message-success' : 'message-warning'}`}>
            {result.is_dag 
              ? '✅ This pipeline is a valid Directed Acyclic Graph!' 
              : '⚠️ Warning: This pipeline contains cycles and is not a valid DAG.'}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
