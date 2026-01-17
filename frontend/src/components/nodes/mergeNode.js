// mergeNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeSelectField } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concat');

  const handleStrategyChange = (e) => {
    setMergeStrategy(e.target.value);
  };

  // Create multiple input handles
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input1`,
      style: { top: '25%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input2`,
      style: { top: '50%' }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input3`,
      style: { top: '75%' }
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
      title="Merge"
      handles={handles}
    >
      <NodeSelectField
        label="Merge Strategy"
        value={mergeStrategy}
        onChange={handleStrategyChange}
        options={[
          { value: 'concat', label: 'Concatenate' },
          { value: 'sum', label: 'Sum' },
          { value: 'average', label: 'Average' },
          { value: 'join', label: 'Join with separator' },
          { value: 'zip', label: 'Zip arrays' }
        ]}
      />
      <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
        Combines multiple inputs
      </div>
    </BaseNode>
  );
}
