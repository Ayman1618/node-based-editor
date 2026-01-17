import { Position } from 'reactflow';
import { createNode } from './createNode';
import { BaseNode } from './BaseNode';

export const LLMNode = createNode({
  title: 'LLM',
  fields: [],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      name: 'system',
      style: { top: `${100/3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      name: 'prompt',
      style: { top: `${200/3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      name: 'response'
    }
  ],
  customContent: ({ id, data, generatedHandles, title }) => {
    return (
      <BaseNode id={id} data={data} title={title} handles={generatedHandles}>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Large Language Model
        </div>
      </BaseNode>
    );
  }
});
