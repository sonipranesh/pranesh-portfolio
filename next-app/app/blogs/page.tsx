'use client';

import React from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  tag: string;
  readTime: string;
  date: string;
  title: string;
  summary: string;
  link: string;
}

export default function BlogsPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [selectedTag, setSelectedTag] = React.useState<string>('ALL');

  const handleLetsBuildTogether = (e: React.MouseEvent) => {
    e.preventDefault();
    const isMobile =
      typeof window !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(
        "https://api.whatsapp.com/send?phone=772796969906&text=Hi%20Pranesh,%20I'd%20like%20to%20connect%20about%20an%20AI%20product%20opportunity!",
        '_blank'
      );
    } else {
      window.open("https://www.linkedin.com/in/pranesh-soni", "_blank");
    }
  };

  React.useEffect(() => {
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    let bindCursorEvents = () => {};

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
          label.textContent = target.dataset.cursor || target.textContent?.trim().slice(0, 24) || 'READ ARTICLE';
        }
      }

      function onMouseLeave() {
        if (cursor && label) {
          cursor.classList.remove('active');
          label.textContent = '';
        }
      }

      bindCursorEvents = function () {
        document.querySelectorAll('[data-cursor], a, button, .blog-card-item').forEach(el => {
          el.removeEventListener('mouseenter', onMouseEnter);
          el.removeEventListener('mouseleave', onMouseLeave);
          el.addEventListener('mouseenter', onMouseEnter);
          el.addEventListener('mouseleave', onMouseLeave);
        });
      };

      bindCursorEvents();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      tag: 'RAG ARCHITECTURE',
      readTime: '6 MIN READ',
      date: 'AUG 2024',
      title: 'The Architecture of Enterprise RAG: Lessons from Scaling to 550+ Users in Life Sciences',
      summary:
        'Building RAG systems for enterprise contracts and SOP discovery requires low-temperature grounded generation, page-level citation mapping, and dual-stage candidate reranking to eliminate hallucination in regulated environments.',
      link: 'https://substack.com/@praneshsoni'
    },
    {
      id: '2',
      tag: 'COMPLIANCE & GXP',
      readTime: '8 MIN READ',
      date: 'NOV 2024',
      title: 'Why Human-in-the-Loop is Non-Negotiable for GxP & Clinical AI Workflows',
      summary:
        'Operating within 21 CFR Part 11 and ICH GCP boundaries: balancing deterministic data pipelines with LLM judgment without risking audit failure or silent document drift.',
      link: 'https://substack.com/@praneshsoni'
    },
    {
      id: '3',
      tag: 'PRODUCT LEADERSHIP',
      readTime: '5 MIN READ',
      date: 'JAN 2025',
      title: "From PRD to Production: The AI Product Owner's Evaluation Playbook",
      summary:
        'How to structure AI quality validation dimensions spanning Context Precision, Top-K Recall, Groundedness, and Abstention Accuracy to achieve 89% adoption and 97% user retention.',
      link: 'https://substack.com/@praneshsoni'
    },
    {
      id: '4',
      tag: 'AI VISION & AGENTS',
      readTime: '7 MIN READ',
      date: 'FEB 2025',
      title: 'Everyone Deserves a Jarvis: Expanding Human Capability with Agentic AI',
      summary:
        'Reducing the friction between intent and execution — why multi-step agentic workflows allow individual product builders to take complex ideas from concept map to production software.',
      link: 'https://substack.com/@praneshsoni'
    }
  ];

  const tags = ['ALL', 'RAG ARCHITECTURE', 'COMPLIANCE & GXP', 'PRODUCT LEADERSHIP', 'AI VISION & AGENTS'];

  const filteredPosts =
    selectedTag === 'ALL'
      ? blogPosts
      : blogPosts.filter(p => p.tag === selectedTag);

  return (
    <div className="about-page-container blogs-page-container">
      <div className="cursor" id="cursor">
        <span className="cursor-label" id="cursorLabel"></span>
      </div>

      {/* NAVBAR */}
      <header className="cways-header about-nav">
        <Link href="/" className="cways-logo" data-cursor="PRANESH">
          pranesh soni
        </Link>

        <nav className="cways-nav">
          <Link href="/about" data-cursor="ABOUT">
            About
          </Link>
          <Link href="/#work" data-cursor="SERVICES">
            Services
          </Link>
          <Link href="/#work" data-cursor="PORTFOLIO">
            Portfolio
          </Link>
          <Link href="/blogs" className="active" data-cursor="BLOGS">
            Blogs
          </Link>
          <Link href="/#why-me" data-cursor="WHY ME">
            Why Me
          </Link>
        </nav>

        <div className="header-actions">
          <button
            className="cways-menu-toggle about-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              'CLOSE ✕'
            ) : (
              <span className="hamburger-wrap">
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M1 6.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M1 11.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            )}
          </button>
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

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="cways-mobile-menu-overlay about-mobile-menu">
          <div className="cways-mobile-menu-header">
            <Link href="/" className="cways-logo" onClick={() => setIsMenuOpen(false)}>
              pranesh soni
            </Link>
            <button className="cways-mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
              CLOSE ✕
            </button>
          </div>
          <div className="cways-mobile-menu-links">
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              <span className="num">01</span> ABOUT
            </Link>
            <Link href="/#work" onClick={() => setIsMenuOpen(false)}>
              <span className="num">02</span> SERVICES
            </Link>
            <Link href="/#work" onClick={() => setIsMenuOpen(false)}>
              <span className="num">03</span> PORTFOLIO
            </Link>
            <Link href="/blogs" onClick={() => setIsMenuOpen(false)}>
              <span className="num">04</span> BLOGS
            </Link>
            <Link href="/#why-me" onClick={() => setIsMenuOpen(false)}>
              <span className="num">05</span> WHY ME
            </Link>
          </div>
          <div className="cways-mobile-menu-footer">
            <a
              href="#contact"
              onClick={e => {
                setIsMenuOpen(false);
                handleLetsBuildTogether(e);
              }}
              className="cways-btn-primary"
            >
              LET&apos;S CONNECT ↗
            </a>
          </div>
        </div>
      )}

      {/* BLOGS HERO SECTION */}
      <section className="blogs-hero-section">
        <div className="blogs-hero-inner">
          <div className="section-label">04 / THOUGHTS &amp; INSIGHTS</div>
          <h1 className="cways-section-title light-theme blogs-main-title">
            WRITING &amp;<br />
            <span className="cways-stroke-text-light">MANIFESTO.</span>
          </h1>
          <p className="blogs-hero-subtext">
            Perspectives on building enterprise GenAI products, RAG architecture, agentic workflows, GxP compliance, and the future of human-AI collaboration in regulated industries.
          </p>

          {/* TAG FILTERS */}
          <div className="blogs-filter-bar">
            {tags.map(t => (
              <button
                key={t}
                className={`blog-filter-btn ${selectedTag === t ? 'active' : ''}`}
                onClick={() => setSelectedTag(t)}
                data-cursor="FILTER"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG POSTS GRID SECTION */}
      <section className="blogs-grid-section">
        <div className="blogs-grid-inner">
          <div className="blogs-grid">
            {filteredPosts.map((post, idx) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card-item"
                data-cursor="READ ARTICLE ↗"
              >
                <div className="blog-card-meta">
                  <span className="blog-card-tag">{post.tag}</span>
                  <div className="blog-card-time-date">
                    <span>{post.readTime}</span>
                    <span className="sep">•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-summary">{post.summary}</p>
                <div className="blog-card-cta">
                  <span>READ ON SUBSTACK</span>
                  <span className="arrow">↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSTACK NEWSLETTER BANNER */}
      <section className="blogs-newsletter-section">
        <div className="blogs-newsletter-inner">
          <div className="newsletter-badge">SUBSTACK NEWSLETTER</div>
          <h2>Subscribe for deep-dives on AI Product Architecture &amp; Enterprise RAG.</h2>
          <p>Get notified whenever I publish new technical insights, product teardowns, and framework breakdowns.</p>
          <a
            href="https://substack.com/@praneshsoni"
            target="_blank"
            rel="noopener noreferrer"
            className="cways-btn-primary"
            data-cursor="SUBSTACK ↗"
          >
            SUBSCRIBE ON SUBSTACK ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cways-footer-theme" id="contact">
        <div className="cways-footer-inner">
          <div className="cways-footer-eyebrow">08 / LET&apos;S BUILD</div>
          <h2 className="cways-footer-heading">
            GOT A GOOD<br />
            <span className="cways-stroke-text-dark">PROBLEM?</span>
          </h2>
          <p className="cways-footer-subtext">
            AI product opportunity, prototype build, life sciences RAG solution, or strategic advisory — let&apos;s start a conversation.
          </p>
          <a href="mailto:praneshsoni@outlook.com" className="cways-footer-email" data-cursor="EMAIL">
            PRANESHSONI@OUTLOOK.COM
          </a>
          <div className="cways-footer-author-row">
            <span className="author-dot"></span>
            <span className="author-name">PRANESH SONI</span>
            <span className="author-sep">—</span>
            <span className="author-title">AI PRODUCT OWNER &amp; BUILDER</span>
          </div>
          <div className="cways-footer-socials">
            <a href="https://www.linkedin.com/in/pranesh-soni" target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN">
              LINKEDIN
            </a>
            <a href="https://substack.com/@praneshsoni" target="_blank" rel="noopener noreferrer" data-cursor="SUBSTACK">
              SUBSTACK
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
          <div className="cways-footer-stroke-brand">PRANESH SONI</div>
        </div>
      </footer>
    </div>
  );
}
