import { Position } from 'reactflow';
import { createNode } from './createNode';
import { BaseNode, NodeSelectField, NodeTextField } from './BaseNode';

export const TransformNode = createNode({
  title: 'Transform',
  fields: [
    {
      key: 'transformType',
      type: 'select',
      label: 'Transform Type',
      defaultValue: 'uppercase',
      options: [
        { value: 'uppercase', label: 'Uppercase' },
        { value: 'lowercase', label: 'Lowercase' },
        { value: 'reverse', label: 'Reverse' },
        { value: 'trim', label: 'Trim' },
        { value: 'custom', label: 'Custom' }
      ]
    },
    {
      key: 'customFunction',
      type: 'text',
      label: 'Custom Function',
      defaultValue: '',
      placeholder: 'e.g., value.toUpperCase()'
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
    transformType: data?.transformType || 'uppercase',
    customFunction: data?.customFunction || ''
  }),
  customContent: ({ id, data, fieldStates, generatedHandles, title }) => {
    const { value: transformType, setValue: setTransformType } = fieldStates.transformType;
    const { value: customFunction, setValue: setCustomFunction } = fieldStates.customFunction;
    
    return (
      <BaseNode id={id} data={data} title={title} handles={generatedHandles}>
        <NodeSelectField
          label="Transform Type"
          value={transformType}
          onChange={(e) => setTransformType(e.target.value)}
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
            onChange={(e) => setCustomFunction(e.target.value)}
            placeholder="e.g., value.toUpperCase()"
          />
        )}
      </BaseNode>
    );
  }
});
