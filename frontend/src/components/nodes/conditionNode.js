import { Position } from 'reactflow';
import { createNode } from './createNode';
import { BaseNode } from './BaseNode';
import { NodeSelectField } from './BaseNode';

export const ConditionNode = createNode({
  title: 'Condition',
  fields: [
    {
      key: 'operator',
      type: 'select',
      label: 'Operator',
      defaultValue: 'equals',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'notEquals', label: 'Not Equals' },
        { value: 'greaterThan', label: 'Greater Than' },
        { value: 'lessThan', label: 'Less Than' },
        { value: 'contains', label: 'Contains' }
      ]
    }
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      name: 'value1',
      style: { top: '30%' }
    },
    {
      type: 'target',
      position: Position.Left,
      name: 'value2',
      style: { top: '70%' }
    },
    {
      type: 'source',
      position: Position.Right,
      name: 'true',
      style: { top: '30%' }
    },
    {
      type: 'source',
      position: Position.Right,
      name: 'false',
      style: { top: '70%' }
    }
  ],
  getInitialData: (id, data) => ({
    operator: data?.operator || 'equals'
  }),
  customContent: ({ id, data, fieldStates, generatedHandles, title }) => {
    const { value: operator, setValue: setOperator } = fieldStates.operator;
    return (
      <BaseNode id={id} data={data} title={title} handles={generatedHandles}>
        <NodeSelectField
          label="Operator"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
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
});
