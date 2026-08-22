'use client';

import React from 'react';
import Link from 'next/link';
import { SiSubstack } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import BubbleMenu from '@/app/components/BubbleMenu';

const bubbleMenuItems = [
  {
    label: 'home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '/about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '/#work',
    ariaLabel: 'Projects',
    rotation: -8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'blog',
    href: '/blogs',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'why me',
    href: '/#why-me',
    ariaLabel: 'Why Me',
    rotation: -8,
    hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '/#contact',
    ariaLabel: 'Contact',
    rotation: 8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

export default function AboutPage() {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

    const handleLetsBuildTogether = (e: React.MouseEvent) => {
        e.preventDefault();
        const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            window.open("https://api.whatsapp.com/send?phone=772796969906&text=Hi%20Pranesh,%20I'd%20like%20to%20connect%20about%20an%20AI%20product%20opportunity!", "_blank");
        } else {
            window.open("https://www.linkedin.com/in/pranesh-soni", "_blank");
        }
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
        }

        const cursor = document.getElementById('cursor');
        const label = document.getElementById('cursorLabel');

        if (matchMedia('(pointer:fine)').matches && cursor && label) {
            const onMouseMove = (e: MouseEvent) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            };

            window.addEventListener('mousemove', onMouseMove, { passive: true });

            function onMouseEnter(e: Event) {
                const target = e.currentTarget as HTMLElement;
                if (cursor && label) {
                    cursor.classList.add('active');
                    label.textContent = target.dataset.cursor || 'EXPLORE';
                }
            }

            function onMouseLeave() {
                if (cursor && label) {
                    cursor.classList.remove('active');
                    label.textContent = '';
                }
            }

            const bindTargets = document.querySelectorAll('[data-cursor], a, button');
            bindTargets.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnter);
                el.addEventListener('mouseleave', onMouseLeave);
            });

            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                bindTargets.forEach(el => {
                    el.removeEventListener('mouseenter', onMouseEnter);
                    el.removeEventListener('mouseleave', onMouseLeave);
                });
            };
        }
    }, []);

    return (
        <div className="about-page-container">
            <div className="cursor" id="cursor">
                <span className="cursor-label" id="cursorLabel"></span>
            </div>
            {/* NAVBAR */}
            <header className="cways-header about-nav">
                <Link href="/" className="cways-logo" data-cursor="PRANESH">pranesh soni</Link>

                <nav className="cways-nav">
                    <Link href="/about" className="active" data-cursor="ABOUT">About</Link>
                    <Link href="/#work" data-cursor="PROJECTS">Projects</Link>
                    <Link href="/blogs" data-cursor="BLOGS">Blogs</Link>
                    <Link href="/#why-me" data-cursor="WHY ME">Why Me</Link>
                </nav>

                <div className="header-actions">
                    <BubbleMenu
                        logo={<span style={{ fontWeight: 700 }}>PS</span>}
                        items={bubbleMenuItems}
                        menuAriaLabel="Toggle navigation"
                        menuBg="#ffffff"
                        menuContentColor="#111111"
                        useFixedPosition={false}
                        animationEase="back.out(1.5)"
                        animationDuration={0.5}
                        staggerDelay={0.12}
                        className="cways-bubble-menu-mobile"
                    />
                    <a
                        href="/Pranesh_Soni_Resume.pdf"
                        download="Pranesh_Soni_Resume.pdf"
                        className="cways-header-cta cways-desktop-only-cta"
                        data-cursor="DOWNLOAD RESUME"
                    >
                        RESUME <span className="arrow" style={{ transform: 'none', marginLeft: '6px', fontSize: '0.95rem' }}>↓</span>
                    </a>
                </div>
            </header>

            {/* FULL SCREEN OVERLAY MOBILE & PORTRAIT MENU DRAWER */}
            {isMenuOpen && (
                <div className="cways-mobile-menu-overlay about-mobile-menu">
                    <div className="cways-mobile-menu-header">
                        <Link href="/" className="cways-logo" onClick={() => setIsMenuOpen(false)}>pranesh soni</Link>
                        <button className="cways-mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
                            CLOSE ✕
                        </button>
                    </div>
                    <div className="cways-mobile-menu-links">
                        <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                            <span className="num">01</span> ABOUT
                        </Link>
                        <Link href="/#work" onClick={() => setIsMenuOpen(false)}>
                            <span className="num">02</span> PROJECTS
                        </Link>
                        <Link href="/blogs" onClick={() => setIsMenuOpen(false)}>
                            <span className="num">03</span> BLOGS
                        </Link>
                        <Link href="/#why-me" onClick={() => setIsMenuOpen(false)}>
                            <span className="num">04</span> WHY ME
                        </Link>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <main className="about-main-content">
                {/* CREATIVE ANIMATED BLUEPRINT & PRODUCT ARCHITECTURE BACKGROUND */}
                <div className="about-blueprint-bg" aria-hidden="true">
                    <div className="blueprint-grid-mesh"></div>
                    <svg className="blueprint-svg-canvas" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="220" cy="280" r="190" stroke="rgba(17,17,17,0.05)" strokeWidth="1.5" strokeDasharray="6 6" className="rotating-blueprint-ring" />
                        <circle cx="1220" cy="620" r="220" stroke="rgba(239,96,71,0.06)" strokeWidth="1.5" strokeDasharray="12 8" className="rotating-blueprint-ring-reverse" />
                        <line x1="0" y1="420" x2="1440" y2="420" stroke="rgba(17,17,17,0.04)" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="720" y1="0" x2="720" y2="1800" stroke="rgba(17,17,17,0.04)" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                </div>

                <div className="about-hero-block">
                    <h1 className="cways-page-title">
                        ABOUT. <span className="cways-stroke-text-dark">PRANESH.</span>
                    </h1>

                    <div className="about-role-tag">AI PRODUCT OWNER / MANAGER</div>

                    <p className="cways-hero-subtitle">
                        Pranesh is an AI product manager with over three years of experience building and delivering AI-based products, turning complex workflows into intuitive, high-value software solutions.
                    </p>
                </div>

                {/* HORIZONTAL DIVIDER LINE */}
                <div className="cways-grid-divider"></div>

                {/* 2x2 GRID BLOCK SYSTEM MATCHING ATTACHED SCREENSHOT */}
                <div className="cways-2col-grid">
                    <div className="cways-grid-item">
                        <h3 className="cways-grid-title">BUILDING & SHIPPING PRODUCTS</h3>
                        <p className="cways-grid-desc">
                            He worked out early in his career what genuinely excites him: <strong>building and shipping products</strong>. What makes the role so rewarding is the chance to sit with a real pain point, understand it properly, and design a solution for it. When it works, it does more than move a KPI — it brings a real sense of satisfaction.
                        </p>
                    </div>

                    <div className="cways-grid-item">
                        <h3 className="cways-grid-title">THE HARD PART IS NOT THE MODEL</h3>
                        <p className="cways-grid-desc">
                            Both industry work and hands-on builds taught him the same lesson: <strong>the hard part of AI products is not the model</strong>, it is understanding the problem well enough to make the answer trustworthy and reliable for real users.
                        </p>
                    </div>

                    <div className="cways-grid-item">
                        <h3 className="cways-grid-title">EDUCATION & CERTIFICATIONS</h3>
                        <p className="cways-grid-desc">
                            He holds an <strong>MBA from IIM Jammu, class of 2023</strong>, along with the <strong>SAFe 6.0 POPM certification</strong>, and is an <strong>AWS Certified AI Practitioner</strong>. He keeps upskilling in the field as it moves, leaning fully on market AI tools to build end-to-end products like Loop.
                        </p>
                    </div>

                    <div className="cways-grid-item">
                        <h3 className="cways-grid-title">FREELANCE AI PO/PM SERVICES</h3>
                        <p className="cways-grid-desc">
                            He serves as an individual contributor and helps companies and startups offering his services as a <strong>Freelancer for the AI PO/PM domain</strong> — from initial opportunity discovery and RAG architecture to deployment and adoption.
                        </p>
                    </div>
                </div>

                {/* THE PERSON TIMELINE VIEW */}
                <section className="timeline" style={{ marginTop: '64px', marginBottom: '48px', width: '100%' }}>
                    <div className="timeline-head">
                        <div className="section-label">THE PERSON</div>
                        <h2 className="cways-section-title">
                            HOW I GOT <span className="cways-stroke-text-dark">HERE.</span>
                        </h2>
                    </div>

                    <div className="creative-timeline-container" style={{ marginTop: '36px' }}>
                        {/* TOP JOURNEY EVOLUTION TRACKER */}
                        <div className="timeline-journey-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', padding: '18px 24px', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.02)', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }}></span>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '0.15em' }}>PRODUCT JOURNEY</span>
                            </div>
                            <div className="journey-nodes" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700 }}>
                                <span style={{ color: '#111111' }}>01 FOUNDATION</span>
                                <span style={{ color: '#bbb' }}>→</span>
                                <span style={{ color: '#111111' }}>02 GLOBAL</span>
                                <span style={{ color: '#bbb' }}>→</span>
                                <span style={{ color: '#111111' }}>03 ENTERPRISE</span>
                                <span style={{ color: '#bbb' }}>→</span>
                                <span style={{ color: '#ffffff', background: '#111111', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>04 NOW / BUILDING</span>
                            </div>
                        </div>

                        {/* CREATIVE GRID TIMELINE CARDS */}
                        <div className="creative-timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                            {/* MILESTONE CARD 1 */}
                            <div className="timeline-card-node" style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#111111' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, color: '#777777', letterSpacing: '0.12em' }}>MILESTONE 01</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: '#111111', background: '#f0f0ed', padding: '4px 10px', borderRadius: '20px' }}>2023</span>
                                </div>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111111', marginBottom: '6px', letterSpacing: '-0.02em' }}>IIM JAMMU</h3>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#666666', letterSpacing: '0.1em', marginBottom: '14px', textTransform: 'uppercase' }}>MBA — PRODUCT &amp; STRATEGY</div>
                                <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                                    Graduated with an MBA focusing on product management, business strategy, technology workflows, and leadership fundamentals.
                                </p>
                            </div>

                            {/* MILESTONE CARD 2 */}
                            <div className="timeline-card-node" style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#111111' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, color: '#777777', letterSpacing: '0.12em' }}>MILESTONE 02</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: '#111111', background: '#f0f0ed', padding: '4px 10px', borderRadius: '20px' }}>2023 / EXCH</span>
                                </div>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111111', marginBottom: '6px', letterSpacing: '-0.02em' }}>SOLBRIDGE</h3>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#666666', letterSpacing: '0.1em', marginBottom: '14px', textTransform: 'uppercase' }}>SOUTH KOREA EXCHANGE</div>
                                <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                                    Selected for the Student Exchange Program at SolBridge International School of Business, gaining global tech &amp; market perspective.
                                </p>
                            </div>

                            {/* MILESTONE CARD 3 */}
                            <div className="timeline-card-node" style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#111111' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, color: '#111111', letterSpacing: '0.12em' }}>MILESTONE 03</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: '#ffffff', background: '#111111', padding: '4px 10px', borderRadius: '20px' }}>3+ YEARS</span>
                                </div>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111111', marginBottom: '6px', letterSpacing: '-0.02em' }}>AI PRODUCT OWNER</h3>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#666666', letterSpacing: '0.1em', marginBottom: '14px', textTransform: 'uppercase' }}>ENTERPRISE DEPLOYMENT</div>
                                <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                                    Delivering enterprise AI products across discovery, RAG system architecture, stakeholder alignment, UAT, and global scaling.
                                </p>
                            </div>

                            {/* MILESTONE CARD 4 */}
                            <div className="timeline-card-node" style={{ background: '#111111', color: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#ffffff' }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.12em' }}>MILESTONE 04</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: '#111111', background: '#ffffff', padding: '4px 10px', borderRadius: '20px' }}>NOW</span>
                                </div>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px', letterSpacing: '-0.02em' }}>BUILDING THE FUTURE</h3>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', marginBottom: '14px', textTransform: 'uppercase' }}>HANDS-ON AI EXECUTION</div>
                                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: 0 }}>
                                    Prototyping, experimenting, and bringing AI products from vision to working code — turning complex AI capabilities into trusted products.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION BUTTONS */}
                <div className="about-actions">
                    <Link href="/#work" className="cways-btn-primary" data-cursor="WORK">VIEW WORK</Link>
                    <a
                        href="#contact"
                        onClick={handleLetsBuildTogether}
                        className="cways-btn-outline"
                        data-cursor="CONNECT"
                    >
                        LET'S BUILD TOGETHER
                    </a>
                </div>
            </main>

            {/* UNIFIED FOOTER */}
            <footer className="cways-footer-theme" id="contact">
                <div className="cways-footer-inner">
                    <div className="cways-footer-eyebrow">08 / LET'S BUILD</div>

                    <h2 className="cways-footer-heading">
                        GOT A GOOD <span className="cways-stroke-text-dark">PROBLEM?</span>
                    </h2>

                    <p className="cways-footer-subtext">
                        AI product opportunity, prototype build, life sciences RAG solution, or strategic advisory — let's start a conversation.
                    </p>

                    <a href="mailto:praneshsoni@outlook.com" className="cways-footer-email" data-cursor="EMAIL">
                        PRANESHSONI@OUTLOOK.COM
                    </a>

                    <div className="cways-footer-author-row">
                        <span className="author-dot"></span>
                        <span className="author-name">PRANESH SONI</span>
                        <span className="author-sep">—</span>
                        <span className="author-title">AI PRODUCT OWNER & BUILDER</span>
                    </div>

                    <div className="cways-footer-socials">
                        <a href="https://www.linkedin.com/in/pranesh-soni" target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN">
                            <FaLinkedin className="social-icon" /> LINKEDIN
                        </a>
                        <a href="https://substack.com/@praneshsoni" target="_blank" rel="noopener noreferrer" data-cursor="SUBSTACK">
                            <SiSubstack className="social-icon" /> SUBSTACK
                        </a>
                    </div>

                    <div className="cways-footer-bottom-bar">
                        <div className="cways-footer-copy">© 2026 PRANESH SONI.</div>
                        <div className="cways-footer-nav-links">
                            <Link href="/" className="cways-back-top" data-cursor="TOP">
                                Back to home ↑
                            </Link>
                        </div>
                    </div>

                    <div className="cways-footer-stroke-brand">
                        PRANESH SONI
                    </div>
                </div>
            </footer>
        </div>
    );
}
