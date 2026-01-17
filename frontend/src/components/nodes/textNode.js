// textNode.js

import { useState, useEffect, useMemo, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

/**
 * Validates if a string is a valid JavaScript identifier
 */
const isValidIdentifier = (str) => {
  // JavaScript identifier regex: starts with letter, $, or _, followed by alphanumeric, $, or _
  const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return identifierRegex.test(str);
};

/**
 * Parses text for variables in {{variableName}} format
 * Returns array of valid variable names
 */
const parseVariables = (text) => {
  const variableRegex = /\{\{([^}]+)\}\}/g;
  const matches = [];
  let match;
  
  while ((match = variableRegex.exec(text)) !== null) {
    const variableName = match[1].trim();
    if (isValidIdentifier(variableName)) {
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
  }
  
  return matches;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Parse variables from text
  const variables = useMemo(() => parseVariables(currText), [currText]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(60, scrollHeight)}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Dynamic handles: one target handle for each variable, plus source output handle
  const handles = useMemo(() => {
    const handleArray = [];
    
    // Create target handles for each variable
    variables.forEach((variable, index) => {
      handleArray.push({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        style: variables.length > 1 ? { 
          top: `${((index + 1) * 100) / (variables.length + 1)}%` 
        } : {}
      });
    });
    
    // Add source output handle
    handleArray.push({
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    });
    
    return handleArray;
  }, [id, variables]);

  // Calculate node height based on content
  const nodeHeight = useMemo(() => {
    const baseHeight = 120; // Base height for title and padding
    const textHeight = textareaRef.current?.scrollHeight || 60;
    const variableInfoHeight = variables.length > 0 ? 30 : 0;
    return Math.max(100, baseHeight + textHeight + variableInfoHeight);
  }, [currText, variables.length]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      style={{ minHeight: `${nodeHeight}px`, width: 250 }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
          Text
        </span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text... Use {{variableName}} for variables"
          rows={3}
          style={{
            padding: '8px',
            border: '1px solid #d0d0d0',
            borderRadius: '4px',
            fontSize: '12px',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
            minHeight: '60px',
            overflow: 'hidden',
          }}
          onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
          onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
        />
      </label>
      
      {variables.length > 0 && (
        <div style={{ 
          marginTop: '8px', 
          padding: '6px 8px', 
          backgroundColor: '#f0f4ff',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#667eea'
        }}>
          <strong>Variables:</strong> {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
}
