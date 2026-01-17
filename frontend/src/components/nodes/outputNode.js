import { Position } from 'reactflow';
import { createNode } from './createNode';

export const OutputNode = createNode({
  title: 'Output',
  fields: [
    {
      key: 'outputName',
      type: 'text',
      label: 'Name',
      defaultValue: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      key: 'outputType',
      type: 'select',
      label: 'Type',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' }
      ]
    }
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      name: 'value'
    }
  ],
  getInitialData: (id, data) => ({
    outputName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data?.outputType || 'Text'
  })
});
