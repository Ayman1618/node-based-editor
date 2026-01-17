// numberNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeTextField } from './BaseNode';

export const NumberNode = ({ id, data }) => {
  const [numberValue, setNumberValue] = useState(data?.value !== undefined ? String(data.value) : '0');

  const handleValueChange = (e) => {
    const value = e.target.value;
    // Allow empty string for editing, but validate on blur
    if (value === '' || !isNaN(value)) {
      setNumberValue(value);
    }
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Number"
      handles={handles}
    >
      <NodeTextField
        label="Value"
        value={numberValue}
        onChange={handleValueChange}
        placeholder="Enter a number"
      />
    </BaseNode>
  );
}
