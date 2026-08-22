'use client';

import React, { useId } from 'react';
import './GlassSurface.css';

/**
 * GlassSurface Component
 * Creates an authentic liquid glass surface with SVG displacement refraction,
 * chromatic aberration, specular highlights, and deep backdrop blur.
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

  const formatUnit = (val) => {
    if (typeof val === 'number') return `${val}px`;
    return val;
  };

  return (
    <div
      className={`glass-surface-card ${className}`.trim()}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        minHeight: typeof height === 'number' ? `${height}px` : height,
        borderRadius: formatUnit(borderRadius),
        ...style
      }}
    >
      {/* SVG DISPLACEMENT & CHROMATIC REFRACTION FILTER */}
      <svg className="glass-surface-svg-def" aria-hidden="true" width="0" height="0">
        <defs>
          <filter id={`glass-distortion-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03 0.04"
              numOctaves="2"
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
            <feOffset in="displaced" dx={redOffset * 0.2} dy={0} result="redShift" />
            <feOffset in="displaced" dx={0} dy={greenOffset * 0.2} result="greenShift" />
            <feOffset in="displaced" dx={-blueOffset * 0.2} dy={0} result="blueShift" />
            <feBlend mode={mixBlendMode} in="redShift" in2="greenShift" result="blend1" />
            <feBlend mode={mixBlendMode} in="blend1" in2="blueShift" result="blend2" />
          </filter>
        </defs>
      </svg>

      {/* FROSTED GLASS BACKGROUND & REFRACTION SHIMMER */}
      <div
        className="glass-surface-layer-backdrop"
        style={{
          borderRadius: formatUnit(borderRadius),
          opacity: opacity
        }}
      />

      {/* SPECULAR SHINE & GLOSSY EDGE HIGHLIGHT */}
      <div
        className="glass-surface-layer-gloss"
        style={{ borderRadius: formatUnit(borderRadius) }}
      />

      <div
        className="glass-surface-layer-border"
        style={{ borderRadius: formatUnit(borderRadius) }}
      />

      {/* TEXT / CONTENT */}
      <div className="glass-surface-body">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;

