# Node Abstraction - Declarative Configuration

## Overview

This directory implements a **declarative node abstraction** that eliminates repetitive boilerplate code. Instead of writing `useState` hooks, handlers, and field rendering for every node, you can now define nodes using simple configuration objects.

## The Problem (Before)

Creating a new node required:
- Multiple `useState` hooks (one per field)
- Individual handler functions for each field
- Manual handle configuration
- Repetitive JSX for field rendering

**Example (Old Way - 50+ lines):**
```javascript
export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || '');
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
    <BaseNode id={id} data={data} title="Input" handles={handles}>
      <NodeTextField
        label="Name"
        value={currName}
        onChange={handleNameChange}
      />
      <NodeSelectField
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={[...]}
      />
    </BaseNode>
  );
}
```

## The Solution (After)

Now you can create the same node with just **configuration**:

**Example (New Way - ~20 lines):**
```javascript
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
```

## Benefits

1. **60% Less Code**: Reduced from ~50 lines to ~20 lines per node
2. **No Boilerplate**: No `useState`, handlers, or manual field rendering
3. **Consistent**: All nodes follow the same pattern
4. **Maintainable**: Changes to field rendering affect all nodes automatically
5. **Scalable**: Adding 10+ nodes becomes trivial

## How It Works

The `createNode` factory function:
1. **Automatically creates state** for all fields defined in `fields`
2. **Generates handlers** for each field
3. **Renders fields** based on their `type` (text, select, textarea)
4. **Creates handles** with proper IDs from the `handles` configuration
5. **Supports custom content** for special cases via `customContent`

## Field Types

- **`text`**: Text input field
- **`select`**: Dropdown select field
- **`textarea`**: Multi-line text area

## Examples

### Simple Node (Number)
```javascript
export const NumberNode = createNode({
  title: 'Number',
  fields: [
    {
      key: 'value',
      type: 'text',
      label: 'Value',
      defaultValue: '0',
      placeholder: 'Enter a number'
    }
  ],
  handles: [
    { type: 'source', position: Position.Right, name: 'output' }
  ]
});
```

### Node with Conditional Fields (Transform)
Uses `customContent` to show/hide fields based on other field values.

### Node with Multiple Handles (Condition)
Defines multiple input/output handles with custom positioning.

## Special Cases

For nodes with complex logic (like `TextNode` with dynamic handles based on variable parsing), you can still write custom components. The abstraction doesn't force you to use it everywhere - it's a tool for the common cases.

## Creating New Nodes

To add a new node:

1. Create a new file: `myNewNode.js`
2. Import `createNode` and `Position`
3. Define your configuration:
   ```javascript
   export const MyNewNode = createNode({
     title: 'My Node',
     fields: [...],
     handles: [...],
     getInitialData: (id, data) => ({...})
   });
   ```
4. Add it to `PipelineUI.js` in the `nodeTypes` object

That's it! No state management, no handlers, no repetitive code.
