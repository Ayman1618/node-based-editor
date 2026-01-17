// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeSelectField, NodeTextField } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCriteria, setFilterCriteria] = useState(data?.filterCriteria || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');

  const handleCriteriaChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
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
      title="Filter"
      handles={handles}
    >
      <NodeSelectField
        label="Filter By"
        value={filterCriteria}
        onChange={handleCriteriaChange}
        options={[
          { value: 'contains', label: 'Contains' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' },
          { value: 'equals', label: 'Equals' },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan', label: 'Less Than' }
        ]}
      />
      <NodeTextField
        label="Filter Value"
        value={filterValue}
        onChange={handleValueChange}
        placeholder="Enter filter value"
      />
    </BaseNode>
  );
}
