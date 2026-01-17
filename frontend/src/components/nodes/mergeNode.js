import { Position } from 'reactflow';
import { createNode } from './createNode';
import { BaseNode, NodeSelectField } from './BaseNode';

export const MergeNode = createNode({
  title: 'Merge',
  fields: [
    {
      key: 'mergeStrategy',
      type: 'select',
      label: 'Merge Strategy',
      defaultValue: 'concat',
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'sum', label: 'Sum' },
        { value: 'average', label: 'Average' },
        { value: 'join', label: 'Join with separator' },
        { value: 'zip', label: 'Zip arrays' }
      ]
    }
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      name: 'input1',
      style: { top: '25%' }
    },
    {
      type: 'target',
      position: Position.Left,
      name: 'input2',
      style: { top: '50%' }
    },
    {
      type: 'target',
      position: Position.Left,
      name: 'input3',
      style: { top: '75%' }
    },
    {
      type: 'source',
      position: Position.Right,
      name: 'output'
    }
  ],
  getInitialData: (id, data) => ({
    mergeStrategy: data?.mergeStrategy || 'concat'
  }),
  customContent: ({ id, data, fieldStates, generatedHandles, title }) => {
    const { value: mergeStrategy, setValue: setMergeStrategy } = fieldStates.mergeStrategy;
    return (
      <BaseNode id={id} data={data} title={title} handles={generatedHandles}>
        <NodeSelectField
          label="Merge Strategy"
          value={mergeStrategy}
          onChange={(e) => setMergeStrategy(e.target.value)}
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
});
