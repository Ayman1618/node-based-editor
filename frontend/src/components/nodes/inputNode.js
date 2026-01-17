// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeTextField, NodeSelectField } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      handles={handles}
    >
      <NodeTextField
        label="Name"
        value={currName}
        onChange={handleNameChange}
      />
      <NodeSelectField
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]}
      />
    </BaseNode>
  );
}
