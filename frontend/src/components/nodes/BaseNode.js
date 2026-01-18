import { Handle } from 'reactflow';
import { useStore } from '../../store';
import './BaseNode.css';

// Base component for all node types - provides structure, styling, and handles
export const BaseNode = ({ 
  id, 
  data = {}, 
  title, 
  children, 
  handles = [], 
  style = {},
  className = ''
}) => {
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const edges = useStore((state) => state.edges);

  const handleDelete = (e) => {
    e.stopPropagation();
    
    // Remove the node
    onNodesChange([{ type: 'remove', id }]);
    
    // Remove all edges connected to this node
    const edgesToRemove = edges
      .filter(edge => edge.source === id || edge.target === id)
      .map(edge => ({ type: 'remove', id: edge.id }));
    
    if (edgesToRemove.length > 0) {
      onEdgesChange(edgesToRemove);
    }
  };

  const defaultStyle = {
    width: 200,
    minHeight: 80,
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'relative',
    ...style
  };

  return (
    <div 
      className={`base-node ${className}`}
      style={defaultStyle}
    >
      <button
        className="node-delete-button"
        onClick={handleDelete}
        title="Delete node"
        type="button"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 3.5H10.5M11.0833 3.5V11.6667C11.0833 12.125 10.7083 12.5 10.25 12.5H3.75C3.29167 12.5 2.91667 12.125 2.91667 11.6667V3.5M4.66667 3.5V2.33333C4.66667 1.875 5.04167 1.5 5.5 1.5H8.5C8.95833 1.5 9.33333 1.875 9.33333 2.33333V3.5M5.83333 6.41667V9.58333M8.16667 6.41667V9.58333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {title && (
        <div style={{
          fontWeight: '600',
          fontSize: '14px',
          marginBottom: '8px',
          color: '#333',
          borderBottom: '1px solid #e0e0e0',
          paddingBottom: '6px'
        }}>
          {title}
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>

      {handles.map((handle, index) => (
        <Handle
          key={`${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};

// Reusable field components for node inputs
export const NodeTextField = ({ 
  label, 
  value, 
  onChange, 
  placeholder = '',
  style = {} 
}) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}>
      <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: '6px 8px',
          border: '1px solid #d0d0d0',
          borderRadius: '4px',
          fontSize: '12px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
        onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
      />
    </label>
  );
};

export const NodeSelectField = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  style = {} 
}) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}>
      <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        style={{
          padding: '6px 8px',
          border: '1px solid #d0d0d0',
          borderRadius: '4px',
          fontSize: '12px',
          outline: 'none',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
        onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export const NodeTextareaField = ({ 
  label, 
  value, 
  onChange, 
  placeholder = '',
  rows = 3,
  style = {} 
}) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}>
      <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{
          padding: '6px 8px',
          border: '1px solid #d0d0d0',
          borderRadius: '4px',
          fontSize: '12px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
        onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
      />
    </label>
  );
};
