'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  },
  {
    label: "let's build",
    href: '/#contact',
    ariaLabel: "Let's Build",
    rotation: 4,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  }
];

interface BlogPost {
  id: string;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  keyTakeaways: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'rag-at-scale',
    category: 'RAG & EVALUATION',
    tag: '01 / SYSTEM ARCHITECTURE',
    title: 'Why Most Enterprise RAG Systems Fail at Scale — And How Grounded Evaluation Fixes It',
    subtitle: 'Moving past naive cosine similarity toward hybrid search, page-level citation mapping, and rigorous evaluation dimensions.',
    date: 'AUG 2026',
    readTime: '8 MIN READ',
    excerpt: 'In enterprise deployments across life sciences and legal operations, standard RAG pipelines often suffer from hallucination leaks, inaccurate chunking, and lack of citation traceability. This essay outlines the multi-stage evaluation framework required to achieve 97%+ retention in production.',
    keyTakeaways: [
      'Why vector similarity alone fails when querying regulated document repositories like Veeva Vault or CAN Handbooks.',
      'Setting up automated evaluation dimensions: Context Recall, Top-K Recall, Citation Precision, and Abstention Accuracy.',
      'The critical separation between AI-powered discovery and authoritative human interpretation.'
    ],
    content: `
      <p>Building a RAG prototype in Python takes twenty lines of code. Building a production RAG system that 550+ enterprise legal users and manufacturing operators rely on every single day is a fundamentally different engineering challenge.</p>
      
      <h3>The Failure Modes of Naive RAG</h3>
      <p>Most naive RAG implementations rely purely on dense vector embeddings and top-k cosine similarity. In enterprise environments containing thousands of multi-page PDFs, technical SOPs, or legal contracts, this approach fails for three distinct reasons:</p>
      <ol>
        <li><strong>Loss of Document Context:</strong> Naive chunking slices paragraphs out of context, losing critical metadata like document status (Active vs Edit status) or section hierarchies.</li>
        <li><strong>Lack of Citation Traceability:</strong> Enterprise users cannot trust a summary unless they can click directly to the exact page and paragraph in the source document.</li>
        <li><strong>Silent Hallucinations:</strong> When a vector query returns weakly relevant chunks, standard LLM prompts force the model to attempt an answer anyway rather than abstaining cleanly.</li>
      </ol>

      <h3>The Production Evaluation Framework</h3>
      <p>To eliminate these risks, evaluation must move beyond superficial manual testing. During production rollouts for Client 1, we implemented systematic automated evaluation across thirteen dimensions:</p>
      <ul>
        <li><strong>Context Recall & Precision:</strong> Verifying that the retrieval engine surfaces 100% of applicable reference clauses while excluding noise.</li>
        <li><strong>Citation Precision:</strong> Ensuring every hyperlink generated points to the exact page-numbered source text.</li>
        <li><strong>Abstention Accuracy:</strong> Testing that out-of-scope or unanswerable queries cleanly abstain rather than hallucinating unsupported guidance.</li>
      </ul>

      <h3>Key Takeaway for AI Product Owners</h3>
      <p>The success of an enterprise GenAI product is measured not by how creative its model output is, but by how reliably it prevents errors in high-stakes operational workflows.</p>
    `
  },
  {
    id: 'agentic-workflows-gxp',
    category: 'ENTERPRISE GenAI',
    tag: '02 / AGENTIC WORKFLOWS',
    title: 'The Shift from Conversational Chatbots to Autonomous Agentic Workflows in GxP',
    subtitle: 'Why single-prompt chat windows are being replaced by multi-agent tool execution and deterministic validation gates.',
    date: 'JUL 2026',
    readTime: '6 MIN READ',
    excerpt: 'Regulated environments like clinical trials and GxP manufacturing do not need open-ended chatbots. They need agentic workflows with explicit tool-use, human-in-the-loop approval gates, and deterministic audit trails.',
    keyTakeaways: [
      'The structural limitation of single-prompt conversational chat in regulated clinical operations.',
      'Architecting multi-tier agent workflows for Master-to-Country Informed Consent Form (ICF) generation.',
      'Designing mandatory human review checkpoints before AI edits ship.'
    ],
    content: `
      <p>For the past three years, enterprise software has been dominated by the "chat sidebar" paradigm. However, in regulated industries such as healthcare, clinical trial operations, and pharmaceutical manufacturing, conversational chatbots present a fundamental flaw: unpredictability.</p>
      
      <h3>Why Chatbots Fail in Clinical Operations</h3>
      <p>Authoring clinical functional plans (such as TMF, Master ICFs, and regulatory compliance checklists under 21 CFR Part 11 and ICH GCP) requires precision. An unconstrained chat interface allows users to request changes, but offers no guarantee that the model won't subtly alter approved master language or drop required regulatory citations.</p>

      <h3>The Dual-Pipeline Architecture</h3>
      <p>When designing <strong>AI Doc Author</strong> for Client 2, we divided the workflow into two distinct, purpose-built engines:</p>
      <ul>
        <li><strong>Deterministic Pipeline:</strong> Standard study data (protocol IDs, site metadata, study arms) is populated directly from SQL source systems with zero model involvement — ensuring 100% data fidelity.</li>
        <li><strong>Constrained Agentic Workflow:</strong> Complex tasks requiring judgment (matching Master ICF language against country-specific regulatory rulebooks) use tool-calling agents scoped strictly to semantic presence/absence validation, returning auditable rationales.</li>
      </ul>

      <h3>Human-in-the-Loop Audit Gates</h3>
      <p>Crucially, no AI-generated section edit or compliance checklist answer is finalized autonomously. Every output is presented to human reviewers with explicit status tags (<em>Proposed</em>, <em>Needs Review</em>, <em>Approved</em>) and source-linked citations.</p>
    `
  },
  {
    id: 'veeva-vault-genai-lessons',
    category: 'ENTERPRISE SCALE',
    tag: '03 / LESSONS FROM FIELD',
    title: 'Veeva Vault + GenAI: Lessons from 25 Global Site Deployments',
    subtitle: 'Product design, wave-based site activation, and change management strategies for 790,000 minutes saved weekly.',
    date: 'JUN 2026',
    readTime: '7 MIN READ',
    excerpt: 'Rolling out the GenAI SOP Assistant across 25 global manufacturing sites required more than technical architecture — it required user-centric design, wave-based activation, and building deep trust with shop-floor operators.',
    keyTakeaways: [
      'Designing intuitive natural-language discovery for operators accustomed to manual document IDs.',
      'Managing wave-based site activations (4–5 sites per wave) with SME champion networks.',
      'Achieving ~79% adoption and 85–90% retention across global manufacturing plants.'
    ],
    content: `
      <p>Manufacturing operators in global pharmaceutical sites handle thousands of Standard Operating Procedures (SOPs), Work Instructions (WIs), and Forms stored across Veeva Vault repositories. Prior to AI intervention, locating the exact active document version took roughly 2 hours per week per operator.</p>

      <h3>Product Decision: Discovery Over Interpretation</h3>
      <p>A core architectural decision when building the <strong>GenAI SOP Assistant</strong> for Client 1 was deciding what the AI should <em>not</em> do. Rather than asking the LLM to summarize complex manufacturing procedures (which risks dangerous interpretation errors), the system was optimized for authoritative discovery: <strong>"Which active document should I look at, and on exactly which page?"</strong></p>

      <h3>Rollout & Change Management Strategy</h3>
      <p>Rolling out an AI product across 25 global sites requires a disciplined wave-activation strategy:</p>
      <ul>
        <li><strong>Six Wave Deployments:</strong> Activating 4–5 sites per wave allowed the product team to gather feedback, monitor usage telemetry, and refine retrieval edge cases.</li>
        <li><strong>Site SME Champions:</strong> Training local super-users created immediate trust and accelerated peer onboarding.</li>
        <li><strong>Admin Insights Dashboard:</strong> Tracking query retention, top search categories, and zero-hit queries ensured continuous system optimization.</li>
      </ul>

      <p>The result: SOP lookup time dropped from 2 hours/week to ~20 minutes/week, saving an estimated <strong>790,000 minutes every week</strong>.</p>
    `
  },
  {
    id: 'po-framework-evals',
    category: 'PRODUCT LEADERSHIP',
    tag: '04 / AI PRODUCT OWNERSHIP',
    title: 'The AI Product Owner’s Guide to LLM Evaluation & Edge Case Management',
    subtitle: 'How product leaders can bridge the gap between engineering benchmarks and real-world business adoption.',
    date: 'MAY 2026',
    readTime: '9 MIN READ',
    excerpt: 'Traditional software metrics like uptime and latency are insufficient for GenAI products. AI Product Owners must master evaluation metrics like Context Precision, Hallucination Rate, and Out-of-Scope Leakage.',
    keyTakeaways: [
      'Translating business requirements into quantitative LLM evaluation test suites.',
      'Collaborating with QA teams to curate golden dataset edge cases.',
      'Balancing model latency vs grounded reasoning cost.'
    ],
    content: `
      <p>As an AI Product Owner, one of the most critical responsibilities is defining what "good" looks like for a non-deterministic product. Traditional PRDs define feature requirements; AI PRDs must define accuracy bounds, retrieval hit rates, and acceptable failure modes.</p>

      <h3>Curating the Golden Test Dataset</h3>
      <p>Before writing code or tuning prompts, product owners must partner with business SMEs to curate a golden test dataset. This dataset should include:</p>
      <ul>
        <li>Standard operational queries with ground-truth source citations.</li>
        <li>Edge cases involving outdated or edited documents.</li>
        <li>Out-of-scope adversarial prompts designed to test system guardrails.</li>
      </ul>

      <h3>Continuous Feedback & Post-Launch Iteration</h3>
      <p>Launching the product is only the first step. Capturing implicit feedback (e.g., user copy events, citation clicks) and explicit feedback (thumbs up/down with rationale) feeds directly back into prompt refinement and vector index tuning.</p>
    `
  }
];

