'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import './BubbleMenu.css';

export default function BubbleMenu({
  logo = null,
  items = [],
  menuAriaLabel = "Toggle navigation",
  menuBg = "#f4f3eb",
  menuContentColor = "#111111",
  useFixedPosition = false,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.1,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const bubbleListRef = useRef([]);

  useEffect(() => {
    const bubbles = bubbleListRef.current.filter(Boolean);
    if (!bubbles.length) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.killTweensOf(bubbles);
      gsap.fromTo(
        bubbles,
        {
          scale: 0,
          opacity: 0,
          y: 20,
          rotate: (i) => items[i]?.rotation || 0
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotate: (i) => items[i]?.rotation || 0,
          duration: animationDuration,
          ease: animationEase,
          stagger: staggerDelay,
          overwrite: "auto"
        }
      );
    } else {
      document.body.style.overflow = '';
      gsap.killTweensOf(bubbles);
      gsap.to(bubbles, {
        scale: 0,
        opacity: 0,
        y: 10,
        duration: animationDuration * 0.4,
        ease: "power2.in",
        stagger: {
          each: staggerDelay * 0.4,
          from: "end"
        },
        overwrite: "auto"
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, animationDuration, animationEase, staggerDelay, items]);

  return (
    <div className={`bubble-menu-wrapper ${className}`}>
      {/* TRIGGER BUTTON (CLOSED STATE) - CLEAN CIRCLE WITH 2 PARALLEL VECTOR LINES */}
      {!isOpen && (
        <button
          className="bubble-menu-circle-trigger"
          onClick={() => setIsOpen(true)}
          aria-label={menuAriaLabel}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 2H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M1 10H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* FULLSCREEN OVERLAY MENU (OPEN STATE) */}
      {isOpen && (
        <div className="bubble-menu-overlay">
          {/* BACKDROP CLICK TO CLOSE */}
          <div
            className="bubble-menu-overlay-bg"
            onClick={() => setIsOpen(false)}
          />

          {/* TOP RIGHT CLOSE CIRCLE BUTTON */}
          <button
            className="bubble-menu-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* TOP ALIGNED FLOATING BUBBLE PILLS GRID */}
          <div className="bubble-menu-grid-container">
            {items.map((item, idx) => {
              const hoverBg = item.hoverStyles?.bgColor || '#3b82f6';
              const hoverText = item.hoverStyles?.textColor || '#ffffff';
              const initRotation = item.rotation ?? 0;
              const isExternal = item.href.startsWith('http');
              const isLastSingle = items.length % 2 !== 0 && idx === items.length - 1;

              const pillProps = {
                ref: (el) => (bubbleListRef.current[idx] = el),
                href: item.href,
                'aria-label': item.ariaLabel || item.label,
                className: `bubble-pill-item ${isLastSingle ? 'is-full-width' : ''}`,
                style: {
                  '--pill-hover-bg': hoverBg,
                  '--pill-hover-text': hoverText,
                  '--pill-rotation': `${initRotation}deg`,
                  '--pill-bg': menuBg,
                  '--pill-color': menuContentColor
                },
                onClick: () => setIsOpen(false)
              };

              if (isExternal) {
                return (
                  <a key={idx} {...pillProps} target="_blank" rel="noopener noreferrer">
                    <span className="bubble-pill-label">{item.label}</span>
                  </a>
                );
              }

              return (
                <Link key={idx} {...pillProps}>
                  <span className="bubble-pill-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
