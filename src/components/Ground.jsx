import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { BufferAttribute } from 'three';
import { TextureLoader } from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Ground = () => {
    const gridMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/textures/grid.png"
    );

    const aoMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/textures/ground-ao.png"
    );

    const alphaMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/textures/alpha-map.png"
    );

    useEffect(() => {
        gridMap.anisotropy = 16;
    }, [gridMap]);

    const meshRef = useRef(null);
    useEffect(() => {
        if (meshRef.current) {
            var uvs = meshRef.current.geometry.attributes.uv.array;
            meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
        }
    }, [meshRef.current]);

    return (
        <>
            <mesh ref={meshRef} position={[-2.285, -0.015, -1.325]} rotation-x={-Math.PI * 0.5} rotation-z={0.079}>
                <circleGeometry args={[6.12, 50]} />
                <MeshReflectorMaterial
                    aoMap={aoMap}
                    alphaMap={alphaMap}
                    transparent={true}
                    color={[0.5, 0.5, 0.5]}
                    metalness={0.05}
                    roughness={0.4}
                    dithering={true}
                    blur={[1024, 512]}
                    envMapIntensity={0.35}
                    mixBlur={3}
                    mixContrast={1}
                    resolution={1024}
                    mirror={0}
                    depthScale={0}
                    minDepthThreshold={0.9}
                    maxDepthThreshold={1}
                    depthToBlurRatioBias={0.25}
                    debug={0}
                    reflectorOffset={0.02}
                    //side={THREE.DoubleSide}  
                />
            </mesh>
        </>
    );
};

export default Ground;
