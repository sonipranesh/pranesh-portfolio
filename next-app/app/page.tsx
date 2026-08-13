'use client';

import React, { useEffect } from 'react';

export default function Home(): React.JSX.Element {
    const [welcomeStep, setWelcomeStep] = React.useState<number>(0);

    useEffect(() => {
        // Stage 0: "Hi, I'm" + Avatar + "Pranesh"
        const t1 = setTimeout(() => setWelcomeStep(1), 2600); // 360° spin & switch to "I'm" + Avatar + "an AI Product Manager"
        const t2 = setTimeout(() => setWelcomeStep(2), 5400); // Trigger parallel upward flight motion
        const t3 = setTimeout(() => setWelcomeStep(3), 6800); // Hide overlay after transition finishes

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    const handleSkipWelcome = () => {
        setWelcomeStep(3);
    };

    const renderLetters = (text: string, baseDelay = 0): React.JSX.Element[] => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="char-span"
                style={{
                    ['--delay' as any]: `${baseDelay + index * 0.035}s`,
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                }}
            >
                {char}
            </span>
        ));
    };

    useEffect(() => {
        // 1. PARALLAX HERO SCROLL OBSERVER (DIMS & SCALES HERO AS OVERLAPPING CARDS SLIDE UP)
        const heroLayer = document.getElementById('heroLayer');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (heroLayer) {
                const progress = Math.min(1, scrollY / (window.innerHeight * 0.8));
                heroLayer.style.transform = `scale(${1 - progress * 0.04}) translateY(${progress * 12}px)`;
                heroLayer.style.opacity = `${1 - progress * 0.45}`;
            }
        }, { passive: true });

        // 2. CUSTOM CURSOR
        const cursor = document.getElementById('cursor');
        const label = document.getElementById('cursorLabel');
        let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

        if (matchMedia('(pointer:fine)').matches) {
            addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
            (function tick() {
                cx += (mx - cx) * 0.18;
                cy += (my - cy) * 0.18;
                if (cursor) {
                    cursor.style.left = cx + 'px';
                    cursor.style.top = cy + 'px';
                }
                if (label) {
                    label.style.left = mx + 'px';
                    label.style.top = my + 'px';
                }
                requestAnimationFrame(tick);
            })();

            function bindCursorEvents() {
                document.querySelectorAll('[data-cursor], a, button, .lab-project').forEach(el => {
                    el.removeEventListener('mouseenter', onMouseEnter);
                    el.removeEventListener('mouseleave', onMouseLeave);
                    el.addEventListener('mouseenter', onMouseEnter);
                    el.addEventListener('mouseleave', onMouseLeave);
                });
            }

            function onMouseEnter(e) {
                cursor.classList.add('active');
                label.classList.add('show');
                label.textContent = e.currentTarget.dataset.cursor || 'EXPLORE';
            }

            function onMouseLeave() {
                cursor.classList.remove('active');
                label.classList.remove('show');
            }

            bindCursorEvents();
        }

        // 4. PARALLAX HERO ORB
        const orb = document.getElementById('orb');
        const hero = document.getElementById('heroLayer');
        if (hero && orb) {
            hero.addEventListener('mousemove', e => {
                const x = (e.clientX / innerWidth - 0.5);
                const y = (e.clientY / innerHeight - 0.5);
                orb.style.transform = `translate(${x * 45}px, ${y * 35}px) rotate(${x * 8}deg)`;
                document.getElementById('heroTitle').style.transform = `translate(${x * -9}px, ${y * -6}px)`;
            });
            hero.addEventListener('mouseleave', () => {
                orb.style.transform = '';
                document.getElementById('heroTitle').style.transform = '';
            });
        }

        // 5. PROJECT STRIP CAROUSEL NAVIGATION
        const stripWrap = document.getElementById('projectStripWrap');
        const stripPrev = document.getElementById('stripPrev');
        const stripNext = document.getElementById('stripNext');
        const dots = document.querySelectorAll('.indicator-dot');
        const projects = document.querySelectorAll('.lab-project');

        function updateStripScroll(index: number) {
            if (!projects[index] || !stripWrap) return;
            const projEl = projects[index] as HTMLElement;
            const targetLeft = projEl.offsetLeft - stripWrap.offsetLeft;
            stripWrap.scrollTo({ left: targetLeft, behavior: 'smooth' });

            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }

        let currentIndex = 0;

        if (stripNext) {
            stripNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % projects.length;
                updateStripScroll(currentIndex);
            });
        }

        if (stripPrev) {
            stripPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + projects.length) % projects.length;
                updateStripScroll(currentIndex);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const dotEl = dot as HTMLElement;
                const idx = parseInt(dotEl.dataset.index || '0', 10);
                currentIndex = idx;
                updateStripScroll(currentIndex);
            });
        });

        if (stripWrap) {
            stripWrap.addEventListener('scroll', () => {
                const scrollPos = stripWrap.scrollLeft;
                projects.forEach((proj, i) => {
                    const projEl = proj as HTMLElement;
                    if (Math.abs(projEl.offsetLeft - stripWrap.offsetLeft - scrollPos) < projEl.offsetWidth / 2) {
                        currentIndex = i;
                        dots.forEach(d => d.classList.remove('active'));
                        if (dots[i]) dots[i].classList.add('active');
                    }
                });
            }, { passive: true });
        }

        // 6. SEARCH COMMAND PALETTE MODAL
        const headerSearchTrigger = document.getElementById('headerSearchTrigger');
        const searchModalBackdrop = document.getElementById('searchModalBackdrop');
        const searchModal = document.getElementById('searchModal');
        const searchQuery = document.getElementById('searchQuery') as HTMLInputElement | null;
        const searchResults = document.getElementById('searchResults');

        function openSearchModal() {
            if (searchModalBackdrop) searchModalBackdrop.classList.add('active');
            if (searchModal) searchModal.classList.add('active');
            if (searchQuery) {
                searchQuery.value = '';
                searchQuery.focus();
            }
        }

        function closeSearchModal() {
            if (searchModalBackdrop) searchModalBackdrop.classList.remove('active');
            if (searchModal) searchModal.classList.remove('active');
        }

        if (headerSearchTrigger) headerSearchTrigger.addEventListener('click', openSearchModal);
        if (searchModalBackdrop) searchModalBackdrop.addEventListener('click', closeSearchModal);

        window.addEventListener('keydown', e => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openSearchModal();
            }
            if (e.key === 'Escape') {
                closeSearchModal();
                closeAuthModal();
                closeProjectModal();
            }
        });

        // Search Filter
        if (searchQuery && searchResults) {
            searchQuery.addEventListener('input', () => {
                const val = searchQuery.value.toLowerCase().trim();
                const items = searchResults.querySelectorAll('.search-item');
                items.forEach(item => {
                    const itemEl = item as HTMLElement;
                    const text = itemEl.textContent?.toLowerCase() || '';
                    itemEl.style.display = text.includes(val) ? 'flex' : 'none';
                });
            });
        }

        if (searchResults) {
            searchResults.querySelectorAll('.search-item').forEach(item => {
                item.addEventListener('click', () => {
                    closeSearchModal();
                    const itemEl = item as HTMLElement;
                    const action = itemEl.dataset.action;
                    const target = itemEl.dataset.target;
                    if (action === 'project' && target) {
                        openProjectModal(target);
                    } else if (action === 'scroll' && target) {
                        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }

        // 7. SIGN IN AUTH MODAL
        const signInBtn = document.getElementById('signInBtn');
        const authModalBackdrop = document.getElementById('authModalBackdrop');
        const authModal = document.getElementById('authModal');
        const authClose = document.getElementById('authClose');
        const authSubmit = document.getElementById('authSubmit');

        function openAuthModal() {
            if (authModalBackdrop) authModalBackdrop.classList.add('active');
            if (authModal) authModal.classList.add('active');
        }

        function closeAuthModal() {
            if (authModalBackdrop) authModalBackdrop.classList.remove('active');
            if (authModal) authModal.classList.remove('active');
        }

        if (signInBtn) signInBtn.addEventListener('click', openAuthModal);
        if (authClose) authClose.addEventListener('click', closeAuthModal);
        if (authModalBackdrop) authModalBackdrop.addEventListener('click', closeAuthModal);

        if (authSubmit) {
            authSubmit.addEventListener('click', () => {
                const emailInput = document.getElementById('authEmail') as HTMLInputElement | null;
                const email = emailInput ? emailInput.value.trim() : '';
                alert(email ? `Welcome, ${email}! Demo access granted.` : "Welcome! Demo guest access granted.");
                closeAuthModal();
            });
        }

        // 8. PROJECT DETAIL MODALS
        interface ModalInfo {
            badge: string;
            category: string;
            title: string;
            problem: string;
            features: string;
            arch: string;
            role: string;
            domain: string;
            tech: string;
            outcome: string;
            demoSample: string;
        }

        const modalData: Record<string, ModalInfo> = {
            contract: {
                badge: "01 / REASON",
                category: "GENAI CONTRACTING ASSISTANT / CLAUSE ANALYSER",
                title: "Contract Liability & Clause Analyser",
                problem: "Enterprise legal and procurement teams spend hundreds of hours verifying complex supplier agreements against strict liability caps and risk guardrails.",
                features: "• Grounded RAG clause retrieval & citation mapping<br>• Automated Risk Score Engine (High / Medium / Low)<br>• Counter-proposal clause generator tuned to corporate policy<br>• Audit trail export for legal review",
                arch: "Built on a hybrid RAG pipeline using dense embeddings and semantic reranking. Prompts enforce strict grounding to prevent hallucinations when evaluating indemnification terms.",
                role: "AI Product Owner & Prototyper",
                domain: "Enterprise Contracting / Life Sciences",
                tech: "Python, Vector Database, RAG Pipeline, Claude/GPT-4, React",
                outcome: "Cut initial contract clause risk review from 4 hours to 15 minutes.",
                demoSample: "Clause 7.2 Liability Cap: Contractor liability shall be uncapped for indirect and consequential damages."
            },
            sop: {
                badge: "02 / RETRIEVE",
                category: "GENAI SOP ASSISTANT / GRAPH RAG",
                title: "Standard Operating Procedure (SOP) Knowledge Engine",
                problem: "Laboratory technicians and quality engineers in life sciences waste valuable time searching across thousands of multi-page SOP PDFs during audits and daily operations.",
                features: "• Semantic Search & Graph RAG topology mapping<br>• Step-by-step procedure extraction with exact section citations<br>• Discrepancy detector across overlapping SOP documents<br>• Multi-modal diagram and table understanding",
                arch: "Constructs a Graph RAG network linking SOP nodes (SOP Library → Query → Context → Verifiable Answer). Queries retrieve both hierarchical document parents and text chunks.",
                role: "AI Product Lead & Solution Architect",
                domain: "Life Sciences Quality & GxP Compliance",
                tech: "Graph RAG, Vector Search, LlamaIndex, Python, Fast-API",
                outcome: "Achieved 94% accuracy on multi-step procedural queries.",
                demoSample: "How do I perform equipment calibration for Bioreactor Unit B3 according to SOP 402?"
            },
            doc: {
                badge: "03 / CREATE",
                category: "AI DOC AUTHOR / REGULATORY DRAFT MODE",
                title: "AI Regulatory & Clinical Document Author",
                problem: "Drafting GxP regulatory submissions and clinical study reports requires synthesising research data, lab findings, and rigid compliance templates.",
                features: "• Conversational outline synthesis & section drafting<br>• Context memory from previous protocol runs<br>• Compliance tone & formatting checker<br>• Real-time human-in-the-loop editing mode",
                arch: "Employs hierarchical agentic orchestration where a Supervising Agent plans document sections and specialized Writer Agents draft content against domain schemas.",
                role: "AI Product Owner",
                domain: "Regulatory Affairs & Clinical Operations",
                tech: "Multi-Agent Framework, Python, LangChain, Next.js",
                outcome: "Accelerated first-draft generation timeline by 70%.",
                demoSample: "Draft Section 3.1 Study Objectives for Clinical Protocol Phase IIa."
            }
        };

        const modalBackdrop = document.getElementById('modalBackdrop');
        const projectModal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');

        function openProjectModal(key: string) {
            const data = modalData[key];
            if (!data) return;

            const badgeEl = document.getElementById('modalBadge');
            const catEl = document.getElementById('modalCategory');
            const titleEl = document.getElementById('modalTitle');
            const probEl = document.getElementById('modalProblemText');
            const featEl = document.getElementById('modalFeaturesText');
            const archEl = document.getElementById('modalArchText');
            const roleEl = document.getElementById('modalRole');
            const domEl = document.getElementById('modalDomain');
            const techEl = document.getElementById('modalTech');
            const outEl = document.getElementById('modalOutcome');

            if (badgeEl) badgeEl.textContent = data.badge;
            if (catEl) catEl.textContent = data.category;
            if (titleEl) titleEl.textContent = data.title;
            if (probEl) probEl.innerHTML = data.problem;
            if (featEl) featEl.innerHTML = data.features;
            if (archEl) archEl.innerHTML = data.arch;
            if (roleEl) roleEl.textContent = data.role;
            if (domEl) domEl.textContent = data.domain;
            if (techEl) techEl.textContent = data.tech;
            if (outEl) outEl.textContent = data.outcome;

            const sandboxInput = document.getElementById('sandboxInput') as HTMLInputElement | null;
            const sandboxOutput = document.getElementById('sandboxOutput');
            if (sandboxInput) sandboxInput.value = data.demoSample || '';
            if (sandboxOutput) { sandboxOutput.classList.remove('active'); sandboxOutput.innerHTML = ''; }

            if (modalBackdrop) modalBackdrop.classList.add('active');
            if (projectModal) projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            if (modalBackdrop) modalBackdrop.classList.remove('active');
            if (projectModal) projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        projects.forEach(p => {
            p.addEventListener('click', () => {
                const pEl = p as HTMLElement;
                const key = pEl.dataset.project;
                if (key) openProjectModal(key);
            });
        });

        if (modalClose) modalClose.addEventListener('click', closeProjectModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

        // MODAL TABS SWITCHING
        const modalTabs = document.querySelectorAll('.modal-tab');
        modalTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                modalTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const tabEl = tab as HTMLElement;
                const target = tabEl.dataset.tab;
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === `tab-${target}`) pane.classList.add('active');
                });
            });
        });

        // SANDBOX DEMO RUNNER
        const sandboxRun = document.getElementById('sandboxRun');
        const sandboxInput = document.getElementById('sandboxInput') as HTMLInputElement | null;
        const sandboxOutput = document.getElementById('sandboxOutput');

        if (sandboxRun && sandboxInput && sandboxOutput) {
            sandboxRun.addEventListener('click', () => {
                const text = sandboxInput.value.trim();
                if (!text) return;

                sandboxOutput.classList.add('active');
                sandboxOutput.innerHTML = `<span style="color:var(--muted)">Synthesising AI Analysis...</span>`;

                setTimeout(() => {
                    sandboxOutput.innerHTML = `
        <strong>AI ASSESSMENT COMPLETE:</strong><br>
        • Status: Verified grounded response.<br>
        • Actionable Output: Generated 3 structured insights and compliance check.<br>
        • Confidence: 96% based on input vector similarity.
      `;
                }, 500);
            });
        }

        // 9. LAB PROTOTYPING MACHINE
        const prompt = document.getElementById('prompt') as HTMLInputElement | null;
        const run = document.getElementById('run');
        const result = document.getElementById('result');
        const grid = document.getElementById('resultGrid');

        function generatePrototypeFlow() {
            if (!prompt || !grid || !result) return;
            const q = (prompt.value || 'AI product problem').trim();
            const base = q.length > 2 ? q : 'AI product problem';
            const words = base.replace(/[^\w\s-]/g, '').split(/\s+/).filter(Boolean).slice(0, 4);

            const steps = [
                'INPUT / ' + words.join(' ').toUpperCase(),
                'UNDERSTAND / MAP WORKFLOW',
                'AI / FIND LEVERAGE',
                'PROTOTYPE / TEST',
                'USER / LEARN'
            ];

            grid.innerHTML = steps.map(s => `<span>${s}</span>`).join('');
            result.classList.add('show');
        }

        if (run) run.addEventListener('click', generatePrototypeFlow);
        if (prompt) {
            prompt.addEventListener('keydown', e => {
                if (e.key === 'Enter') generatePrototypeFlow();
            });
        }

        // Scroll handler for compact glass header state
        const handleHeaderScroll = () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 20) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };
        window.addEventListener('scroll', handleHeaderScroll);
        return () => window.removeEventListener('scroll', handleHeaderScroll);
    }, []);

    return (
        <>

            {/* WELCOME LOADER OVERLAY (MANON JOUET STYLE WITH PAPER BACKGROUND & FLOWING UP TRANSITION) */}
            {welcomeStep < 3 && (
                <div className={`welcome-overlay ${welcomeStep === 2 ? 'flowing-up' : ''}`}>
                    <div className="welcome-row">
                        <span className="welcome-prefix">
                            {welcomeStep === 0 ? "Hi, I'm" : "I'm"}
                        </span>

                        <img
                            src="/pranesh_avatar.png"
                            alt="Pranesh Soni"
                            className={`welcome-avatar-badge ${welcomeStep >= 1 ? 'rotate-360' : ''}`}
                        />

                        <div className="text-switcher-wrap">
                            <div className={`switcher-line ${welcomeStep === 0 ? 'active' : 'exit'}`}>
                                <span className="red-highlight">{renderLetters('Pranesh', 0.1)}</span>
                            </div>
                            <div className={`switcher-line ${welcomeStep === 1 ? 'active' : ''}`}>
                                <span className="red-highlight">{renderLetters('an AI Product Manager', 0.1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="noise"></div>
            <div className="cursor" id="cursor"></div>
            <div className="cursor-label" id="cursorLabel"></div>

            <main id="top" className={`stack-container ${welcomeStep < 2 ? 'intro-active' : 'intro-flowing'}`}>

                {/* HERO SECTION (PINNED STICKY LAYER 1 WITH NAVBAR AT TOP) */}
                <section className="hero-layer" id="heroLayer">
                    {/* NAVBAR AT THE TOP OF HERO SECTION */}
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
                    <canvas id="heroCanvas"></canvas>
                    {/* HERO TITLE & INTERACTIVE ELEMENTS */}

                    <h1 className="hero-title" id="heroTitle">
                        I BUILD<br />
                        <span className="indent"><span className="serif">AI</span> PRODUCTS</span><br />
                        <span className="indent">THAT TURN</span><br />
                        <span className="indent"><span className="serif">COMPLEXITY</span></span><br />
                        INTO POSSIBILITY.
                    </h1>

                    <div className="orb" id="orb"><span className="orb-dot"></span></div>

                    <div className="hero-scroll">SCROLL TO UNVEIL THE LAB ↓</div>
                    <div className="hero-note">
                        <span>01 / THE IDEA</span>
                        I'm Pranesh — an AI Product Owner building AI capabilities for life sciences, taking ideas from workflow
                        to working prototype.
                    </div>
                </section>

                {/* MANIFESTO (OVERLAPPING STACK CARD 1) */}
                <section className="manifesto stack-card" id="manifesto">
                    <div className="section-label">02 / THE POINT OF VIEW</div>
                    <h2>Technology is interesting.<br /><i>What people can do with it</i><br />is more interesting.</h2>
                    <span className="float-word fw1">AI × PRODUCT</span>
                    <span className="float-word fw2">BUILD → TEST → LEARN</span>
                    <span className="float-word fw3">LESS FRICTION</span>
                </section>

                {/* WORK SECTION & CAROUSEL (OVERLAPPING STACK CARD 2) */}
                <section className="work stack-card" id="work">
                    <div className="work-head">
                        <div>
                            <div className="section-label">03 / SELECTED BUILDS</div>
                            <h2>THREE<br /><i>things</i><br />I built.</h2>
                        </div>
                        <div className="work-head-right">
                            <p>Interactive AI product prototypes exploring reasoning, retrieval, and document creation.</p>
                            <div className="strip-controls">
                                <button className="strip-btn" id="stripPrev" aria-label="Previous Project">←</button>
                                <div className="strip-indicators">
                                    <span className="indicator-dot active" data-index="0">01 / REASON</span>
                                    <span className="indicator-dot" data-index="1">02 / RETRIEVE</span>
                                    <span className="indicator-dot" data-index="2">03 / CREATE</span>
                                </div>
                                <button className="strip-btn" id="stripNext" aria-label="Next Project">→</button>
                            </div>
                        </div>
                    </div>

                    <div className="project-strip-wrap" id="projectStripWrap">
                        <div className="project-strip" id="projectStrip">

                            {/* PROJECT 1 */}
                            <article className="lab-project" data-cursor="OPEN PROJECT" data-project="contract">
                                <div className="project-art p1">
                                    <span className="project-num">01 / REASON</span>
                                    <div className="mock contract-ui">
                                        <div className="mini-mono">GENAI CONTRACTING ASSISTANT / CLAUSE ANALYSER</div>
                                        <div className="mini-title">Risk<br />detected.</div>
                                        <div className="chips">
                                            <span className="chip hot">HIGH RISK</span>
                                            <span className="chip">CLAUSE 7.2</span>
                                            <span className="chip">SOURCE VERIFIED</span>
                                        </div>
                                        <div className="risk">
                                            UNFAVOURABLE LIABILITY LANGUAGE<br /><br />
                                            AI analysis grounded in source documents. Retrieve evidence → explain risk →
                                            regenerate terms.
                                        </div>
                                    </div>
                                    <div className="project-name">
                                        <small>RISK / NEGOTIATE / ANALYSE</small>
                                        GenAI Contracting Assistant
                                    </div>
                                    <div className="project-open-badge">EXPLORE PROJECT ↗</div>
                                </div>
                            </article>

                            {/* PROJECT 2 */}
                            <article className="lab-project" data-cursor="OPEN PROJECT" data-project="sop">
                                <div className="project-art p2">
                                    <span className="project-num">02 / RETRIEVE</span>
                                    <div className="graph">
                                        <span className="line l1"></span><span className="line l2"></span><span
                                            className="line l3"></span><span className="line l4"></span>
                                        <div className="node n1">SOP<br />LIBRARY</div>
                                        <div className="node n2">QUESTION</div>
                                        <div className="node n3">SOURCE</div>
                                        <div className="node n4">CONTEXT</div>
                                        <div className="node n5">ANSWER</div>
                                    </div>
                                    <div className="project-name">
                                        <small>KNOWLEDGE / SEARCH / RAG</small>
                                        GenAI SOP Assistant
                                    </div>
                                    <div className="project-open-badge">EXPLORE PROJECT ↗</div>
                                </div>
                            </article>

                            {/* PROJECT 3 */}
                            <article className="lab-project" data-cursor="OPEN PROJECT" data-project="doc">
                                <div className="project-art p3">
                                    <span className="project-num">03 / CREATE</span>
                                    <div className="mock doc-ui">
                                        <div className="mini-mono">AI DOC AUTHOR / DRAFT MODE</div>
                                        <h3>Write the<br />first draft<span className="cursor-block"></span></h3>
                                        <div className="doc-line"></div>
                                        <div className="doc-line"></div>
                                        <div className="doc-line short"></div>
                                        <div className="doc-box">
                                            GENERATE STRUCTURE<br /><br />
                                            USE CONTEXT<br /><br />
                                            REFINE WITH AI
                                        </div>
                                    </div>
                                    <div className="project-name">
                                        <small>AUTHOR / STRUCTURE / REFINE</small>
                                        AI Doc Author
                                    </div>
                                    <div className="project-open-badge">EXPLORE PROJECT ↗</div>
                                </div>
                            </article>

                        </div>
                    </div>
                </section>

                {/* HOW I BUILD (OVERLAPPING STACK CARD 3) */}
                <section className="prototype stack-card" id="about">
                    <div className="proto-top">
                        <div>
                            <div className="section-label">04 / HOW I BUILD</div>
                            <h2>FROM<br /><i>problem</i><br />TO prototype.</h2>
                        </div>
                        <p>I enjoy understanding the core business problem, shaping the workflow, architecting the RAG pipeline,
                            and building functional AI prototypes.</p>
                    </div>
                    <div className="os">
                        <div className="os-step">
                            <span className="os-num">01</span>
                            <h3>DISCOVER</h3>
                            <p>Client pain points<br />Business workflow<br />Gaps & opportunities</p>
                        </div>
                        <div className="os-step">
                            <span className="os-num">02</span>
                            <h3>FRAME</h3>
                            <p>Product thinking<br />AI feasibility<br />Workflow design</p>
                        </div>
                        <div className="os-step">
                            <span className="os-num">03</span>
                            <h3>PROTOTYPE</h3>
                            <p>UI / UX<br />AI interactions<br />Working concepts</p>
                        </div>
                        <div className="os-step">
                            <span className="os-num">04</span>
                            <h3>SHIP</h3>
                            <p>PRD → Jira<br />Agile delivery<br />Testing / UAT</p>
                        </div>
                        <div className="os-step">
                            <span className="os-num">05</span>
                            <h3>LEARN</h3>
                            <p>Adoption<br />Change management<br />What's next?</p>
                        </div>
                    </div>
                </section>

                {/* THE LAB (OVERLAPPING STACK CARD 4) */}
                <section className="lab stack-card" id="lab">
                    <div className="section-label">05 / THE LAB</div>
                    <h2>WHAT IF<br />AI COULD<br /><i>build this?</i></h2>
                    <div className="lab-sub">Give the lab a product problem. It will turn your prompt into an actionable 5-step AI
                        product flow.</div>
                    <div className="playground">
                        <div className="play-label">PRODUCT PROTOTYPING MACHINE / 001</div>
                        <div className="prompt-row">
                            <input id="prompt" className="prompt" placeholder="e.g. automate clinical trial protocol review..."
                                autoComplete="off" />
                            <button className="run" id="run" aria-label="Run Prototype Generator">→</button>
                        </div>
                        <div className="result" id="result">
                            <b>GENAI PRODUCT FLOW GENERATED</b>
                            <div className="result-grid" id="resultGrid"></div>
                        </div>
                    </div>
                </section>

                {/* BELIEF (OVERLAPPING STACK CARD 5) */}
                <section className="belief stack-card">
                    <div>
                        <div className="tiny">06 / WHY AI?</div>
                        <h2>EVERYONE<br />DESERVES<br />A <i>JARVIS.</i></h2>
                        <p>AI removes the friction between intent and execution. It makes humans more capable and lets an
                            individual take an idea from workflow to working software.</p>
                    </div>
                    <div className="jarvis">JARVIS // HUMAN CAPABILITY SHOULD EXPAND.</div>
                </section>

                {/* TIMELINE (OVERLAPPING STACK CARD 6) */}
                <section className="timeline stack-card">
                    <div className="timeline-head">
                        <div className="section-label">07 / THE PERSON</div>
                        <h2>HOW I GOT<br /><i>here.</i></h2>
                    </div>
                    <div className="timeline-track-wrap">
                        <div className="timeline-track">
                            <div className="t-item">
                                <div className="t-year">2023</div>
                                <h3>IIM JAMMU</h3>
                                <p>MBA — Strategy & Analytics. Industry Interaction Cell. Hosted corporate seminars and
                                    leadership conclaves.</p>
                            </div>
                            <div className="t-item">
                                <div className="t-year">2023 / EXCHANGE</div>
                                <h3>SOLBRIDGE</h3>
                                <p>Selected for Student Exchange Program at SolBridge International School of Business, South
                                    Korea.</p>
                            </div>
                            <div className="t-item">
                                <div className="t-year">3+ YEARS</div>
                                <h3>AI PRODUCT</h3>
                                <p>Building AI products for life-sciences clients across discovery, solution design, RAG
                                    architecture, UAT and adoption.</p>
                            </div>
                            <div className="t-item">
                                <div className="t-year">NOW</div>
                                <h3>BUILDING</h3>
                                <p>Prototyping, experimenting, and bringing AI products from vision to working code.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT & FOOTER (OVERLAPPING STACK CARD 7) */}
                <section className="contact stack-card" id="contact">
                    <div>
                        <div className="section-label">08 / LET'S BUILD</div>
                        <h2>GOT A<br />GOOD<br /><i>problem?</i></h2>
                    </div>

                    <div className="contact-bottom">
                        <div className="contact-info">
                            <p>AI product opportunity, prototype build, life sciences RAG solution, or strategic advisory —
                                let's start a conversation.</p>
                            <div className="status-pill">
                                <span className="status-dot"></span>
                                AVAILABLE FOR AI PRODUCT OPPORTUNITIES & PROTOTYPING
                            </div>
                        </div>

                        <div className="links">
                            <a href="mailto:pranesh.soni@example.com" data-cursor="SEND EMAIL">EMAIL ME ↗</a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener" data-cursor="LINKEDIN">LINKEDIN
                                ↗</a>
                            <a href="https://github.com/" target="_blank" rel="noopener" data-cursor="GITHUB">GITHUB ↗</a>
                        </div>
                    </div>

                    <footer>
                        <div>PRANESH SONI / AI PRODUCT OWNER & BUILDER</div>
                        <div>AI · PRODUCT MANAGEMENT · LIFE SCIENCES</div>
                        <div>© 2026 PRANESH SONI</div>
                    </footer>
                </section>

            </main>

            {/* SEARCH COMMAND PALETTE MODAL */}
            <div className="search-modal-backdrop" id="searchModalBackdrop"></div>
            <div className="search-modal-box" id="searchModal">
                <div className="search-input-header">
                    <span>🔍</span>
                    <input type="text" id="searchQuery" placeholder="Search AI builds, tools, capabilities..."
                        autoComplete="off" />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--muted)" }}>ESC</span>
                </div>
                <div className="search-results-list" id="searchResults">
                    <div className="search-item" data-action="project" data-target="contract">
                        <div>
                            <div className="search-item-title">GenAI Contracting Assistant</div>
                            <div className="search-item-sub">Clause risk scoring & RAG clause retrieval</div>
                        </div>
                        <span className="search-item-tag">01 / REASON</span>
                    </div>
                    <div className="search-item" data-action="project" data-target="sop">
                        <div>
                            <div className="search-item-title">GenAI SOP Assistant</div>
                            <div className="search-item-sub">Graph RAG knowledge engine & SOP search</div>
                        </div>
                        <span className="search-item-tag">02 / RETRIEVE</span>
                    </div>
                    <div className="search-item" data-action="project" data-target="doc">
                        <div>
                            <div className="search-item-title">AI Doc Author</div>
                            <div className="search-item-sub">Multi-agent regulatory & clinical document drafter</div>
                        </div>
                        <span className="search-item-tag">03 / CREATE</span>
                    </div>
                    <div className="search-item" data-action="scroll" data-target="#lab">
                        <div>
                            <div className="search-item-title">Product Prototyping Machine</div>
                            <div className="search-item-sub">Interactive 5-step AI product flow generator</div>
                        </div>
                        <span className="search-item-tag">PLAYGROUND</span>
                    </div>
                </div>
            </div>

            {/* SIGN IN AUTH MODAL */}
            <div className="auth-modal-backdrop" id="authModalBackdrop"></div>
            <div className="auth-modal-box" id="authModal">
                <div className="auth-header">
                    <h3>SIGN IN TO LAB 👤</h3>
                    <button className="auth-close" id="authClose">&times;</button>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "20px", lineHeight: "1.5" }}>Access exclusive AI prototype
                    sandboxes, PRD templates, and prototype demos.</p>
                <input type="email" className="auth-input" id="authEmail"
                    placeholder="Enter your work email (e.g. name@company.com)" />
                <button className="auth-submit-btn" id="authSubmit">CONTINUE WITH DEMO ACCESS ⚡</button>
            </div>

            {/* PROJECT DETAIL MODAL */}
            <div className="modal-backdrop" id="modalBackdrop"></div>
            <div className="modal-content" id="projectModal">
                <div className="modal-header">
                    <span className="modal-badge" id="modalBadge">01 / REASON</span>
                    <button className="modal-close" id="modalClose" aria-label="Close modal">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="modal-title-area">
                        <div className="modal-sub" id="modalCategory">GENAI CONTRACTING ASSISTANT</div>
                        <h2 id="modalTitle">Contract Liability & Clause Analyser</h2>
                    </div>

                    <div className="modal-tabs">
                        <button className="modal-tab active" data-tab="overview">OVERVIEW</button>
                        <button className="modal-tab" data-tab="architecture">ARCHITECTURE & RAG</button>
                        <button className="modal-tab" data-tab="demo">INTERACTIVE DEMO</button>
                    </div>

                    <div className="tab-pane active" id="tab-overview">
                        <div className="modal-grid">
                            <div>
                                <h3 className="modal-section-title">Problem & Impact</h3>
                                <div className="modal-text" id="modalProblemText">
                                    Enterprise legal teams spend hundreds of hours manually verifying vendor contracts against
                                    internal liability guardrails. This tool automatically retrieves relevant clauses, flags
                                    risky indemnification language, and generates grounded counter-proposals.
                                </div>
                                <h3 className="modal-section-title">Key Capabilities</h3>
                                <div className="modal-text" id="modalFeaturesText">
                                    • Automated Clause Risk Scoring (High/Medium/Low)<br />
                                    • Citation-backed source document retrieval<br />
                                    • Guardrail-aligned contract term re-generation<br />
                                    • Audit trail logging for compliance review
                                </div>
                            </div>
                            <div>
                                <div className="modal-spec-card">
                                    <div className="spec-item">
                                        <label>Role</label>
                                        <span id="modalRole">AI Product Owner & Prototyper</span>
                                    </div>
                                    <div className="spec-item">
                                        <label>Domain</label>
                                        <span id="modalDomain">Enterprise Contracting / Life Sciences</span>
                                    </div>
                                    <div className="spec-item">
                                        <label>Tech Stack</label>
                                        <span id="modalTech">Python, RAG, Vector Search, LLM Agents, React</span>
                                    </div>
                                    <div className="spec-item">
                                        <label>Outcome</label>
                                        <span id="modalOutcome">Reduced initial clause review time by 68%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane" id="tab-architecture">
                        <h3 className="modal-section-title">System Architecture & Knowledge Retrieval</h3>
                        <div className="modal-text" id="modalArchText">
                            Documents are parsed into semantic chunks and stored in a vector index with metadata filtering.
                            Query processing runs dual-stage retrieval: dense vector similarity followed by reranking against
                            internal GxP compliance guidelines.
                        </div>
                    </div>

                    <div className="tab-pane" id="tab-demo">
                        <h3 className="modal-section-title">Live Prototype Sandbox</h3>
                        <p className="modal-text">Try out a simulated version of this AI product capability:</p>
                        <div className="demo-sandbox">
                            <textarea id="sandboxInput" className="demo-input" rows={3}
                                placeholder="Enter a contract clause or query..."></textarea>
                            <button className="demo-btn" id="sandboxRun">ANALYSE WITH AI →</button>
                            <div className="demo-output" id="sandboxOutput"></div>
                        </div>
                    </div>

                </div>
            </div>


        </>
    );
}
