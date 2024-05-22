import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import './index.css';
import { Physics } from '@react-three/cannon';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Canvas>
        <Physics broadphase='SAP' gravity={[0,-2.6, 0]}>
            <Scene />
        </Physics>
        
      </Canvas>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}


