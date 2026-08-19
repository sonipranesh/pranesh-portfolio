'use client';

import React from 'react';

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // duration in seconds
  direction?: 'left' | 'right' | 'up' | 'down';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
}

export default function LogoLoop({
  logos,
  speed = 25,
  direction = 'left',
  logoHeight = 44,
  gap = 40,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Technology Logos',
  className = '',
}: LogoLoopProps) {
  const isVertical = direction === 'up' || direction === 'down';
  const isReverse = direction === 'right' || direction === 'down';

  // Duplicate items 3 times to ensure infinite smooth seamless looping
  const triplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: isVertical ? '100%' : 'auto',
    padding: '12px 0',
  };

  const fadeOverlayStyle: React.CSSProperties = fadeOut
    ? {
        maskImage: isVertical
          ? 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          : 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: isVertical
          ? 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          : 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }
    : {};

  const animationName = isVertical
    ? isReverse
      ? 'logoLoopDown'
      : 'logoLoopUp'
    : isReverse
    ? 'logoLoopRight'
    : 'logoLoopLeft';

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: 'center',
    gap: `${gap}px`,
    width: isVertical ? '100%' : 'max-content',
    height: isVertical ? 'max-content' : 'auto',
    animation: `${animationName} ${speed}s linear infinite`,
  };

  return (
    <div
      className={`logo-loop-container ${className}`}
      style={{ ...containerStyle, ...fadeOverlayStyle }}
      aria-label={ariaLabel}
    >
      <div className="logo-loop-track" style={trackStyle}>
        {triplicatedLogos.map((item, idx) => {
          const key = `${item.title || item.alt || idx}-${idx}`;
          const content = (
            <div
              className={`logo-loop-item ${scaleOnHover ? 'scale-hover' : ''}`}
              title={item.title || item.alt}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${logoHeight * 0.85}px`,
                height: `${logoHeight}px`,
                minWidth: isVertical ? '100%' : `${logoHeight}px`,
                color: 'var(--ink)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease',
              }}
            >
              {item.node ? (
                item.node
              ) : item.src ? (
                <img
                  src={item.src}
                  alt={item.alt || 'Tech logo'}
                  style={{ height: `${logoHeight}px`, width: 'auto', objectFit: 'contain' }}
                />
              ) : null}
            </div>
          );

          if (item.href) {
            return (
              <a
                key={key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={item.title?.toUpperCase() || 'VISIT'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {content}
              </a>
            );
          }

          return <React.Fragment key={key}>{content}</React.Fragment>;
        })}
      </div>
    </div>
  );
}
