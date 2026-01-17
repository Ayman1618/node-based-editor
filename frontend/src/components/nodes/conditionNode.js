// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeSelectField } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value1`,
      style: { top: '30%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value2`,
      style: { top: '70%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '30%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      handles={handles}
    >
      <NodeSelectField
        label="Operator"
        value={operator}
        onChange={handleOperatorChange}
        options={[
          { value: 'equals', label: 'Equals' },
          { value: 'notEquals', label: 'Not Equals' },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan', label: 'Less Than' },
          { value: 'contains', label: 'Contains' }
        ]}
      />
      <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
        Left: inputs | Right: true/false
      </div>
    </BaseNode>
  );
}
