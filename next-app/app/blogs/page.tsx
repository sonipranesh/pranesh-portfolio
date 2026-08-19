'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  category: string;
  tag: string;
  number: string;
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
    tag: 'SYSTEM ARCHITECTURE',
    number: '01',
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
    tag: 'AGENTIC WORKFLOWS',
    number: '02',
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
    tag: 'LESSONS FROM FIELD',
    number: '03',
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
    tag: 'AI PRODUCT OWNERSHIP',
    number: '04',
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
            if (target.classList.contains('perspective-card')) text = 'READ PERSPECTIVE';
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

      document.querySelectorAll('[data-cursor], a, button, .perspective-card, .editorial-spotlight-card, .perspective-filter-btn').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [selectedCategory, activePost]);

  const categories = ['ALL', 'RAG & EVALUATION', 'ENTERPRISE GenAI', 'ENTERPRISE SCALE', 'PRODUCT LEADERSHIP'];

  const filteredPosts = selectedCategory === 'ALL'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const spotlightPost = BLOG_POSTS[0];

  return (
    <div className="perspective-page-wrapper">
      <div className="noise"></div>
      <div className="cursor" id="cursor">
        <span className="cursor-label" id="cursorLabel"></span>
      </div>

      {/* HEADER NAVBAR */}
      <header className="cways-header about-nav">
        <Link href="/" className="cways-logo" data-cursor="PRANESH">pranesh soni</Link>

        <nav className="cways-nav">
          <Link href="/about" data-cursor="ABOUT">About</Link>
          <Link href="/#work" data-cursor="SERVICES">Services</Link>
          <Link href="/#work" data-cursor="PORTFOLIO">Portfolio</Link>
          <Link href="/blogs" className="active" data-cursor="BLOGS">Blogs</Link>
          <Link href="/#why-me" data-cursor="WHY ME">Why Me</Link>
        </nav>

        <div className="header-actions">
          <button
            className="cways-menu-toggle about-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "CLOSE ✕" : (
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
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="perspective-container">
        {/* HERO SECTION - PERSPECTIVES */}
        <section className="perspective-hero">
          <div className="perspective-hero-badge">04 / ESSAYS &amp; THOUGHT LEADERSHIP</div>
          <h1 className="perspective-title">Perspectives.</h1>
          <p className="perspective-subtitle">
            Long-form essays on enterprise RAG evaluation, agentic workflow design, LLM hallucination suppression, and shipping compliant GenAI products.
          </p>
        </section>

        {/* EDITORIAL SPOTLIGHT FEATURE */}
        <section className="perspective-spotlight-section">
          <div className="editorial-spotlight-card" onClick={() => setActivePost(spotlightPost)} data-cursor="READ FEATURED">
            <div className="spotlight-left">
              <div className="spotlight-meta-bar">
                <span className="spotlight-badge">FEATURED ESSAY</span>
                <span className="spotlight-date">{spotlightPost.date} • {spotlightPost.readTime}</span>
              </div>
              <h2 className="spotlight-title">{spotlightPost.title}</h2>
              <p className="spotlight-excerpt">{spotlightPost.excerpt}</p>
              <div className="spotlight-action">
                <span className="spotlight-read-btn">READ ESSAY <span className="arrow">↗</span></span>
                <span className="spotlight-category-tag">{spotlightPost.category}</span>
              </div>
            </div>
            <div className="spotlight-right">
              <div className="spotlight-preview-box">
                <div className="preview-top-bar">
                  <span className="preview-dot red"></span>
                  <span className="preview-dot yellow"></span>
                  <span className="preview-dot green"></span>
                  <span className="preview-filename">evaluation_framework.py</span>
                </div>
                <div className="preview-content">
                  <div className="code-line"><span className="code-kw">class</span> <span className="code-fn">GroundedEvaluator</span>:</div>
                  <div className="code-line indent">def <span className="code-fn">assess_precision</span>(self, recall_chunks):</div>
                  <div className="code-line indent-2">context_score = verify_retrieval(recall_chunks)</div>
                  <div className="code-line indent-2">citation_valid = check_page_anchors(recall_chunks)</div>
                  <div className="code-line indent-2"><span className="code-kw">return</span> context_score &gt; 0.97 <span className="code-kw">and</span> citation_valid</div>
                </div>
                <div className="preview-stat-card">
                  <div className="stat-num">97.4%</div>
                  <div className="stat-label">Citation Precision Achieved</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER CHIPS NAVIGATION */}
        <section className="perspective-filter-bar">
          <div className="filter-scroll-wrap">
            {categories.map(cat => {
              const count = cat === 'ALL'
                ? BLOG_POSTS.length
                : BLOG_POSTS.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`perspective-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  data-cursor={cat}
                >
                  <span className="filter-name">{cat}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section className="perspective-grid-section">
          <div className="perspective-grid">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="perspective-card"
                onClick={() => setActivePost(post)}
                data-cursor="READ ESSAY"
              >
                <div className="card-header-bar">
                  <span className="card-num">{post.number} / {post.tag}</span>
                  <span className="card-readtime">{post.readTime}</span>
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-footer-bar">
                  <span className="card-read-action">READ ESSAY <span className="arrow">↗</span></span>
                  <span className="card-date-badge">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEWSLETTER SUBSCRIBE */}
        <section className="perspective-newsletter">
          <div className="newsletter-card">
            <div className="newsletter-badge">PERSPECTIVES NEWSLETTER</div>
            <h2>Get long-form AI product essays delivered to your inbox.</h2>
            <p>No spam. Only deep technical analyses on RAG evaluation, agent architectures, and LLM product leadership.</p>
            <div className="newsletter-form-row">
              <input type="email" placeholder="Enter your work email address" className="perspective-email-input" />
              <button
                className="perspective-submit-btn"
                data-cursor="SUBSCRIBE"
                onClick={() => alert("Thank you for subscribing to Perspectives!")}
              >
                SUBSCRIBE ↗
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ARTICLE READER MODAL */}
      {activePost && (
        <div className="perspective-modal-backdrop active" onClick={() => setActivePost(null)}>
          <div className="perspective-modal-drawer active" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-meta">{activePost.number} / {activePost.category} • {activePost.date} • {activePost.readTime}</span>
              <button className="drawer-close-btn" onClick={() => setActivePost(null)} data-cursor="CLOSE">CLOSE ✕</button>
            </div>
            <div className="drawer-body">
              <h1 className="drawer-title">{activePost.title}</h1>
              <p className="drawer-subtitle">{activePost.subtitle}</p>

              <div className="drawer-takeaways-box">
                <div className="takeaways-title">EXECUTIVE SUMMARY &amp; KEY TAKEAWAYS</div>
                <ul>
                  {activePost.keyTakeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="drawer-article-content" dangerouslySetInnerHTML={{ __html: activePost.content }} />

              <div className="drawer-footer">
                <button className="cways-btn-primary" onClick={() => setActivePost(null)} data-cursor="CLOSE">
                  CLOSE ARTICLE ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
