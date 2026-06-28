import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Explicit sizing for canvas matching the larger responsive container
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 280;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Earth Globe
    const globeRadius = 110; // Enlarged from 90 to make it fill the screen beautifully
    const geometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    
    // Load flat Earth texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/earth-map.png', (txt) => {
      txt.colorSpace = THREE.SRGBColorSpace;
    });

    // Hyper-realistic Mesh Phong Material with bump mapping and high-specularity
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      bumpMap: texture,
      bumpScale: 1.2, // Adds beautiful 3D topography depth in lighting angles
      shininess: 40,
      specular: new THREE.Color('#3366cc'), // Ocean glint reflection color
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // 5. Atmospheric Glow Ring
    const glowGeometry = new THREE.SphereGeometry(globeRadius * 1.015, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x5dade2,
      transparent: true,
      opacity: 0.2, // Slightly increased for a richer atmospheric visibility
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // 6. Stars Particles Background for cinematic space feel
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      const radius = 350 + Math.random() * 200;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      starsPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i+2] = radius * Math.cos(phi);
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.0,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 7. HQ Nagpur Marker (21.1458 N, 79.0882 E)
    const lat = 21.1458 * (Math.PI / 180);
    const lon = (79.0882 - 90) * (Math.PI / 180); 

    const x = globeRadius * Math.cos(lat) * Math.cos(lon);
    const y = globeRadius * Math.sin(lat);
    const z = -globeRadius * Math.cos(lat) * Math.sin(lon);

    const markerGeom = new THREE.SphereGeometry(2.5, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
    const marker = new THREE.Mesh(markerGeom, markerMat);
    marker.position.set(x, y, z);
    earth.add(marker);

    // Add a pulsing gold ring around the marker
    const ringGeom = new THREE.RingGeometry(3.5, 4.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xd4af37, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.set(x, y, z);
    ring.lookAt(new THREE.Vector3(x * 1.1, y * 1.1, z * 1.1));
    earth.add(ring);

    // 8. Space Lighting with High-Contrast Day/Night terminator line
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Dark night-side contrast
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xe8f4ff, 2.0); // Rich high-contrast cold sunlight
    directionalLight.position.set(200, 80, 180);
    scene.add(directionalLight);

    // 9. Interaction & Drag states
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    // Auto rotation base angles
    let baseRotationY = 0;
    const autoSpeed = 0.0015;

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      earth.rotation.y += deltaMove.x * 0.007;
      earth.rotation.x += deltaMove.y * 0.007;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };

      earth.rotation.y += deltaMove.x * 0.01;
      earth.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    // Attach events
    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvasEl.addEventListener('touchstart', handleTouchStart);
    canvasEl.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // 10. Scroll-linked rotation integration (film-like revolving effect)
    const handleScrollRotation = () => {
      if (!isDragging) {
        // Rotate earth and starfield based on scroll coordinates (dynamically spins)
        earth.rotation.y = baseRotationY + window.scrollY * 0.0018;
        starField.rotation.y = window.scrollY * 0.0003;
      }
    };
    window.addEventListener('scroll', handleScrollRotation);

    // 11. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 800;
      const newHeight = container.clientHeight || 550;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop
    let pulseDirection = 1;
    let pulseScale = 1;
    let requestID;

    const animate = () => {
      requestID = requestAnimationFrame(animate);

      // Auto rotation base increment
      if (!isDragging) {
        baseRotationY += autoSpeed;
        earth.rotation.y = baseRotationY + window.scrollY * 0.0018;
        starField.rotation.y = window.scrollY * 0.0003;
      }

      // Marker pulse animation
      pulseScale += 0.015 * pulseDirection;
      if (pulseScale > 1.4) pulseDirection = -1;
      if (pulseScale < 0.8) pulseDirection = 1;
      
      ring.scale.set(pulseScale, pulseScale, 1);
      ringMat.opacity = 1 - (pulseScale - 0.8) / 0.6; // Fade out as it expands

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollRotation);
      canvasEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvasEl.removeEventListener('touchstart', handleTouchStart);
      canvasEl.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      texture.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      markerGeom.dispose();
      markerMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center cursor-grab active:cursor-grabbing animate-fadeIn"
      style={{ 
        touchAction: 'none', 
        width: '100%', 
        height: '550px', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        position: 'relative'
      }}
    >
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '15px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          backgroundColor: 'rgba(0, 43, 73, 0.85)', 
          backdropFilter: 'blur(8px)', 
          border: '1px solid rgba(212, 175, 55, 0.35)', 
          padding: '0.5rem 1.4rem', 
          borderRadius: '50px', 
          fontSize: '0.72rem', 
          fontWeight: 600, 
          color: 'var(--gold)', 
          pointerEvents: 'none', 
          zIndex: 10,
          whiteSpace: 'nowrap',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', animation: 'pulseGold 2s infinite' }}></span>
        Scroll page or drag to revolve realistic 3D Earth
      </div>
    </div>
  );
};

export default Globe;
