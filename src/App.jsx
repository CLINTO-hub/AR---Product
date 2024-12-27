import React, { useRef, useState } from 'react';
import { ZapparCamera, InstantTracker, ZapparCanvas } from '@zappar/zappar-react-three-fiber';
import { useGLTF, useTexture } from '@react-three/drei';

const Hologram = () => {
  const holoTexture = useTexture('/images/hotspot.png');
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} scale={[2, 2, 2]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial map={holoTexture} transparent alphaTest={0.5} />
    </mesh>
  );
};

function App() {
  const [placementMode, setPlacementMode] = useState(true); // Track placement mode
  
  const { scene } = useGLTF('/models/camera_canon_eos_400d.glb');
  const trackerRef = useRef(null);



const handleConfirmPlacement=(placementMode)=>{
  
  setPlacementMode(!placementMode)
}

  return (
    <>
      <ZapparCanvas>
        <ZapparCamera />
        <InstantTracker  ref={trackerRef}  placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
          <ambientLight intensity={3} />
          {placementMode ? (
            <Hologram /> // Show hologram in placement mode
          ) : (
            <primitive object={scene} scale={[0.5, 0.5, 0.5]} /> // Render GLB
          )}
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      </ZapparCanvas>
      <div
        id="zappar-placement-ui"
        onClick={() => handleConfirmPlacement(placementMode)}
        role="button"
        tabIndex={0}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#000',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {placementMode ? 'Confirm Placement' : 'Move Product'}
      </div>
      
      
    </>
  );
}

export default App;