export default function BlogsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const label = document.getElementById('cursorLabel');
    let bindCursorEvents = () => { };

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
          let text = target.dataset.cursor;
          if (!text) {
            if (target.classList.contains('blog-card')) text = 'READ ESSAY';
            else if (target.classList.contains('cways-logo')) text = 'HOME';
            else text = target.textContent?.trim().slice(0, 20) || 'EXPLORE';
          }
          label.textContent = text;
        }
      }

      function onMouseLeave() {
        if (cursor && label) {
          cursor.classList.remove('active');
          label.textContent = '';
        }
      }

      bindCursorEvents = function () {
        document.querySelectorAll('[data-cursor], a, button, .blog-card, .filter-chip').forEach(el => {
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

  const categories = ['ALL', 'RAG & EVALUATION', 'ENTERPRISE GenAI', 'ENTERPRISE SCALE', 'PRODUCT LEADERSHIP'];

  const filteredPosts = selectedCategory === 'ALL'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="blogs-page-wrapper">
      <div className="noise"></div>
      <div className="cursor" id="cursor">
        <span className="cursor-label" id="cursorLabel"></span>
      </div>

      {/* CREATIVE ANIMATED PEN WRITING BACKGROUND (INDEPENDENT OF MOUSE) */}
      <div className="pen-writing-bg" aria-hidden="true">
        <div className="manuscript-lines"></div>
        <svg className="pen-svg-canvas" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef6047" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#111111" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ef6047" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* CONTINUOUS CURSIVE INK STROKE 1 */}
          <path
            className="writing-stroke-path path-1"
            d="M -100 180 Q 200 80, 450 220 T 950 140 T 1550 280 T 2100 160"
            stroke="url(#inkGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* CONTINUOUS CURSIVE INK STROKE 2 */}
          <path
            className="writing-stroke-path path-2"
            d="M -150 480 C 150 380, 350 580, 650 440 C 950 300, 1150 540, 1550 420"
            stroke="url(#inkGradient)"
            strokeWidth="2"
            strokeDasharray="8 8"
            strokeLinecap="round"
            fill="none"
          />

          {/* FLOATING FOUNTAIN PEN NIB DRAWING ALONG THE PATH */}
          <g className="floating-pen-nib">
            <path
              d="M 0 0 L 14 -28 L 22 -20 L 0 0 Z"
              fill="#111111"
              opacity="0.35"
            />
            <circle cx="0" cy="0" r="3" fill="#ef6047" opacity="0.75" />
          </g>
        </svg>
      </div>

      {/* HEADER NAVBAR */}
      <header className="cways-header about-nav">
        <Link href="/" className="cways-logo" data-cursor="PRANESH">pranesh soni</Link>

        <nav className="cways-nav">
          <Link href="/about" data-cursor="ABOUT">About</Link>
          <Link href="/#work" data-cursor="PROJECTS">Projects</Link>
          <Link href="/blogs" className="active" data-cursor="BLOGS">Blogs</Link>
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

      {/* MOBILE MENU DRAWER */}
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
      <main className="blogs-main-content">
        {/* BLOG HERO SECTION */}
        <section className="blogs-hero">
          <div className="blogs-hero-inner">
            <h1 className="cways-section-title">
              PERSPECTIVES.
            </h1>
            <p className="blogs-hero-sub">
              Deep dives on AI product ownership, enterprise RAG evaluation, agentic workflows, and shipping compliant GenAI systems across life sciences &amp; healthcare.
            </p>
          </div>
        </section>

        {/* FEATURED ESSAY BANNER */}
        <section className="featured-blog-section">
          <div className="featured-blog-card" onClick={() => setActivePost(featuredPost)} data-cursor="FEATURED ESSAY">
            <div className="featured-tag-strip">
              <span className="featured-badge">FEATURED ESSAY</span>
              <span className="blog-meta-info">{featuredPost.date} • {featuredPost.readTime}</span>
            </div>
            <h2 className="featured-title">{featuredPost.title}</h2>
            <p className="featured-sub">{featuredPost.subtitle}</p>
            <p className="featured-excerpt">{featuredPost.excerpt}</p>
            <div className="featured-footer">
              <span className="read-btn">READ ESSAY ↗</span>
              <span className="tag-pill">{featuredPost.category}</span>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER CHIPS */}
        <section className="blogs-filter-section">
          <div className="filter-chips-container">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                data-cursor={cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="blogs-grid-section">
          <div className="blogs-grid">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => setActivePost(post)}
                data-cursor="READ ARTICLE"
              >
                <div className="blog-card-top">
                  <span className="blog-tag">{post.tag}</span>
                  <span className="blog-meta-date">{post.date} • {post.readTime}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="read-link">READ FULL ESSAY ↗</span>
                  <span className="category-label">{post.category}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SUBSTACK / NEWSLETTER SECTION */}
        <section className="blogs-newsletter-section">
          <div className="newsletter-box">
            <div className="section-label">SUBSCRIBE / THOUGHT LEADERSHIP</div>
            <h2>STAY UPDATED ON AI PRODUCT ESSAYS.</h2>
            <p>Get long-form insights on enterprise RAG evaluation, prompt engineering, and GenAI product leadership delivered to your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your work email address" className="newsletter-input" />
              <button className="newsletter-btn" data-cursor="SUBSCRIBE" onClick={() => alert("Thank you for subscribing! You will receive the latest AI product essays.")}>
                SUBSCRIBE ↗
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FULL ARTICLE READING MODAL */}
      {activePost && (
        <div className="blog-modal-backdrop active" onClick={() => setActivePost(null)}>
          <div className="blog-modal-content active" onClick={e => e.stopPropagation()}>
            <div className="blog-modal-header">
              <span className="modal-badge">{activePost.tag}</span>
              <button className="modal-close" onClick={() => setActivePost(null)} data-cursor="CLOSE">CLOSE ✕</button>
            </div>
            <div className="blog-modal-body">
              <div className="blog-modal-meta">
                <span>{activePost.date}</span> • <span>{activePost.readTime}</span> • <span className="category-pill">{activePost.category}</span>
              </div>
              <h1 className="blog-modal-title">{activePost.title}</h1>
              <p className="blog-modal-subtitle">{activePost.subtitle}</p>

              <div className="takeaways-card">
                <h4>KEY TAKEAWAYS</h4>
                <ul>
                  {activePost.keyTakeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="blog-article-html" dangerouslySetInnerHTML={{ __html: activePost.content }} />

              <div className="blog-modal-footer">
                <button className="modal-close" onClick={() => setActivePost(null)} data-cursor="CLOSE">
                  CLOSE ESSAY ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
