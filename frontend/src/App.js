import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';
import { ClearButton } from './components/ClearButton';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <div>
            <h1 className="app-title">Pipeline Builder</h1>
            <p className="app-subtitle">Create and connect nodes to build your workflow</p>
          </div>
          <ClearButton />
        </div>
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
