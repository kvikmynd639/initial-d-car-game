import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useControls } from "./useControls";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";

const Car = ({ thirdPerson }) => {
  const mesh = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car.glb"
  );
  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.09;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    if (!thirdPerson) return;

    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    if (!mesh) return;

    mesh.scene.scale.set(0.0012, 0.0012, 0.0012);
    mesh.scene.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  // Debugging helper: Box to visualize chassis
  const [debugChassis] = useBox(() => ({
    args: chassisBodyArgs,
    position,
  }));

  return (
    <>
      <group ref={vehicle} name="vehicle">
        <group ref={chassisBody} name="chassisBody">
          <primitive object={mesh.scene} rotation-y={Math.PI} position={[0, -0.09, 0]} />
        </group>

        <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
      </group>

      {/* Debugging helper: Visualize the chassis */}
      <mesh ref={debugChassis}>
        <boxGeometry args={chassisBodyArgs} />
        <meshBasicMaterial color="blue" wireframe />
      </mesh>
    </>
  );
};

export default Car;