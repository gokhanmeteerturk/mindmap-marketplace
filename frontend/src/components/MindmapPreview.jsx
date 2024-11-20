import React from 'react';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const MindmapPreview = ({ nodes, edges }) => {
  const parsedNodes = React.useMemo(() => {
    try {
      return JSON.parse(nodes || '[]');
    } catch {
      return [];
    }
  }, [nodes]);

  const parsedEdges = React.useMemo(() => {
    try {
      return JSON.parse(edges || '[]');
    } catch {
      return [];
    }
  }, [edges]);

  return (
    <div style={{ width: '100%', aspectRatio: '2', minHeight: '150px' }}>
      <ReactFlow 
        nodes={parsedNodes}
        edges={parsedEdges}
        fitView
        colorMode="dark"
        panOnScroll={false}
        zoomOnScroll={false}
        nodesDraggable={true}
        nodesConnectable={false}
      />
    </div>
  );
};

export default MindmapPreview;