import React, { Suspense } from 'react';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Track from './Track';
import Ground from './Ground';

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <Environment files={`${process.env.PUBLIC_URL}/textures/envmap.hdr`} background />
      <PerspectiveCamera makeDefault position={[-6, 3, 9]} fov={40} />
      <OrbitControls target={[-2.64, -0.71, 0.03]} />


      <Track/>
      <Ground/>
    </Suspense>
  );
};

export default Scene;
