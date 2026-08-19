'use client';

import React, { useState, useEffect, useRef } from 'react';

interface NeonRevealProps {
    src: string;
    alt?: string;
    neonColor?: string;
    duration?: number;
    delay?: number;
    className?: string;
    children?: React.ReactNode;
}

export default function NeonReveal({
    src,
    alt = "Hero Section Background",
    neonColor = "#ef6047",
    duration = 2200,
    delay = 300,
    className = "",
    children
}: NeonRevealProps) {
    const [progress, setProgress] = useState<number>(0);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const timeoutId = setTimeout(() => {
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const currentProgress = Math.min(100, (elapsed / duration) * 100);

                setProgress(currentProgress);

                if (currentProgress < 100) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setIsRevealed(true);
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [duration, delay]);

    const handleReTrigger = () => {
        setIsRevealed(false);
        setProgress(0);
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const currentProgress = Math.min(100, (elapsed / duration) * 100);

            setProgress(currentProgress);

            if (currentProgress < 100) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setIsRevealed(true);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div
            ref={containerRef}
            className={`neon-reveal-container ${className}`}
            onClick={handleReTrigger}
        >
            {/* BASE DIMMED UNREVEALED BACKGROUND LAYER */}
            <div className="neon-layer base-dimmed">
                <img src={src} alt={alt} className="neon-bg-image dimmed" />
            </div>

            {/* FULLY REVEALED VIBRANT LAYER CLIPPED BY NEON SWEEP */}
            <div
                className="neon-layer revealed-layer"
                style={{
                    clipPath: isRevealed ? 'inset(0 0 0 0)' : `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`
                }}
            >
                <img src={src} alt={alt} className="neon-bg-image full-vibrant" />
            </div>

            {/* REALISTIC GLOWING NEON LIGHT BAR SWEEPING ACROSS */}
            {!isRevealed && progress > 0 && progress < 100 && (
                <div
                    className="neon-sweep-bar"
                    style={{
                        left: `${progress}%`,
                        backgroundColor: '#ffffff',
                        boxShadow: `
                            0 0 10px #ffffff,
                            0 0 20px ${neonColor},
                            0 0 45px ${neonColor},
                            0 0 80px ${neonColor},
                            0 0 140px ${neonColor}
                        `
                    }}
                >
                    {/* TOP AND BOTTOM INTENSE LENS FLARES */}
                    <div
                        className="neon-bar-flare top"
                        style={{ background: `radial-gradient(circle, #ffffff 0%, ${neonColor} 60%, transparent 100%)` }}
                    />
                    <div
                        className="neon-bar-flare bottom"
                        style={{ background: `radial-gradient(circle, #ffffff 0%, ${neonColor} 60%, transparent 100%)` }}
                    />
                </div>
            )}

            {/* OVERLAY CONTENT */}
            {children && (
                <div className="neon-content-overlay">
                    {children}
                </div>
            )}
        </div>
    );
}
