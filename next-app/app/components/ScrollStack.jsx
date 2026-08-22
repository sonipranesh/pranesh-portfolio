'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 280,
  itemScale = 0.04,
  itemStackDistance = 24,
  stackPosition = '130px',
  scaleEndPosition = '60px',
  baseScale = 0.90,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete = () => {}
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const cardsRef = useRef([]);
  const initialCardTopsRef = useRef([]);
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    if (typeof value === 'string' && value.includes('px')) {
      return parseFloat(value);
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : window.innerHeight
      };
    }
  }, [useWindowScroll]);

  const getStaticCardTop = useCallback((card, index) => {
    if (initialCardTopsRef.current[index] !== undefined) {
      return initialCardTopsRef.current[index];
    }
    const rect = card.getBoundingClientRect();
    let currentY = 0;
    const currentTransform = card.style.transform;
    if (currentTransform) {
      const match = currentTransform.match(/translate3d\([^,]+,\s*([^p]+)px/);
      if (match && match[1]) {
        currentY = parseFloat(match[1]) || 0;
      }
    }
    const top = rect.top + (useWindowScroll ? window.scrollY : 0) - currentY;
    initialCardTopsRef.current[index] = top;
    return top;
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const effectiveStackPosition = isMobile ? '80px' : stackPosition;
    const stackPositionPx = parsePercentage(effectiveStackPosition, containerHeight);
    const effectiveItemStackDistance = isMobile ? 16 : itemStackDistance;

    const lastCardIndex = cardsRef.current.length - 1;
    const lastCard = cardsRef.current[lastCardIndex];
    const lastCardTop = lastCard ? getStaticCardTop(lastCard, lastCardIndex) : 0;
    const allStackedScrollTop = lastCardTop - stackPositionPx - effectiveItemStackDistance * lastCardIndex;
    const stackLinger = isMobile ? 40 : 120;
    const universalPinEnd = allStackedScrollTop + stackLinger;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getStaticCardTop(card, i);
      const pinStart = cardTop - stackPositionPx - effectiveItemStackDistance * i;
      const pinEnd = universalPinEnd;

      const triggerStart = pinStart;
      const triggerEnd = pinStart + (isMobile ? 160 : 260);

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + effectiveItemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + effectiveItemStackDistance * i;
      }

      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      card.style.transform = transform;
      card.style.zIndex = i + 1;

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getStaticCardTop
  ]);

  const handleScroll = useCallback(() => {
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        updateCardTransforms();
        animationFrameRef.current = null;
      });
    }
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    initialCardTopsRef.current = [];

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller?.querySelectorAll('.scroll-stack-card') || []
    );

    cardsRef.current = cards;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const effectiveDistance = isMobile ? 120 : itemDistance;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${effectiveDistance}px`;
      } else {
        card.style.marginBottom = '0px';
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translate3d(0,0,0)';
    });

    updateCardTransforms();

    const targetScrollObj = useWindowScroll ? window : scroller;
    if (targetScrollObj) {
      targetScrollObj.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', () => {
        initialCardTopsRef.current = [];
        const isMob = typeof window !== 'undefined' && window.innerWidth <= 768;
        const effDist = isMob ? 120 : itemDistance;
        cardsRef.current.forEach((c, idx) => {
          if (idx < cardsRef.current.length - 1) {
            c.style.marginBottom = `${effDist}px`;
          }
        });
        handleScroll();
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (targetScrollObj) {
        targetScrollObj.removeEventListener('scroll', handleScroll);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      initialCardTopsRef.current = [];
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    handleScroll,
    updateCardTransforms
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
