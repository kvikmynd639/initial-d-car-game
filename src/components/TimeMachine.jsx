import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const TimeMachine = () => {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/time_machine.glb");

  useEffect(() => {
    if (gltf) {
      console.log('Loaded GLTF:', gltf);
    }
  }, [gltf]);

  return (
    <primitive 
      object={gltf.scene} 
      position={[2, 0, 0]} // Adjust position to place it next to the track
      scale={[0.1, 0.1, 0.1]} // Adjust scale as needed
    />
  );
};

export default TimeMachine;
