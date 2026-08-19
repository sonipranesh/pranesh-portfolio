'use client';

import React, { useState } from 'react';
import './LogoLoop.css';

export default function LogoLoop({
  logos = [],
  speed = 30,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Technology partners'
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items to create seamless infinite scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  const isVertical = direction === 'up' || direction === 'down';
  const effectiveSpeed = isHovered && hoverSpeed !== undefined ? hoverSpeed : speed;
  const duration = effectiveSpeed > 0 ? 1200 / effectiveSpeed : 0;

  return (
    <div
      className={`logo-loop-container ${isVertical ? 'vertical' : 'horizontal'} ${fadeOut ? 'fade-out' : ''}`}
      style={{
        '--fade-color': fadeOutColor,
        '--gap': `${gap}px`,
        '--logo-height': `${logoHeight}px`,
        '--anim-duration': `${duration}s`,
        '--anim-direction': direction === 'right' || direction === 'down' ? 'reverse' : 'normal'
      }}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`logo-loop-track ${isHovered && effectiveSpeed === 0 ? 'paused' : ''}`}
        style={{
          animationPlayState: isHovered && effectiveSpeed === 0 ? 'paused' : 'running'
        }}
      >
        {duplicatedLogos.map((item, idx) => {
          const content = item.node ? (
            <span className="logo-node" style={{ height: logoHeight, width: logoHeight, fontSize: logoHeight * 0.75 }}>
              {item.node}
            </span>
          ) : item.src ? (
            <img src={item.src} alt={item.alt || ''} style={{ height: logoHeight }} />
          ) : null;

          return (
            <div
              key={idx}
              className={`logo-loop-item ${scaleOnHover ? 'scale-hover' : ''}`}
              title={item.title || item.alt || ''}
            >
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                  {item.title && <span className="logo-title">{item.title}</span>}
                </a>
              ) : (
                <div className="logo-item-inner">
                  {content}
                  {item.title && <span className="logo-title">{item.title}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
