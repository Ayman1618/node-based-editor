import { Handle, Position } from 'reactflow';

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
