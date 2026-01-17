import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Pipeline Builder</h1>
        <p className="app-subtitle">Create and connect nodes to build your workflow</p>
      </header>
      <PipelineToolbar />
      <div className="app-main">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
