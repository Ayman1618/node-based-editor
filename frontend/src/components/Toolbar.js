// Toolbar.js

import { DraggableNode } from './DraggableNode';
import './Toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-container">
            <div className="toolbar-label">Drag nodes to canvas:</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='number' label='Number' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='merge' label='Merge' />
            </div>
        </div>
    );
};
