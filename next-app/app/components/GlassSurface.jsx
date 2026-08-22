'use client';

import React, { useRef, useId } from 'react';
import './GlassSurface.css';

/**
 * GlassSurface Component
 * Implements high-end glassmorphism with dynamic displacement, refraction highlight, and chromatic glow.
 */
export const GlassSurface = ({
  width = 600,
  height = 200,
  borderRadius = 24,
  displace = 15,
  distortionScale = -150,
  redOffset = 5,
  greenOffset = 15,
  blueOffset = 25,
  brightness = 60,
  opacity = 0.8,
  mixBlendMode = 'screen',
  className = '',
  style = {},
  children
}) => {
  const filterId = useId().replace(/:/g, '');
  const containerRef = useRef(null);

  const formatUnit = (val) => {
    if (typeof val === 'number') return `${val}px`;
    return val;
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface-container ${className}`.trim()}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        minHeight: typeof height === 'number' ? `${height}px` : height,
        borderRadius: formatUnit(borderRadius),
        ...style
      }}
    >
      {/* SVG FILTER DEFINITION FOR DISPLACEMENT & CHROMATIC OFFSET */}
      <svg className="glass-surface-svg-filters" aria-hidden="true">
        <defs>
          <filter id={`glass-filter-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displace}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feOffset in="displaced" dx={redOffset * 0.1} dy={0} result="redShift" />
            <feOffset in="displaced" dx={0} dy={greenOffset * 0.1} result="greenShift" />
            <feOffset in="displaced" dx={-blueOffset * 0.1} dy={0} result="blueShift" />
            <feBlend mode={mixBlendMode} in="redShift" in2="greenShift" result="blend1" />
            <feBlend mode={mixBlendMode} in="blend1" in2="blueShift" result="blend2" />
          </filter>
        </defs>
      </svg>

      {/* MULTI-LAYER GLASS BACKDROP & REFRACTION LAYERS */}
      <div
        className="glass-surface-backdrop"
        style={{
          borderRadius: formatUnit(borderRadius),
          opacity: opacity,
          filter: `brightness(${brightness}%)`
        }}
      />

      <div
        className="glass-surface-border-highlight"
        style={{ borderRadius: formatUnit(borderRadius) }}
      />

      <div
        className="glass-surface-specular"
        style={{ borderRadius: formatUnit(borderRadius) }}
      />

      {/* CONTENT LAYER */}
      <div className="glass-surface-content">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
