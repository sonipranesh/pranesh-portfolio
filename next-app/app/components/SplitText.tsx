'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: React.ElementType;
  strokeWords?: string[];
  strokeClass?: string;
  style?: React.CSSProperties;
  onLetterAnimationComplete?: () => void;
  children?: React.ReactNode;
}

export default function SplitText({
  text = '',
  className = '',
  delay = 40,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'left',
  tag: Tag = 'h2',
  strokeWords = [],
  strokeClass = 'cways-stroke-text-dark',
  style = {},
  onLetterAnimationComplete,
  children
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const contentText = text || (typeof children === 'string' ? children : '');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            const targets = splitType === 'chars'
              ? el.querySelectorAll('.split-char')
              : el.querySelectorAll('.split-word');

            if (targets.length > 0) {
              const staggerSec = typeof delay === 'number' && delay > 1 ? delay / 1000 : (delay || 0.04);
              gsap.fromTo(
                targets,
                {
                  opacity: from.opacity !== undefined ? from.opacity : 0,
                  y: from.y !== undefined ? from.y : 40,
                  x: from.x !== undefined ? from.x : 0,
                  scale: from.scale !== undefined ? from.scale : 1
                },
                {
                  opacity: to.opacity !== undefined ? to.opacity : 1,
                  y: to.y !== undefined ? to.y : 0,
                  x: to.x !== undefined ? to.x : 0,
                  scale: to.scale !== undefined ? to.scale : 1,
                  duration: duration || 0.6,
                  ease: ease || 'power3.out',
                  stagger: staggerSec,
                  onComplete: () => {
                    if (onLetterAnimationComplete) {
                      onLetterAnimationComplete();
                    }
                  }
                }
              );
            }
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: threshold !== undefined ? threshold : 0.1,
        rootMargin: rootMargin || '-50px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, from, to, duration, ease, delay, splitType, threshold, rootMargin, onLetterAnimationComplete]);

  const words = contentText.split(' ').filter(Boolean);

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ textAlign, overflowWrap: 'break-word', ...style }}
    >
      {words.map((word, wordIdx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isStroke = strokeWords.some((sw) => {
          const cleanSw = sw.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          return cleanSw === cleanWord || word.toLowerCase().includes(sw.toLowerCase());
        });

        return (
          <span
            key={wordIdx}
            className={`split-word-wrap ${isStroke ? strokeClass : ''}`}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: wordIdx < words.length - 1 ? '0.28em' : '0'
            }}
          >
            {splitType === 'chars'
              ? word.split('').map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="split-char"
                    style={{
                      display: 'inline-block',
                      opacity: 0,
                      transform: from.y !== undefined ? `translate3d(0, ${from.y}px, 0)` : 'translate3d(0, 40px, 0)',
                      willChange: 'transform, opacity'
                    }}
                  >
                    {char}
                  </span>
                ))
              : (
                <span
                  className="split-word"
                  style={{
                    display: 'inline-block',
                    opacity: 0,
                    transform: from.y !== undefined ? `translate3d(0, ${from.y}px, 0)` : 'translate3d(0, 40px, 0)',
                    willChange: 'transform, opacity'
                  }}
                >
                  {word}
                </span>
              )}
          </span>
        );
      })}
    </Tag>
  );
}
