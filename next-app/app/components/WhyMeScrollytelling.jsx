'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import GlassSurface from './GlassSurface';
import './WhyMeScrollytelling.css';

const WHY_ME_POINTERS = [
  {
    id: 1,
    step: '01 / 05',
    tag: 'OWNERSHIP',
    text: 'End-to-end ownership: PRD to launch to post-launch iteration'
  },
  {
    id: 2,
    step: '02 / 05',
    tag: 'ALIGNMENT',
    text: 'Align engineering, design, business & customers — even when they disagree'
  },
  {
    id: 3,
    step: '03 / 05',
    tag: 'PRIORITIZATION',
    text: 'Outcome-based prioritization, not opinion-based prioritization'
  },
  {
    id: 4,
    step: '04 / 05',
    tag: 'DELIVERY',
    text: 'Unblock, adapt scope, handle escalations — stay in it till it works'
  },
  {
    id: 5,
    step: '05 / 05',
    tag: 'INNOVATION',
    text: 'Turn new tech into working prototypes, not slide decks'
  }
];

export const WhyMeScrollytelling = () => {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(740);
  const [cardHeight, setCardHeight] = useState(210);
  const isUpdatingRef = useRef(false);

  // Responsive GlassSurface dimensions
  const updateCardDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w < 480) {
      setCardWidth(w - 36);
      setCardHeight(230);
    } else if (w < 768) {
      setCardWidth(w - 56);
      setCardHeight(220);
    } else if (w < 1024) {
      setCardWidth(620);
      setCardHeight(210);
    } else {
      setCardWidth(760);
      setCardHeight(210);
    }
  }, []);

  // Map scroll progress through track to pointer index (0..4)
  const handleScroll = useCallback(() => {
    if (!trackRef.current || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    requestAnimationFrame(() => {
      if (!trackRef.current) {
        isUpdatingRef.current = false;
        return;
      }

      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable > 0) {
        // Calculate progress from 0 (top of section enters sticky) to 1 (bottom reaches unpin)
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

        // Map progress across the 5 pointers with balanced intervals
        const totalItems = WHY_ME_POINTERS.length;
        const rawIndex = Math.floor(progress * totalItems);
        const nextIndex = Math.max(0, Math.min(totalItems - 1, rawIndex));

        setCurrentIndex(nextIndex);
      }

      isUpdatingRef.current = false;
    });
  }, []);

  useEffect(() => {
    updateCardDimensions();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updateCardDimensions();
      handleScroll();
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCardDimensions);
    };
  }, [handleScroll, updateCardDimensions]);

  // Direct navigation for accessibility
  const handleDotClick = (idx) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;
    const targetScrollY = window.scrollY + rect.top + (idx / WHY_ME_POINTERS.length) * totalScrollable + 10;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const currentPointer = WHY_ME_POINTERS[currentIndex];

  return (
    <div className="why-me-scroll-track" ref={trackRef}>
      <section className="why-me-sticky-viewport" id="why-me">
        {/* RADAR PULSE AMBIENT BACKGROUND */}
        <div className="whyme-radar-bg" aria-hidden="true">
          <div className="radar-ring r1"></div>
          <div className="radar-ring r2"></div>
          <div className="radar-ring r3"></div>
        </div>

        <div className="why-me-scrolly-inner">
          {/* SECTION HEADER BLOCK */}
          <div className="why-me-header-block">
            <div className="section-label">04 / WHY ME</div>
            <h2 className="cways-section-title light-theme">
              WHY <span className="cways-stroke-text-light">ME.</span>
            </h2>
            <div className="why-me-sub">
              Bridging complex AI technology with enterprise business impact across life sciences, healthcare &amp; clinical operations.
            </div>
          </div>

          {/* SCROLL-PINNED GLASSSURFACE CARD */}
          <div className="why-me-glass-wrapper">
            <GlassSurface
              width={cardWidth}
              height={cardHeight}
              borderRadius={24}
              displace={15}
              distortionScale={-150}
              redOffset={5}
              greenOffset={15}
              blueOffset={25}
              brightness={60}
              opacity={0.8}
              mixBlendMode="screen"
              className="why-me-glass-card"
            >
              <div className="why-me-pointer-container" key={currentPointer.id}>
                <div className="why-me-pointer-header">
                  <span className="why-me-pointer-num">{currentPointer.step}</span>
                  <span className="why-me-pointer-separator">/</span>
                  <span className="why-me-pointer-tag">{currentPointer.tag}</span>
                </div>
                <p className="why-me-pointer-text">{currentPointer.text}</p>
              </div>
            </GlassSurface>

            {/* INTERACTIVE STEP PROGRESS INDICATORS */}
            <div className="why-me-step-tracker" role="tablist" aria-label="Why Me Pointers">
              {WHY_ME_POINTERS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Step ${idx + 1}: ${item.tag}`}
                  className={`why-me-step-dot ${currentIndex === idx ? 'active' : ''} ${currentIndex > idx ? 'completed' : ''}`}
                  onClick={() => handleDotClick(idx)}
                >
                  <span className="step-dot-fill" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyMeScrollytelling;
