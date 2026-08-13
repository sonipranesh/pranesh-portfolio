import sys

page_content = ''''use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  // Sandbox & Lab states
  const [sandboxInput, setSandboxInput] = useState('');
  const [sandboxOutput, setSandboxOutput] = useState('');
  const [sandboxLoading, setSandboxLoading] = useState(false);

  const [labPrompt, setLabPrompt] = useState('');
  const [labResult, setLabResult] = useState('');
  const [labLoading, setLabLoading] = useState(false);

  const canvasRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  // Projects data
  const projects = [
    {
      id: 'contract-clause-risk-engine',
      num: '01 / RAG & AGENTS',
      title: 'Contract Clause Risk & Terms Engine',
      desc: 'AI-assisted contract review for procurement & legal workflows.',
      tags: ['RETRIEVAL', 'COMPLIANCE', 'LLM RERANK'],
      problem: 'Enterprise legal and procurement teams spend hundreds of hours manually verifying vendor contracts against internal liability guardrails. This tool automatically retrieves relevant clauses, flags risky indemnification language, and generates grounded counter-proposals.',
      features: ['Automated Clause Extraction', 'Semantic Vector Reranking', 'Risk Severity Categorization', 'Grounded Counter-Proposal Generation'],
      architecture: 'Documents are parsed into semantic chunks and stored in a vector index with metadata filtering. Query processing runs dual-stage retrieval: dense vector similarity followed by reranking against internal GxP compliance guidelines.'
    },
    {
      id: 'sop-rag-reranker',
      num: '02 / RETRIEVE',
      title: 'sop.rag — SOP Reranker & Compliance QA',
      desc: 'Retrieval-augmented QA engine grounded strictly in verified standard operating procedures.',
      tags: ['SEMANTIC SEARCH', 'CITATIONS', 'HALLUCINATION-CHECK'],
      problem: 'Life sciences teams face strict audit requirements where LLM answers must be strictly grounded in verified SOP documents with 100% citation accuracy.',
      features: ['Strict Citation Line Mapping', 'Zero-Hallucination Confidence Guardrails', 'Multi-Document Aggregation', 'Audit Log Trail Export'],
      architecture: 'SOP PDFs are chunked into hierarchical sections with document hash signatures. High-precision vector retrieval is filtered through an evidence verifier before returning answers.'
    }
  ];

  // Hero Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(17, 17, 17, 0.4)';
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(17, 17, 17, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse attraction
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          p.x += (mdx / mdist) * 0.5;
          p.y += (mdy / mdist) * 0.5;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Custom Cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const label = cursorLabelRef.current;
    if (!cursor || !label) return;

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      label.style.left = `${e.clientX}px`;
      label.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        cursor.classList.add('active');
        label.classList.add('show');
        label.textContent = target.getAttribute('data-cursor');
      } else {
        cursor.classList.remove('active');
        label.classList.remove('show');
        label.textContent = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Keyboard Shortcuts (Cmd+K, Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setAuthOpen(false);
        setProjectModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lab prototype generator
  const runLabPrototype = () => {
    if (!labPrompt.trim()) return;
    setLabLoading(true);
    setLabResult('');

    setTimeout(() => {
      setLabResult(`⚡ AI PRODUCT SPEC GENERATED FOR: "${labPrompt.toUpperCase()}"

STEP 1: USER WORKFLOW MAPPING
- Identified core user pain points and manual bottleneck triggers.
- Mapped context boundaries and key validation checkpoints.

STEP 2: RAG ARCHITECTURE & DATA RETRIEVAL
- Vector Indexing: Chunk size 512 with overlap 64.
- Dual-stage Dense & Sparse Hybrid Search + Cross-Encoder Reranking.

STEP 3: GUARDRAILS & ACCURACY CONTROL
- Strict citation enforcement with zero-hallucination verification.
- Output validation against regulatory guidelines.

STEP 4: PROTOTYPE API ROUTING
- Endpoint: POST /api/v1/prototype/execute
- Streaming Response: Enabled via Server-Sent Events (SSE).

STEP 5: UAT & ADOPTION METRICS
- Key Metric: 75% reduction in manual review cycle time.
- Feedback Loop: Human-in-the-loop thumbs up/down annotation.`);
      setLabLoading(false);
    }, 900);
  };

  // Sandbox Analyzer Simulator
  const runSandboxAnalysis = () => {
    if (!sandboxInput.trim()) return;
    setSandboxLoading(true);
    setSandboxOutput('');

    setTimeout(() => {
      setSandboxOutput(`🔍 ANALYSIS RESULTS FOR: "${sandboxInput}"

• Risk Score: MEDIUM (0.42 / 1.0)
• Flagged Terms: Uncapped Indemnification & Broad Warranty Disclaimer
• Recommended Counter-Clause: "Limitation of liability capped at 12 months total fees paid under Schedule A."
• Grounding Reference: Enterprise Procurement Guardrails v3.2 (Page 14, Section 8.4)`);
      setSandboxLoading(false);
    }, 800);
  };

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveTab('overview');
    setProjectModalOpen(true);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="noise"></div>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-label" ref={cursorLabelRef}></div>

      {/* FIXED HIGH-CONTRAST NAVBAR */}
      <header>
        <a className="logo" href="#top">
          <img className="logo-avatar-badge" src="/pranesh_avatar.png" alt="Pranesh" />
          <img className="brand-icon" src="/logo.png?v=3" alt="Pranesh Soni" />
        </a>

        <nav>
          <a href="#work" data-cursor="WORK">WORK</a>
          <a href="#lab" data-cursor="PLAY">LAB</a>
          <a href="#about" data-cursor="ME">ME</a>
          <a href="#contact" data-cursor="TALK">TALK</a>
        </nav>

        <div className="header-actions">
          <a href="#contact" className="header-cta" data-cursor="CONTACT">
            LET'S BUILD <span className="arrow">↗</span>
          </a>
        </div>
      </header>

      <main id="top" className="stack-container">
        {/* HERO SECTION */}
        <section className="hero-layer" id="heroLayer">
          <canvas id="heroCanvas" ref={canvasRef}></canvas>

          <h1 className="hero-title" id="heroTitle">
            I BUILD<br />
            <span className="indent"><span className="serif">AI</span> PRODUCTS</span><br />
            <span className="indent">THAT TURN</span><br />
            <span className="indent"><span className="serif">COMPLEXITY</span></span><br />
            INTO POSSIBILITY.
          </h1>

          <div className="orb" id="orb">
            <span className="orb-dot"></span>
          </div>

          <div className="hero-scroll">SCROLL TO UNVEIL THE LAB ↓</div>
          <div className="hero-note">
            <span>01 / THE IDEA</span>
            I'm Pranesh — an AI Product Owner building AI capabilities for life sciences, taking ideas from workflow to working prototype.
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="manifesto stack-card" id="manifesto">
          <div className="section-label">02 / THE POINT OF VIEW</div>
          <h2>
            Technology is interesting.<br />
            <i>What people can do with it</i><br />
            is more interesting.
          </h2>
          <span className="float-word fw1">AI × PRODUCT</span>
          <span className="float-word fw2">BUILD → TEST → LEARN</span>
          <span className="float-word fw3">LESS FRICTION</span>
        </section>

        {/* WORK */}
        <section className="work stack-card" id="work">
          <div className="section-label">03 / SELECTED BUILDS</div>

          <div className="projects">
            {/* PROJECT CARD 01 */}
            <div
              className="project-card"
              onClick={() => openProjectModal(projects[0])}
              data-cursor="EXPLORE BUILD"
            >
              <div className="project-art p1">
                <span className="project-num">01 / RAG & AGENTS</span>
                <div className="contract-box">
                  <div className="clause">
                    SECTION 8.4 — INDEMNIFICATION<br /><br />
                    Vendor shall indemnify, defend, and hold harmless Customer against all claims...
                  </div>
                  <div className="risk">
                    UNFAVOURABLE LIABILITY LANGUAGE<br /><br />
                    AI analysis grounded in source documents. Retrieve evidence → explain risk → regenerate terms.
                  </div>
                </div>
                <div className="project-name">
                  <span>CONTRACT CLAUSE</span>
                  RISK & TERMS ENGINE
                </div>
              </div>

              <div className="project-info">
                <h3>Contract Clause Risk & Terms Engine</h3>
                <p>AI-assisted contract review for procurement & legal workflows.</p>
                <div className="tags">
                  <span className="tag">RETRIEVAL</span>
                  <span className="tag">COMPLIANCE</span>
                  <span className="tag">LLM RERANK</span>
                </div>
              </div>
            </div>

            {/* PROJECT CARD 02 */}
            <div
              className="project-card"
              onClick={() => openProjectModal(projects[1])}
              data-cursor="EXPLORE BUILD"
            >
              <div className="project-art p2">
                <span className="project-num">02 / RETRIEVE</span>
                <div className="graph">
                  <span className="line l1"></span>
                  <span className="line l2"></span>
                  <span className="line l3"></span>
                  <span className="line l4"></span>
                  <div className="node n1">SOP<br />LIBRARY</div>
                  <div className="node n2">QUESTION</div>
                  <div className="node n3">SOURCE</div>
                  <div className="node n4">VERIFIED<br />ANSWER</div>
                </div>
                <div className="project-name">
                  <span>SOP RERANKER</span>
                  & COMPLIANCE QA
                </div>
              </div>

              <div className="project-info">
                <h3>sop.rag — SOP Reranker & Compliance QA</h3>
                <p>Retrieval-augmented QA engine grounded strictly in verified standard operating procedures.</p>
                <div className="tags">
                  <span className="tag">SEMANTIC SEARCH</span>
                  <span className="tag">CITATIONS</span>
                  <span className="tag">HALLUCINATION-CHECK</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW I BUILD */}
        <section className="prototype stack-card" id="about">
          <div className="proto-split">
            <div className="left">
              <div>
                <div className="section-label">04 / HOW I BUILD</div>
                <h2>FROM<br /><i>problem</i><br />TO prototype.</h2>
              </div>
              <p>
                I enjoy understanding the core business problem, shaping the workflow, architecting the RAG pipeline, and building functional AI prototypes.
              </p>
            </div>
            <div className="os">
              <div className="os-step">
                <span className="num">01</span>
                <div>
                  <h4>DISCOVERY & WORKFLOW MAPPING</h4>
                  <p>Map manual pain points, identify high-friction workflows, and define clear AI product criteria.</p>
                </div>
              </div>
              <div className="os-step">
                <span className="num">02</span>
                <div>
                  <h4>RAG ARCHITECTURE & ACCURACY GUARDRAILS</h4>
                  <p>Design retrieval pipelines, metadata schemas, vector indexing, and zero-hallucination evaluation loops.</p>
                </div>
              </div>
              <div className="os-step">
                <span className="num">03</span>
                <div>
                  <h4>PROTOTYPE & VALIDATE</h4>
                  <p>Build working prototypes, test with real users, gather feedback, and iterate rapidly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE LAB */}
        <section className="lab stack-card" id="lab">
          <div className="section-label">05 / THE LAB</div>
          <h2>WHAT IF<br />AI COULD<br /><i>build this?</i></h2>
          <div className="lab-sub">
            Give the lab a product problem. It will turn your prompt into an actionable 5-step AI product flow.
          </div>
          <div className="playground">
            <div className="play-label">PRODUCT PROTOTYPING MACHINE / 001</div>
            <div className="prompt-row">
              <input
                id="prompt"
                className="prompt"
                placeholder="e.g. automate clinical trial protocol review..."
                autoComplete="off"
                value={labPrompt}
                onChange={(e) => setLabPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runLabPrototype()}
              />
              <button
                className="run"
                id="run"
                aria-label="Run Prototype Generator"
                onClick={runLabPrototype}
              >
                {labLoading ? '⚡' : '→'}
              </button>
            </div>
            {labResult && (
              <div className="result" id="result" style={{ display: 'block' }}>
                <pre>{labResult}</pre>
              </div>
            )}
          </div>
        </section>

        {/* BELIEF */}
        <section className="belief stack-card">
          <div>
            <div className="tiny">06 / WHY AI?</div>
            <h2>EVERYONE<br />DESERVES<br />A <i>JARVIS.</i></h2>
            <p>
              AI removes the friction between intent and execution. It makes humans more capable and lets an individual take an idea from workflow to working software.
            </p>
          </div>
          <div className="jarvis">JARVIS // HUMAN CAPABILITY SHOULD EXPAND.</div>
        </section>

        {/* TIMELINE */}
        <section className="timeline stack-card">
          <div className="section-label">07 / THE ROAD</div>
          <div className="t-grid">
            <div className="t-item">
              <div className="t-year">2023</div>
              <h3>IIM JAMMU</h3>
              <p>MBA — Strategy & Analytics. Industry Interaction Cell. Hosted corporate seminars and leadership conclaves.</p>
            </div>
            <div className="t-item">
              <div className="t-year">2023 / EXCHANGE</div>
              <h3>SOLBRIDGE, SOUTH KOREA</h3>
              <p>Selected for Student Exchange Program at SolBridge International School of Business, South Korea.</p>
            </div>
            <div className="t-item">
              <div className="t-year">3+ YEARS</div>
              <h3>LIFE SCIENCES AI</h3>
              <p>Building AI products for life-sciences clients across discovery, solution design, RAG architecture, UAT and adoption.</p>
            </div>
            <div className="t-item">
              <div className="t-year">NOW</div>
              <h3>BUILDING THE FUTURE</h3>
              <p>Designing Next-Gen AI Product Experiences that bridge complex domain knowledge with simple, powerful software.</p>
            </div>
          </div>
        </section>

        {/* CONTACT & FOOTER */}
        <footer className="contact stack-card" id="contact">
          <div>
            <div className="section-label">08 / SAY HELLO</div>
            <h2>LET'S BUILD<br />SOMETHING<br /><i>extraordinary.</i></h2>
          </div>

          <div className="contact-bottom">
            <div className="contact-info">
              <p>
                AI product opportunity, prototype build, life sciences RAG solution, or strategic advisory — let's start a conversation.
              </p>
              <div className="status-pill">
                <span className="status-dot"></span>
                AVAILABLE FOR AI PRODUCT OPPORTUNITIES & PROTOTYPING
              </div>
            </div>

            <div className="links">
              <a href="mailto:pranesh.soni@example.com" data-cursor="SEND EMAIL">EMAIL ME ↗</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN">LINKEDIN ↗</a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" data-cursor="GITHUB">GITHUB ↗</a>
            </div>
          </div>
        </footer>
      </main>

      {/* SEARCH COMMAND PALETTE MODAL */}
      {searchOpen && (
        <div className="search-modal-backdrop active" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-box" id="searchModal" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-header">
              <span>🔍</span>
              <input
                type="text"
                id="searchQuery"
                placeholder="Search AI builds, tools, capabilities..."
                autoComplete="off"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted)' }}>ESC</span>
            </div>
            <div className="search-results-list" id="searchResults">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="search-item"
                  onClick={() => {
                    openProjectModal(p);
                    setSearchOpen(false);
                  }}
                >
                  <div className="search-item-title">{p.title}</div>
                  <div className="search-item-desc">{p.desc}</div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="search-item">
                  <div className="search-item-title">No builds found matching "{searchQuery}"</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AUTH SIGN IN MODAL */}
      {authOpen && (
        <div className="auth-modal-backdrop active" onClick={() => setAuthOpen(false)}>
          <div className="auth-modal-box" id="authModal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-header">
              <h3>SIGN IN TO LAB 👤</h3>
              <button className="auth-close" id="authClose" onClick={() => setAuthOpen(false)}>
                &times;
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.5' }}>
              Access exclusive AI prototype sandboxes, PRD templates, and prototype demos.
            </p>
            <input
              type="email"
              className="auth-input"
              id="authEmail"
              placeholder="Enter your work email (e.g. name@company.com)"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
            />
            <button
              className="auth-submit-btn"
              id="authSubmit"
              onClick={() => {
                alert(`Welcome! Demo access granted for ${authEmail || 'guest user'}.`);
                setAuthOpen(false);
              }}
            >
              CONTINUE WITH DEMO ACCESS ⚡
            </button>
          </div>
        </div>
      )}

      {/* PROJECT DEEP DIVE MODAL */}
      {projectModalOpen && selectedProject && (
        <div className="modal-backdrop active" onClick={() => setProjectModalOpen(false)}>
          <div className="modal-box" id="projectModal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-num">{selectedProject.num}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <button className="modal-close" onClick={() => setProjectModalOpen(false)}>&times;</button>
            </div>

            <div className="modal-tabs">
              <button
                className={`modal-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                OVERVIEW
              </button>
              <button
                className={`modal-tab ${activeTab === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveTab('architecture')}
              >
                SOP RAG ARCHITECTURE
              </button>
              <button
                className={`modal-tab ${activeTab === 'sandbox' ? 'active' : ''}`}
                onClick={() => setActiveTab('sandbox')}
              >
                TRY SANDBOX ⚡
              </button>
            </div>

            <div className="modal-body">
              {activeTab === 'overview' && (
                <div className="tab-pane active">
                  <h3 className="modal-section-title">Problem & Impact</h3>
                  <div className="modal-text">{selectedProject.problem}</div>
                  <h3 className="modal-section-title">Key Capabilities</h3>
                  <div className="modal-text">
                    <ul>
                      {selectedProject.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="tab-pane active">
                  <h3 className="modal-section-title">System Architecture & Knowledge Retrieval</h3>
                  <div className="modal-text">{selectedProject.architecture}</div>
                </div>
              )}

              {activeTab === 'sandbox' && (
                <div className="tab-pane active">
                  <h3 className="modal-section-title">Live Prototype Sandbox</h3>
                  <p className="modal-text">Try out a simulated version of this AI product capability:</p>
                  <div className="demo-sandbox">
                    <textarea
                      id="sandboxInput"
                      className="demo-input"
                      rows={3}
                      placeholder="Enter a contract clause or query..."
                      value={sandboxInput}
                      onChange={(e) => setSandboxInput(e.target.value)}
                    ></textarea>
                    <button className="demo-btn" id="sandboxRun" onClick={runSandboxAnalysis}>
                      {sandboxLoading ? 'ANALYSING...' : 'ANALYSE WITH AI →'}
                    </button>
                    {sandboxOutput && (
                      <div className="demo-output active" id="sandboxOutput" style={{ display: 'block' }}>
                        <pre>{sandboxOutput}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
'''

with open('next-app/app/page.js', 'w', encoding='utf-8') as f:
    f.write(page_content)

print('Successfully wrote next-app/app/page.js!')
