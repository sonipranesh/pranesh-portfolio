'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LiquidSwapProps {
  img1?: string;
  img2?: string;
  className?: string;
  onSwapStateChange?: (isSwapped: boolean) => void;
}

export default function LiquidSwap({
  img1 = '/hero-cinematic-bg.jpg',
  img2 = '/hero-portrait-bg.jpg',
  className = '',
  onSwapStateChange
}: LiquidSwapProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const progressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // TEXTURE LOADER
    const textureLoader = new THREE.TextureLoader();
    let tex1: THREE.Texture, tex2: THREE.Texture;

    // SHADER MATERIAL
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform float uProgress;
      uniform vec2 uMouse;
      uniform float uTime;
      varying vec2 vUv;

      // Simplex 3D noise
      vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + vec4(ns.yyyy);
        vec4 y = y_ *ns.x + vec4(ns.yyyy);
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m*m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vec2 uv = vUv;
        
        // Fluid noise distortion
        float noise = snoise(vec3(uv * 3.5, uTime * 0.4));
        
        // Distance to liquid glass orb center
        float distToOrb = distance(uv, uMouse);
        float glassBall = smoothstep(0.45, 0.05, distToOrb);
        
        // Liquid displacement UVs
        float liquidDistort = noise * 0.12 * (1.0 - abs(uProgress - 0.5) * 2.0) + glassBall * 0.08;
        vec2 uv1 = uv + vec2(liquidDistort, liquidDistort * 0.5);
        vec2 uv2 = uv - vec2(liquidDistort, liquidDistort * 0.5);
        
        vec4 col1 = texture2D(uTexture1, uv1);
        vec4 col2 = texture2D(uTexture2, uv2);
        
        // Wave front transition
        float wave = sin(uv.y * 12.0 + uTime * 2.5) * 0.08;
        float progressThreshold = smoothstep(uProgress - 0.2, uProgress + 0.2, uv.x + noise * 0.18 + wave);
        
        vec4 mixColor = mix(col2, col1, progressThreshold);
        
        // Glass refraction rim light
        float rim = smoothstep(0.04, 0.0, abs(progressThreshold - 0.5)) * 0.45;
        mixColor.rgb += vec3(0.95, 0.45, 0.15) * rim;
        
        gl_FragColor = mixColor;
      }
    `;

    const uniforms = {
      uTexture1: { value: null },
      uTexture2: { value: null },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // LOAD TEXTURES
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        uniforms.uTexture1.value = tex1;
        uniforms.uTexture2.value = tex2;
        setIsLoaded(true);
      }
    };

    tex1 = textureLoader.load(img1, checkLoaded);
    tex2 = textureLoader.load(img2, checkLoaded);

    tex1.minFilter = THREE.LinearFilter;
    tex2.minFilter = THREE.LinearFilter;

    // MOUSE MOVE LISTENER
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp progress smoothly
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.08;
      uniforms.uProgress.value = progressRef.current;

      // Update uniforms
      uniforms.uTime.value = (Date.now() - startTime) * 0.001;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [img1, img2]);

  const toggleSwap = () => {
    const nextState = !isSwapped;
    setIsSwapped(nextState);
    targetProgressRef.current = nextState ? 1 : 0;
    if (onSwapStateChange) onSwapStateChange(nextState);
  };

  return (
    <div className={`liquid-swap-container ${className}`} onClick={toggleSwap} data-cursor="LIQUID SWAP">
      <div ref={mountRef} className="liquid-swap-canvas" />
      <button 
        className="liquid-swap-trigger-btn"
        onClick={(e) => { e.stopPropagation(); toggleSwap(); }}
        data-cursor="LIQUID REVEAL"
      >
        <span className="liquid-icon">💧</span>
        <span>{isSwapped ? 'RESTORE BACKGROUND' : 'REVEAL PORTRAIT'}</span>
      </button>
    </div>
  );
}
