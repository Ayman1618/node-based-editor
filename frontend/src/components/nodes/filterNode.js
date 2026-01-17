import { Position } from 'reactflow';
import { createNode } from './createNode';

export const FilterNode = createNode({
  title: 'Filter',
  fields: [
    {
      key: 'filterCriteria',
      type: 'select',
      label: 'Filter By',
      defaultValue: 'contains',
      options: [
        { value: 'contains', label: 'Contains' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
        { value: 'equals', label: 'Equals' },
        { value: 'greaterThan', label: 'Greater Than' },
        { value: 'lessThan', label: 'Less Than' }
      ]
    },
    {
      key: 'filterValue',
      type: 'text',
      label: 'Filter Value',
      defaultValue: '',
      placeholder: 'Enter filter value'
    }
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      name: 'input'
    },
    {
      type: 'source',
      position: Position.Right,
      name: 'output'
    }
  ],
  getInitialData: (id, data) => ({
    filterCriteria: data?.filterCriteria || 'contains',
    filterValue: data?.filterValue || ''
  })
});
