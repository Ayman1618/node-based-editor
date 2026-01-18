# Pipeline Builder

A visual node-based pipeline builder application built with React and FastAPI. Create, connect, and analyze data processing pipelines through an intuitive drag-and-drop interface.

## 🚀 Live Demo

- **Frontend**: [https://node-based-editor-onoz.vercel.app](https://node-based-editor-onoz.vercel.app)
- **Backend API**: [https://node-based-editor-production.up.railway.app](https://node-based-editor-production.up.railway.app)

## ✨ Features

### Node-Based Pipeline Creation
- **Drag & Drop Interface**: Easily add nodes to the canvas by dragging from the toolbar
- **9 Node Types**: Input, Output, LLM, Text, Number, Condition, Transform, Filter, and Merge
- **Visual Connections**: Connect nodes by dragging from output handles to input handles
- **Individual Node Deletion**: Delete nodes directly from the canvas with the delete button

### Advanced Text Node
- **Auto-resizing**: Textarea automatically adjusts height based on content
- **Dynamic Variable Parsing**: Use `{{variableName}}` syntax to create dynamic input handles
- **Real-time Handle Generation**: Handles appear automatically as you type variables

### Pipeline Analysis
- **DAG Detection**: Automatically detects if your pipeline forms a Directed Acyclic Graph
- **Node & Edge Counting**: Analyzes pipeline structure and provides statistics
- **Backend Integration**: Full-stack integration with FastAPI backend

### Modern UI/UX
- **Sleek Design**: Modern gradient theme with glassmorphism effects
- **Responsive Layout**: Optimized for various screen sizes
- **Smooth Animations**: Polished interactions and transitions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **ReactFlow** - Node-based graph visualization
- **Zustand** - State management
- **CSS3** - Styling with modern effects

### Backend
- **FastAPI** - Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## 📁 Project Structure

```
node-based-editor/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── nodes/          # Node components
│   │   │   │   ├── BaseNode.js      # Base node abstraction
│   │   │   │   ├── createNode.js    # Declarative node factory
│   │   │   │   └── [node-types].js  # Individual node implementations
│   │   │   ├── PipelineUI.js   # Main canvas component
│   │   │   ├── Toolbar.js      # Node palette
│   │   │   └── SubmitButton.js # Pipeline submission
│   │   ├── store.js            # Zustand state management
│   │   └── App.js              # Main application component
│   └── package.json
├── backend/
│   ├── main.py                # FastAPI application
│   └── requirements.txt       # Python dependencies
└── README.md
```

## 🏗️ Architecture Highlights

### Declarative Node Abstraction
The project features a powerful node abstraction system that allows creating new node types with minimal code:

```javascript
// Creating a new node is as simple as:
export const MyNode = createNode({
  title: 'My Node',
  fields: [
    { key: 'value', type: 'text', label: 'Value' }
  ],
  handles: [
    { type: 'source', position: Position.Right, name: 'output' }
  ]
});
```

This abstraction eliminates repetitive boilerplate code and makes adding new nodes straightforward and maintainable.

### Key Design Decisions
- **Factory Pattern**: `createNode` factory function for declarative node creation
- **Component Composition**: `BaseNode` provides shared structure and styling
- **State Management**: Zustand for global pipeline state
- **Separation of Concerns**: Clear separation between UI, state, and business logic

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`

### Environment Variables (Local Development)

For running locally, configure these environment variables:

**Frontend** (create `.env` file in `frontend/` directory):
```
REACT_APP_API_URL=http://localhost:8000
```

**Backend** (set as environment variable or in `.env`):
```
ALLOWED_ORIGINS=http://localhost:3000
```

> **Note**: The deployed versions use production URLs. These localhost values are only for local development.

## 📖 Usage

1. **Add Nodes**: Drag nodes from the toolbar onto the canvas
2. **Connect Nodes**: Click and drag from an output handle (right side) to an input handle (left side)
3. **Configure Nodes**: Click on nodes to edit their properties
4. **Text Variables**: In Text nodes, use `{{variableName}}` to create dynamic input handles
5. **Delete Nodes**: Hover over a node and click the delete button in the top-right corner
6. **Submit Pipeline**: Click "Submit Pipeline" to analyze your pipeline structure

## 🎯 Key Features Explained

### Node Abstraction
The `createNode` factory function allows defining nodes through configuration objects, eliminating the need for repetitive `useState` hooks, handlers, and field rendering code. This makes the codebase maintainable and scalable.

### Dynamic Text Node
The Text node parses `{{variableName}}` patterns and automatically creates input handles for each variable, enabling dynamic pipeline connections based on template content.

### DAG Detection
The backend implements Kahn's algorithm (topological sort) to detect cycles in the pipeline graph, ensuring data flow integrity.
