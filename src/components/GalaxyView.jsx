import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { Text, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import galaxyData from '../data/galaxyGraph.json';

// --- Ambient Starfield (Milky Way) ---
function Starfield() {
  const count = 4000;
  const mesh = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 400;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 300 - 50; // Between -50 and -350
      const scale = Math.random() * 0.5 + 0.1;
      const phase = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, scale, phase });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      // Twinkle effect
      const twinkle = Math.sin(time * 2 + p.phase) * 0.5 + 0.5;
      dummy.scale.setScalar(p.scale * (0.5 + twinkle * 0.5));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <circleGeometry args={[0.2, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// --- Domain & Constellation Logic ---
function ConstellationSystem({ onStudyNow }) {
  const { camera } = useThree();
  const [activeDomain, setActiveDomain] = useState(null);
  
  // Refs for animation
  const linesRefs = useRef({});
  const nodesRefs = useRef({});
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraLookAt = useRef(new THREE.Vector3(0, 0, -100));

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -100);
  }, [camera]);

  const handleDomainClick = (domain) => {
    if (activeDomain === domain.id) {
      // Close constellation
      setActiveDomain(null);
      gsap.to(camera.position, { x: 0, y: 0, z: 0, duration: 2, ease: 'power3.inOut' });
      gsap.to(cameraLookAt.current, { x: 0, y: 0, z: -100, duration: 2, ease: 'power3.inOut', onUpdate: () => camera.lookAt(cameraLookAt.current) });
      
      // Hide lines and nodes
      const t = gsap.timeline();
      Object.values(nodesRefs.current).forEach(n => {
        if (n && n.material) t.to(n.material, { opacity: 0, duration: 0.5 }, 0);
        if (n && n.textMaterial) t.to(n.textMaterial, { opacity: 0, duration: 0.5 }, 0);
      });
      return;
    }

    setActiveDomain(domain.id);

    // Dolly camera to domain
    const dx = domain.position.x;
    const dy = domain.position.y;
    // We want to be looking at the domain, but pulled back so we see the constellation
    gsap.to(camera.position, { x: dx * 0.5, y: dy * 0.5, z: domain.position.z + 60, duration: 2.5, ease: 'power2.inOut' });
    gsap.to(cameraLookAt.current, { x: dx, y: dy, z: domain.position.z, duration: 2.5, ease: 'power2.inOut', onUpdate: () => camera.lookAt(cameraLookAt.current) });

    // Stagger reveal of sub-nodes and lines
    const tl = gsap.timeline({ delay: 1 });
    
    domain.nodes.forEach((node, i) => {
      const mesh = nodesRefs.current[`${domain.id}_${node.id}`];
      if (mesh && mesh.material) {
        tl.to(mesh.material, { opacity: 1, duration: 0.8, ease: 'power2.out' }, i * 0.15);
      }
      const text = nodesRefs.current[`text_${domain.id}_${node.id}`];
      if (text) {
        tl.to(text, { fillOpacity: 0.9, duration: 0.8, ease: 'power2.out' }, i * 0.15);
      }
    });

  };

  return (
    <group>
      {galaxyData.domains.map((domain) => (
        <group key={domain.id}>
          {/* Main Domain Star */}
          <mesh 
            position={[domain.position.x, domain.position.y, domain.position.z]}
            onClick={(e) => { e.stopPropagation(); handleDomainClick(domain); }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshBasicMaterial color={domain.color} />
          </mesh>
          <Text
            position={[domain.position.x, domain.position.y - 4.5, domain.position.z]}
            fontSize={3}
            color="white"
            anchorX="center"
            anchorY="middle"
            fillOpacity={activeDomain === domain.id ? 0 : 0.8} // Hide domain text when active
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          >
            {domain.name}
          </Text>

          {/* Sub-topic Stars & Lines */}
          {activeDomain === domain.id && domain.lines.map((pair, idx) => {
            const startNode = domain.nodes.find(n => n.id === pair[0]);
            const endNode = domain.nodes.find(n => n.id === pair[1]);
            if (!startNode || !endNode) return null;
            return (
              <Line
                key={`${domain.id}_line_${idx}`}
                points={[
                  [startNode.pos.x, startNode.pos.y, startNode.pos.z],
                  [endNode.pos.x, endNode.pos.y, endNode.pos.z]
                ]}
                color="white"
                lineWidth={1}
                transparent
                opacity={0.3}
              />
            );
          })}

          {domain.nodes.map((node) => {
            // The domain star itself acts as one of the nodes sometimes, we still render its sub-node mesh slightly offset or overlaid
            const isVisible = activeDomain === domain.id;
            return (
              <group key={`${domain.id}_${node.id}`} position={[node.pos.x, node.pos.y, node.pos.z]}>
                <mesh
                  ref={el => nodesRefs.current[`${domain.id}_${node.id}`] = el}
                  onClick={(e) => {
                    if (isVisible) {
                      e.stopPropagation();
                      onStudyNow({ ...node, title: node.title }); // Bridge to study
                    }
                  }}
                  onPointerOver={(e) => { if (isVisible) document.body.style.cursor = 'pointer'; }}
                  onPointerOut={(e) => { if (isVisible) document.body.style.cursor = 'auto'; }}
                >
                  <sphereGeometry args={[0.8, 16, 16]} />
                  <meshBasicMaterial color="white" transparent opacity={0} />
                </mesh>
                <Text
                  ref={el => {
                    if (el && el.material) {
                      // Text material opacity control
                      nodesRefs.current[`text_${domain.id}_${node.id}`] = el.material;
                      if (!isVisible && el.material.fillOpacity !== 0) el.material.fillOpacity = 0;
                    }
                  }}
                  position={[0, -3.5, 0]}
                  fontSize={2}
                  color="rgba(255,255,255,0.95)"
                  anchorX="center"
                  anchorY="middle"
                  font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                >
                  {node.title}
                </Text>
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

export default function GalaxyView({ onClose, onStudyNow }) {
  return (
    <div className="absolute inset-0 z-50 w-full h-full overflow-hidden" style={{ background: 'linear-gradient(to top, #4A334B 0%, #201D38 30%, #0A0A12 100%)' }}>
      
      {/* 3D WebGL Canvas */}
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} gl={{ antialias: false, alpha: true }}>
        <Starfield />
        <ConstellationSystem onStudyNow={onStudyNow} />
        
        {/* Postprocessing for Bloom and Film Grain */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Noise opacity={0.08} />
        </EffectComposer>
      </Canvas>

      {/* Snowy Mountain Horizon (CSS overlay to guarantee photoreal silhouette) */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '35%', background: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 1440 320\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'%23141221\' d=\'M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'></path><path fill=\'%230B0A15\' d=\'M0,256L60,250.7C120,245,240,235,360,229.3C480,224,600,224,720,234.7C840,245,960,267,1080,266.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z\'></path></svg>") bottom center / cover no-repeat' }}></div>

      {/* Top UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6 pointer-events-none">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background='rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span style={{ fontSize: 20, fontWeight: 500, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>The Constellation</span>
        </div>
        
        <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Select a domain to reveal its stars
        </div>
      </div>
    </div>
  );
}
