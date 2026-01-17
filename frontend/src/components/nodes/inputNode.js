import { Position } from 'reactflow';
import { createNode } from './createNode';

export const InputNode = createNode({
  title: 'Input',
  fields: [
    {
      key: 'inputName',
      type: 'text',
      label: 'Name',
      defaultValue: (id) => id.replace('customInput-', 'input_'),
    },
    {
      key: 'inputType',
      type: 'select',
      label: 'Type',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ],
  handles: [
    {
      type: 'source',
      position: Position.Right,
      name: 'value'
    }
  ],
  getInitialData: (id, data) => ({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text'
  })
});
