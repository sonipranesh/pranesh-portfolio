'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    const handleLetsBuildTogether = (e: React.MouseEvent) => {
        e.preventDefault();
        const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            window.open("https://api.whatsapp.com/send?phone=772796969906&text=Hi%20Pranesh,%20I'd%20like%20to%20connect%20about%20an%20AI%20product%20opportunity!", "_blank");
        } else {
            window.open("https://www.linkedin.com/in/pranesh-soni", "_blank");
        }
    };

    return (
        <div className="about-page-container">
            {/* NAVBAR */}
            <header className="cways-header about-nav">
                <Link href="/" className="cways-logo" data-cursor="PRANESH">pranesh soni</Link>

                <nav className="cways-nav">
                    <Link href="/about" className="active" data-cursor="ABOUT">About</Link>
                    <Link href="/#work" data-cursor="SERVICES">Services</Link>
                    <Link href="/#work" data-cursor="PORTFOLIO">Portfolio</Link>
                    <Link href="/#manifesto" data-cursor="BLOGS">Blogs</Link>
                    <Link href="/about" data-cursor="WHY ME">Why Me</Link>
                </nav>

                <div className="header-actions">
                    <a href="#contact" onClick={handleLetsBuildTogether} className="cways-header-cta" data-cursor="CONTACT">
                        LET'S BUILD
                    </a>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="about-main-content">
                <div className="about-hero-block">
                    <h1 className="cways-page-title">
                        ABOUT<br />
                        <span className="cways-stroke-text-dark">PRANESH.</span>
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
                        GOT A GOOD<br />
                        <span className="cways-stroke-text-dark">PROBLEM?</span>
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
                            LINKEDIN
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
