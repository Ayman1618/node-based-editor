// BaseNode.js
// Base abstraction for all node components

import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A flexible base component for creating node types
 * 
 * @param {string} id - Unique identifier for the node
 * @param {object} data - Node data/properties
 * @param {string} title - Title to display at the top of the node
 * @param {ReactNode} children - Content to render inside the node body
 * @param {Array} handles - Array of handle configurations
 * @param {object} style - Optional custom styles for the node container
 * @param {string} className - Optional CSS class name
 */
export const BaseNode = ({ 
  id, 
  data = {}, 
  title, 
  children, 
  handles = [], 
  style = {},
  className = ''
}) => {
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
    ...style
  };

  return (
    <div 
      className={`base-node ${className}`}
      style={defaultStyle}
    >
      {/* Title section */}
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

      {/* Content body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>

      {/* Render all handles */}
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

/**
 * Helper function to create a text input field
 */
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

/**
 * Helper function to create a select dropdown field
 */
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

/**
 * Helper function to create a textarea field
 */
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
