// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeSelectField, NodeTextField } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customFunction, setCustomFunction] = useState(data?.customFunction || '');

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  const handleFunctionChange = (e) => {
    setCustomFunction(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
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
      title="Transform"
      handles={handles}
    >
      <NodeSelectField
        label="Transform Type"
        value={transformType}
        onChange={handleTypeChange}
        options={[
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'trim', label: 'Trim' },
          { value: 'custom', label: 'Custom' }
        ]}
      />
      {transformType === 'custom' && (
        <NodeTextField
          label="Custom Function"
          value={customFunction}
          onChange={handleFunctionChange}
          placeholder="e.g., value.toUpperCase()"
        />
      )}
    </BaseNode>
  );
}
