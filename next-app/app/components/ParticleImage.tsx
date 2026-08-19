'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleImageProps {
  imageSrc?: string;
}

interface ParticleData {
  ox: number;
  oy: number;
  oz: number;
  cx: number;
  cy: number;
  cz: number;
  phase: number;
  speed: number;
  scatterX: number;
  scatterY: number;
  scatterZ: number;
}

export default function ParticleImage({ imageSrc = '/hero_silhouette_bg.jpg' }: ParticleImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;
    let particlesData: ParticleData[] = [];

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. SCENE & CAMERA
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000);
      camera.position.z = 600;

      // 2. RENDERER
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 3. SAMPLE IMAGE PIXELS
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const sampleWidth = 140; // Resolution grid
      const sampleHeight = Math.round((img.height / img.width) * sampleWidth);
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;
      ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);

      const imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
      const positions: number[] = [];
      const colors: number[] = [];

      const aspect = sampleWidth / sampleHeight;
      const renderScale = Math.min(width * 0.45, 520);
      const renderWidth = renderScale;
      const renderHeight = renderScale / aspect;

      // Offset position to align silhouette to the right side of the Hero section
      const offsetX = width > 768 ? width * 0.18 : 0;
      const offsetY = 0;

      for (let y = 0; y < sampleHeight; y += 1) {
        for (let x = 0; x < sampleWidth; x += 1) {
          const index = (y * sampleWidth + x) * 4;
          const r = imgData[index] / 255;
          const g = imgData[index + 1] / 255;
          const b = imgData[index + 2] / 255;
          const a = imgData[index + 3] / 255;

          const brightness = (r + g + b) / 3;
          if (a > 0.1 && brightness > 0.05) {
            const posX = (x / sampleWidth - 0.5) * renderWidth + offsetX;
            const posY = -(y / sampleHeight - 0.5) * renderHeight + offsetY;
            const posZ = (Math.random() - 0.5) * 20;

            positions.push(posX, posY, posZ);
            colors.push(r, g, b);

            particlesData.push({
              ox: posX,
              oy: posY,
              oz: posZ,
              cx: posX,
              cy: posY,
              cz: posZ,
              phase: Math.random() * Math.PI * 2,
              speed: Math.random() * 0.8 + 0.4,
              scatterX: (Math.random() - 0.5) * 350,
              scatterY: (Math.random() - 0.5) * 350,
              scatterZ: (Math.random() - 0.5) * 250,
            });
          }
        }
      }

      // 4. GEOMETRY & MATERIAL
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const particleTexture = createParticleTexture();

      const material = new THREE.PointsMaterial({
        size: 3.4,
        vertexColors: true,
        map: particleTexture,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // 5. ANIMATION LOOP
      let time = 0;
      const animate = () => {
        time += 0.015;
        const positionAttr = geometry.attributes.position;
        const currentPos = positionAttr.array as Float32Array;

        // Swirl cycle: periodically swirl apart and reassemble
        const rawSwirl = Math.sin(time * 0.55);
        const swirlAmount = Math.max(0, rawSwirl * 0.65 - 0.1);

        for (let i = 0; i < particlesData.length; i++) {
          const p = particlesData[i];
          const i3 = i * 3;

          const angle = time * p.speed + p.phase;
          const swirlX = Math.cos(angle) * p.scatterX * swirlAmount;
          const swirlY = Math.sin(angle) * p.scatterY * swirlAmount;
          const swirlZ = Math.sin(angle * 1.5) * p.scatterZ * swirlAmount;

          const targetX = p.ox + swirlX;
          const targetY = p.oy + swirlY;
          const targetZ = p.oz + swirlZ;

          p.cx += (targetX - p.cx) * 0.08;
          p.cy += (targetY - p.cy) * 0.08;
          p.cz += (targetZ - p.cz) * 0.08;

          currentPos[i3] = p.cx;
          currentPos[i3 + 1] = p.cy;
          currentPos[i3 + 2] = p.cz;
        }

        positionAttr.needsUpdate = true;
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!container) return;
        const newW = container.clientWidth || window.innerWidth;
        const newH = container.clientHeight || window.innerHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer && renderer.domElement && container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc]);

  return <div ref={containerRef} className="particle-image-canvas-wrapper" aria-hidden="true" />;
}

function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 160, 80, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 80, 30, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  return new THREE.CanvasTexture(canvas);
}
