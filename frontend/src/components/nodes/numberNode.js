import { Position } from 'reactflow';
import { createNode } from './createNode';

export const NumberNode = createNode({
  title: 'Number',
  fields: [
    {
      key: 'value',
      type: 'text',
      label: 'Value',
      defaultValue: '0',
      placeholder: 'Enter a number',
      transform: (value) => {
        // Validate: only allow numbers or empty string
        return (value === '' || !isNaN(value)) ? value : undefined;
      }
    }
  ],
  handles: [
    {
      type: 'source',
      position: Position.Right,
      name: 'output'
    }
  ],
  getInitialData: (id, data) => ({
    value: data?.value !== undefined ? String(data.value) : '0'
  })
});
