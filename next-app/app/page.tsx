'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Home(): React.JSX.Element {
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
            kpisHtml?: string;
        }

        const modalData: Record<string, ModalInfo> = {
            contract: {
                badge: "01 / REASON",
                category: "GENAI CONTRACTING ASSISTANT / CLAUSE ANALYSER",
                title: "GenAI Contracting Assistant",
                problem: `<p>Legal and procurement teams at AstraZeneca were spending significant time manually reviewing third-party contracts—interpreting clauses, comparing proposed language against internal contracting guidance such as the CAN Handbook, identifying potential risks, negotiating alternative language, and extracting key information from lengthy agreements.</p><p>The process was <strong>manual, time-intensive, and susceptible to comparison errors</strong>, particularly when reviewers had to cross-reference contracts against multiple enterprise reference documents.</p><p>We built the <strong>GenAI Contracting Assistant</strong> to transform this workflow into an AI-assisted review and negotiation experience—enabling users to query enterprise knowledge, trace answers back to source citations, compare clauses against approved references, analyze complete contracts, and identify potential contractual risks.</p><p>The production solution scaled to <strong>~550 users</strong>, achieving <strong>~89% adoption and ~97% retention</strong>, while reducing contract-review effort by <strong>60–65%</strong> and eliminating manual comparison errors in contract analysis.</p>`,
                features: `• <strong>Grounded RAG & Citation Mapping</strong> — Natural-language querying across ~300 enterprise reference documents, with source-level citations to maintain traceability and enable reviewers to validate AI-generated responses.<br/><br/>• <strong>Intelligent Clause Comparison</strong> — Compares pasted contractual clauses against approved reference language, surfaces relevant deviations, and enables contextual follow-up Q&A on the clause being reviewed.<br/><br/>• <strong>Contract Intelligence & Risk Assessment</strong> — Upload an entire contract for AI-powered summarization, contract-specific Q&A, information retrieval, and identification of potential risks categorized as <strong>High / Medium / Low</strong> across applicable risk sub-domains.<br/><br/>• <strong>Policy-Aware Counter-Proposals</strong> — Generates alternative clause language aligned with organizational contracting guidance, allowing reviewers to move from identifying a potential issue toward evaluating a possible negotiation position.<br/><br/>• <strong>Human-in-the-Loop Review</strong> — Incorporates human feedback into the product workflow to improve response alignment while keeping domain experts involved in high-impact decisions.`,
                arch: `<p>Designed around a <strong>Retrieval-Augmented Generation (RAG)</strong> architecture, connecting Claude Haiku 4.0 with an enterprise knowledge layer containing ~300 reference documents. AWS services including S3, DynamoDB, Bedrock, Lambda and API Gateway supported the application workflow, while AWS Guardrails provided additional control over model behaviour.</p><p>The product was intentionally configured for <strong>low-temperature, grounded generation</strong>, with retrieval context and citation mapping used to reduce unsupported responses and improve traceability.</p><p>For AI quality validation, I worked with the testing team to establish evaluation dimensions spanning <strong>Context Recall, Context Precision, Retrieval Hit Rate, Top-K Recall, Answer Accuracy, Faithfulness/Groundedness, Relevance, Completeness, Citation Precision, Citation Recall, Hallucination Rate, Abstention Accuracy, and Out-of-Scope Leakage</strong>.</p><br/><h4 style="margin-top:24px;margin-bottom:12px;font-size:0.95rem;font-weight:700;color:var(--ink);letter-spacing:0.04em;text-transform:uppercase;">PRODUCT OWNERSHIP</h4><p>Owned the product lifecycle from <strong>workflow discovery and requirements definition through POC, roadmap, Agile delivery, UAT, production deployment, and change management</strong>.</p><p>Translated business workflows into functional and non-functional requirements, BRD, user stories, acceptance criteria, and prioritized backlog items; collaborated with architecture, engineering, UI/UX, QA, business SMEs, and leadership throughout delivery.</p><p>Led sprint planning and backlog discussions, conducted product demos with business leadership, collaborated with QA on AI-specific edge cases and response validation, supported UAT, and managed CRs for subsequent deployments.</p><p>The role also involved shaping the <strong>AI interaction design itself</strong>—working with UI/UX and technical teams to determine how retrieval, citations, clause comparison, contract analysis, risk identification, and human feedback should come together as a coherent enterprise workflow.</p>`,
                role: "AI Product Owner & Prototyper",
                domain: "Enterprise Contracting / Life Sciences",
                tech: "AWS Bedrock · Claude Haiku 4.0 · RAG · Amazon S3 · Amazon DynamoDB · AWS Lambda · Amazon API Gateway · AWS Guardrails · Python · React",
                outcome: "60–65% reduction in contract-review effort · ~550 users · ~89% adoption · ~97% retention · Manual comparison errors eliminated",
                demoSample: "Clause 7.2 Liability Cap: Contractor liability shall be uncapped for indirect and consequential damages."
            },
            sop: {
                badge: "02 / RETRIEVE",
                category: "GENAI SOP ASSISTANT / DOCUMENT DISCOVERY",
                title: "GenAI SOP Assistant",
                problem: `<p>Manufacturing operators at AstraZeneca often needed to identify the correct <strong>SOPs, Work Instructions (WIs), and Forms</strong> applicable to different stages of the product lifecycle.</p><p>The challenge wasn't simply finding a document.</p><p>Thousands of documents existed within Veeva Vault, often with multiple versions—some active, some outdated, and others temporarily in edit status. Operators had to manually search, remember relevant document numbers, inspect metadata, validate document status, and determine which version was appropriate before using it.</p><p>Even after finding the right document, locating the required information inside long SOPs created another layer of effort and frequently resulted in <strong>dependency on SMEs for confirmation</strong>.</p><p>We built the <strong>GenAI SOP Assistant</strong> as a controlled document-discovery experience that reduced this dependency without introducing an additional AI-generated interpretation layer.</p><p>Instead of asking the LLM to explain what an SOP says, the assistant answers a more fundamental question:</p><p><strong>“Which approved document should I be looking at—and exactly where?”</strong></p><p>The solution was rolled out across <strong>25 global manufacturing sites in six deployment waves</strong>, with approximately <strong>4–5 sites activated per wave</strong>. It achieved <strong>~79% adoption with 85–90% retention</strong>, while reducing SOP lookup time from approximately <strong>2 hours/week to 20 minutes/week per operator</strong>—saving an estimated <strong>~790,000 minutes every week</strong>.</p>`,
                features: `• <strong>Natural-Language SOP Discovery</strong> — Users can describe their requirement in natural language rather than remembering document numbers or navigating through Veeva Vault manually. The assistant identifies the relevant SOPs, WIs, or Forms applicable to the query.<br/><br/>• <strong>Authoritative Document Retrieval</strong> — The system surfaces the appropriate document based on its current status and relevance, prioritizing the latest <strong>active</strong> version for operational use. Documents in edit status are explicitly flagged rather than presented as approved content.<br/><br/>• <strong>Page-Level Deep Linking</strong> — Responses include the relevant SOP identifier, page-numbered hyperlink, and highlighted source text, allowing operators to navigate directly to the supporting section of the authoritative document.<br/><br/>• <strong>Direct SOP Number Search</strong> — Users who already know the SOP number can bypass conversational discovery and retrieve the corresponding document directly.<br/><br/>• <strong>Multi-Document Discovery</strong> — When a query maps to multiple applicable documents, the assistant surfaces the relevant set rather than forcing the user into a single-document assumption.<br/><br/>• <strong>Contextual Follow-Up</strong> — Users can continue refining their discovery query through follow-up questions while remaining within the document-retrieval workflow.<br/><br/>• <strong>Controlled AI Experience</strong> — The assistant deliberately does <strong>not generate natural-language answers from SOP content</strong>. This product decision minimizes the risk of AI interpretation or hallucination becoming confused with an authoritative manufacturing procedure.`,
                arch: `<p>Built as a <strong>retrieval-first RAG architecture</strong> integrating Veeva Vault with an AWS-based knowledge retrieval layer.</p><p>The solution used <strong>Amazon Titan embeddings and Amazon OpenSearch</strong> to support semantic retrieval, with <strong>semantic chunking, hybrid search, and two-stage candidate filtering</strong> to improve the identification and ranking of relevant documents.</p><p>The retrieval workflow was designed around document authority and operational applicability—not simply semantic similarity. Document metadata and status were incorporated so that the experience could prioritize the <strong>latest active version</strong>, while documents in edit status could be explicitly identified rather than surfaced as approved operational guidance.</p><p>A key product decision was to keep the LLM outside the final answer-generation path. Rather than generating an interpretation of an SOP, the system returns the <strong>authoritative source document, relevant page, and highlighted supporting text</strong>.</p><p>This created a deliberate separation between: <strong>AI-powered discovery → Authoritative document → Human interpretation</strong>. For a regulated manufacturing environment, this was an intentional product and risk-control decision.</p><br/><h4 style="margin-top:20px;margin-bottom:10px;font-size:0.92rem;font-weight:700;color:var(--ink);letter-spacing:0.04em;text-transform:uppercase;">AI &amp; RETRIEVAL EVALUATION</h4><p>Because the assistant's primary job is <strong>document discovery rather than answer generation</strong>, evaluation focused on retrieval quality and operational correctness rather than conventional LLM response metrics.</p><p>The evaluation framework was designed around: <strong>Retrieval Hit Rate</strong> (correct SOP appeared in results), <strong>Top-K Recall</strong> (relevant document surfaced in highest-ranked results), <strong>Context Precision</strong> (retrieved documents actually relevant to query), <strong>Context Recall</strong> (retrieval layer captured required documents), <strong>Ranking / Retrieval Relevance</strong> (most applicable documents prioritized), <strong>Document Validity Accuracy</strong> (correct active/usable version surfaced), <strong>Citation / Deep-Link Accuracy</strong> (returned hyperlink and page reference navigated to supporting content), <strong>Abstention / No-Match Accuracy</strong> (avoided surfacing irrelevant document when no match available), and <strong>Multi-Document Recall</strong> (surfaced complete document set for multi-SOP queries).</p><br/><h4 style="margin-top:24px;margin-bottom:12px;font-size:0.95rem;font-weight:700;color:var(--ink);letter-spacing:0.04em;text-transform:uppercase;">PRODUCT OWNERSHIP &amp; ROLLOUT</h4><p>Owned the product lifecycle from <strong>workflow discovery and requirement definition through POC, roadmap, Agile delivery, UAT, production rollout, and change management</strong>.</p><p>Translated manufacturing-user workflows into functional and non-functional requirements, BRD, user stories, acceptance criteria, and prioritized backlog items; collaborated with engineering, architecture, UI/UX, QA, business SMEs, and site stakeholders.</p><p>Led sprint planning, backlog prioritization, daily Agile ceremonies, stakeholder discussions, product demonstrations, UAT coordination, and deployment-related change requests.</p><p>Worked with the testing team to define <strong>retrieval-specific edge cases</strong>, including document relevance, multiple applicable documents, active versus edit-status documents, direct SOP-number searches, and page-level source accuracy.</p><p>For production adoption, supported a <strong>six-wave rollout strategy across 25 global sites</strong>, with each wave activating approximately 4–5 sites. The rollout incorporated <strong>pilot validation, user onboarding, training, change management, SME champions, feedback loops, and site-level adoption tracking</strong>.</p><p>An <strong>admin-only insights dashboard</strong> was also used to monitor adoption and usage behaviour, enabling the product team to identify engagement patterns, retention, and operational KPIs to inform subsequent product decisions.</p>`,
                role: "AI Product Owner & Prototyper",
                domain: "Life Sciences · Manufacturing Operations · SOP / Work Instruction Discovery",
                tech: "AWS Bedrock · Claude Sonnet 5 · Amazon OpenSearch · Amazon S3 · AWS Knowledge Bases · Amazon Titan Embeddings · AWS API Services · AWS Guardrails · Veeva Vault",
                outcome: "~79% adoption · 85–90% retention · ~2 hours → ~20 minutes weekly SOP lookup time · ~790,000 minutes saved weekly · 25 global sites",
                demoSample: "How do I perform equipment calibration for Bioreactor Unit B3 according to SOP 402?",
                kpisHtml: `<div class="kpi-chart-card">
                    <div class="kpi-card-header">
                        <h4 class="kpi-chart-title">Before vs After SOP Lookup Time</h4>
                        <p class="kpi-chart-sub">Weekly SOP lookup effort per operator before vs after introducing the GenAI SOP Assistant.</p>
                    </div>
                    <div class="kpi-bar-comparison">
                        <div class="kpi-bar-group">
                            <div class="kpi-bar-label-top">
                                <span>Before AI</span>
                                <span class="kpi-bar-val">120 min / week</span>
                            </div>
                            <div class="kpi-bar-track">
                                <div class="kpi-bar-fill before" style="width: 100%;"></div>
                            </div>
                        </div>
                        <div class="kpi-bar-group">
                            <div class="kpi-bar-label-top">
                                <span>After AI</span>
                                <span class="kpi-bar-val highlight">20 min / week</span>
                            </div>
                            <div class="kpi-bar-track">
                                <div class="kpi-bar-fill after" style="width: 16.7%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="kpi-badge-impact">
                        <span class="impact-arrow">↓</span> <strong>120 min/week → 20 min/week</strong> (~83% Reduction · ~790,000 mins saved weekly)
                    </div>
                </div>
                <div class="kpi-chart-card">
                    <div class="kpi-card-header">
                        <h4 class="kpi-chart-title">Product Adoption &amp; Retention</h4>
                        <p class="kpi-chart-sub">Production adoption and retention across 25 global manufacturing sites in 6 deployment waves.</p>
                    </div>
                    <div class="kpi-metrics-grid">
                        <div class="kpi-metric-box">
                            <div class="kpi-ring-wrap">
                                <svg viewBox="0 0 36 36" class="kpi-ring-svg">
                                    <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path class="ring-stroke" strokeDasharray="79, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <span class="ring-text">~79%</span>
                            </div>
                            <div class="metric-info">
                                <div class="metric-name">Adoption</div>
                                <div class="metric-sub">25 Global Sites</div>
                            </div>
                        </div>
                        <div class="kpi-metric-box">
                            <div class="kpi-ring-wrap">
                                <svg viewBox="0 0 36 36" class="kpi-ring-svg">
                                    <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path class="ring-stroke retention" strokeDasharray="87.5, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <span class="ring-text" style="font-size: 0.62rem; letter-spacing: -0.05em;">85–90%</span>
                            </div>
                            <div class="metric-info">
                                <div class="metric-name">Retention</div>
                                <div class="metric-sub">87.5% Midpoint</div>
                            </div>
                        </div>
                    </div>
                    <div class="kpi-summary-strip">
                        <span>25 Global Sites</span> • <span>~79% Adoption</span> • <span>85–90% Retention</span>
                    </div>
                </div>`
            },
            doc: {
                badge: "03 / CREATE",
                category: "DOC AUTHOR / WORKFLOW AUTOMATION",
                title: "Doc Author — Clinical Functional Plan & ICF Workflow Automation",
                problem: `<p>Study teams at Syneos Health authored a wide range of clinical functional plan templates — TMF, PRP, MDRP, Informed Consent Forms (ICFs), and others — by hand for every study. The work was repetitive, slow, and error-prone: study-specific data had to be manually sourced from multiple systems, and for ICFs specifically, teams walked through a three-tier authoring and compliance process entirely manually — a sponsor-approved Master ICF, up to seven country- or site-specific variants adapted to local regulatory and ethical requirements, and a detailed compliance checklist verifying everything from regulatory citation coverage to document formatting.</p><p>The real challenge wasn't a single bottleneck — it was two structurally different problems disguised as one workflow. Most templates needed straightforward, high-confidence data population from systems that already held the answer. ICFs needed judgment: comparing sponsor-approved master language against country-specific legal and ethical requirements — something a fixed query couldn't do, and something an unconstrained AI couldn't be trusted to do silently inside a regulated consent document.</p><p>Doc Author's automation layer was designed around that distinction rather than defaulting to one AI system for everything. Deterministic template fields are populated by a data pipeline pulling directly from source systems — no model involved, no room for drift. The ICF family, where matching judgment against country-specific rules is unavoidable, uses a constrained, citation-traceable AI workflow with mandatory human review before anything is finalized — never an autonomous edit that ships without a person checking it against its source.</p><p>Now scaling across <strong>10+ plan types in active quarterly production</strong>, the platform has automated an estimated <strong>40% of data pointers on conventional templates</strong> (saving roughly 30 minutes per user per study) and reached roughly <strong>70% automation on ICF and checklist fields</strong>, with manual review error margins down an estimated <strong>80% on the ICF workflow specifically</strong>.</p>`,
                features: `• <strong>Study-Specific Data Auto-Population</strong> — Conventional plan templates are populated directly from source systems via a structured data pipeline, eliminating manual re-entry of study, protocol, and site information already held elsewhere.<br/><br/>• <strong>Master-to-Country ICF Rule Matching</strong> — Compares sponsor-approved Master ICF language against country-specific requirements gathered during business intake, proposing section-level edits rather than regenerating documents wholesale.<br/><br/>• <strong>Compliance Checklist Auto-Verification</strong> — Checks each checklist requirement against the relevant ICF section(s), including cross-document checks across Main, Assent, and sub-study (e.g. Pregnancy, Pregnant Partner) variants, with every answer traceable to the exact source passage and regulatory citation it was checked against.<br/><br/>• <strong>Human-in-the-Loop Approval Gates</strong> — No AI-proposed edit or checklist answer is finalized without explicit reviewer confirmation; every row carries a status (proposed, needs review, needs mapping, final) rather than auto-submitting.<br/><br/>• <strong>Multi-Template, Multi-Country Scalability</strong> — Built to extend across 7 master ICF variants and multiple country rule sets per study without re-architecting per template type.<br/><br/>• <strong>Controlled, Auditable AI</strong> — Deterministic checks (exact regulatory language, document formatting) are handled by rule-based logic, not the model — the AI is used only where genuine semantic judgment is required, keeping the system's behavior predictable and its outputs defensible in an audit.`,
                arch: `<p>Built as two purpose-fit pipelines rather than one general system. The conventional-template path is a direct data pipeline: study, protocol, and site data is pulled from source systems and mapped to template fields with no model in the loop, keeping output fully deterministic and instantly auditable.</p><p>The ICF path is a constrained, tool-based AI workflow. A structured rules table — mapping each requirement to its regulatory citation, applicable document type, and source section — drives both the rule-matching step (which compares Master ICF language against country requirements and proposes section-level edits) and the checklist-verification step (which checks presence, absence, and exact regulatory language across the relevant documents). Deterministic checks, like exact-statement matching and document formatting, are handled by rule-based logic rather than the model; the AI is scoped to semantic presence/absence judgments only, each returned with a short rationale tied to the source text it evaluated. Every proposed edit and checklist answer is surfaced to a reviewer with its full source trail before it can be marked final — the system proposes, it does not decide.</p>`,
                role: "Product Owner / Business Analyst",
                domain: "Life Sciences · Clinical Operations · Regulatory Document Automation",
                tech: "Python · Data Pipelines · LLM Orchestration · Vector Search & Embeddings · Document Processing & Extraction · Cloud Infrastructure",
                outcome: "~40% conventional fields automated · ~30 mins saved per user/study · ~70% automation on ICF workflow · ~80% reduction in ICF review error margin · 10+ plan types scaled (Jan 2026 – present)",
                demoSample: "Draft Section 3.1 Study Objectives for Clinical Protocol Phase IIa.",
                kpisHtml: `<div class="kpi-chart-card">
                    <div class="kpi-card-header">
                        <h4 class="kpi-chart-title">Workflow Automation Rate</h4>
                        <p class="kpi-chart-sub">Automation percentage across conventional templates vs ICF &amp; checklist workflows.</p>
                    </div>
                    <div class="kpi-bar-comparison">
                        <div class="kpi-bar-group">
                            <div class="kpi-bar-label-top">
                                <span>Conventional Templates</span>
                                <span class="kpi-bar-val">~40% Automated</span>
                            </div>
                            <div class="kpi-bar-track">
                                <div class="kpi-bar-fill before" style="width: 40%;"></div>
                            </div>
                        </div>
                        <div class="kpi-bar-group">
                            <div class="kpi-bar-label-top">
                                <span>ICF &amp; Checklist Workflow</span>
                                <span class="kpi-bar-val highlight">~70% Automated</span>
                            </div>
                            <div class="kpi-bar-track">
                                <div class="kpi-bar-fill after" style="width: 70%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="kpi-badge-impact">
                        <span class="impact-arrow">↓</span> <strong>~80% Reduction in ICF Review Error Margin</strong> · ~30 Mins Saved / User / Study
                    </div>
                </div>
                <div class="kpi-chart-card">
                    <div class="kpi-card-header">
                        <h4 class="kpi-chart-title">Production Scale &amp; Quality</h4>
                        <p class="kpi-chart-sub">Active quarterly production footprint and review error reduction.</p>
                    </div>
                    <div class="kpi-metrics-grid">
                        <div class="kpi-metric-box">
                            <div class="kpi-ring-wrap">
                                <svg viewBox="0 0 36 36" class="kpi-ring-svg">
                                    <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path class="ring-stroke" strokeDasharray="70, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <span class="ring-text">~70%</span>
                            </div>
                            <div class="metric-info">
                                <div class="metric-name">ICF Automation</div>
                                <div class="metric-sub">7 Master Variants</div>
                            </div>
                        </div>
                        <div class="kpi-metric-box">
                            <div class="kpi-ring-wrap">
                                <svg viewBox="0 0 36 36" class="kpi-ring-svg">
                                    <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path class="ring-stroke retention" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <span class="ring-text">~80%</span>
                            </div>
                            <div class="metric-info">
                                <div class="metric-name">Error Reduction</div>
                                <div class="metric-sub">ICF Review Margin</div>
                            </div>
                        </div>
                    </div>
                    <div class="kpi-summary-strip">
                        <span>10+ Plan Types Scaled</span> • <span>~70% ICF Automation</span> • <span>~80% Error Reduction</span>
                    </div>
                </div>`
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

            const kpisTabBtn = document.getElementById('modalKpiTabBtn');
            const kpisWrapper = document.getElementById('modalKpisWrapper');

            if (data.kpisHtml) {
                if (kpisTabBtn) kpisTabBtn.style.display = 'inline-block';
                if (kpisWrapper) kpisWrapper.innerHTML = data.kpisHtml;
            } else {
                if (kpisTabBtn) kpisTabBtn.style.display = 'none';
                // Reset active tab to overview if KPI tab was open
                const overviewBtn = document.querySelector('.modal-tab[data-tab="overview"]') as HTMLElement;
                if (overviewBtn) overviewBtn.click();
            }

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

        // Scroll handler for auto-hiding traditional navbar (hide on scroll down, show on scroll up)
        let lastScrollY = window.scrollY;
        const handleHeaderScroll = () => {
            const header = document.querySelector('header');
            if (!header) return;

            const currentScrollY = window.scrollY;

            if (currentScrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            if (currentScrollY > 80 && currentScrollY > lastScrollY) {
                header.classList.add('nav-hidden');
            } else if (currentScrollY < lastScrollY) {
                header.classList.remove('nav-hidden');
            }

            lastScrollY = Math.max(0, currentScrollY);
        };
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleHeaderScroll);
    }, []);

    return (
        <>

            <div className="noise"></div>
            <div className="cursor" id="cursor"></div>
            <div className="cursor-label" id="cursorLabel"></div>

            <main id="top" className="stack-container intro-flowing">

                {/* HERO SECTION (CWAYS.IN REPLICATED DESIGN & SINGLE SCROLL FLOW) */}
                <section className="hero-layer cways-hero-theme" id="heroLayer">
                    {/* NAVBAR AT THE TOP OF HERO SECTION (CWAYS STYLE WITH REPLICATED DESIGN) */}
                    <header className="cways-header">
                        <Link href="/" className="cways-logo" data-cursor="PRANESH">pranesh soni</Link>

                        <nav className="cways-nav">
                            <Link href="/about" data-cursor="ABOUT">About</Link>
                            <a href="#work" data-cursor="SERVICES">Services</a>
                            <a href="#work" data-cursor="PORTFOLIO">Portfolio</a>
                            <a href="#manifesto" data-cursor="BLOGS">Blogs</a>
                            <Link href="/about" data-cursor="WHY ME">Why Me</Link>
                        </nav>

                        <div className="header-actions">
                            <button 
                                className="cways-menu-toggle" 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle navigation menu"
                            >
                                {isMenuOpen ? "CLOSE ✕" : (
                                    <span className="hamburger-wrap">
                                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M1 6.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M1 11.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </span>
                                )}
                            </button>
                            <a href="#contact" onClick={handleLetsBuildTogether} className="cways-header-cta cways-desktop-only-cta" data-cursor="CONTACT">
                                LET'S BUILD
                            </a>
                        </div>
                    </header>

                    {/* FULL SCREEN OVERLAY MOBILE & PORTRAIT MENU DRAWER */}
                    {isMenuOpen && (
                        <div className="cways-mobile-menu-overlay">
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
                                <a href="#work" onClick={() => setIsMenuOpen(false)}>
                                    <span className="num">02</span> SERVICES
                                </a>
                                <a href="#work" onClick={() => setIsMenuOpen(false)}>
                                    <span className="num">03</span> PORTFOLIO
                                </a>
                                <a href="#manifesto" onClick={() => setIsMenuOpen(false)}>
                                    <span className="num">04</span> BLOGS
                                </a>
                                <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                                    <span className="num">05</span> WHY ME
                                </Link>
                            </div>
                            <div className="cways-mobile-menu-footer">
                                <a 
                                    href="#contact" 
                                    onClick={(e) => { setIsMenuOpen(false); handleLetsBuildTogether(e); }} 
                                    className="cways-btn-primary"
                                >
                                    LET'S BUILD TOGETHER
                                </a>
                            </div>
                        </div>
                    )}

                    {/* ATMOSPHERIC DUAL LIGHTING BACKGROUND OVERLAY */}
                    <div className="cways-hero-bg-overlay"></div>

                    {/* HERO TITLE & CONTENT */}
                    <div className="cways-hero-content">
                        <div className="cways-eyebrow">AI PRODUCT OWNER</div>

                        <h1 className="cways-hero-title">
                            I BUILD<br />
                            AI PRODUCTS<br />
                            THAT TURN<br />
                            COMPLEXITY<br />
                            <span className="cways-stroke-text">INTO POSSIBILITY.</span>
                        </h1>

                        <p className="cways-hero-sub">
                            I'm Pranesh — an AI Product Owner building AI capabilities for life sciences, taking ideas from workflow to working prototype.
                        </p>

                        <div className="cways-hero-actions">
                            <a href="#work" className="cways-btn-primary" data-cursor="WORK">VIEW WORK</a>
                            <a
                                href="#contact"
                                onClick={handleLetsBuildTogether}
                                className="cways-btn-outline"
                                data-cursor="BUILD"
                            >
                                LET'S BUILD TOGETHER
                            </a>
                        </div>
                    </div>

                    <a href="#manifesto" className="cways-scroll-down">
                        SCROLL DOWN <span className="arrow">↓</span>
                    </a>
                </section>

                {/* MANIFESTO SECTION */}
                <section className="manifesto stack-card" id="manifesto">
                    <div className="section-label">02 / THE POINT OF VIEW</div>
                    <h2 className="cways-section-title">
                        TECHNOLOGY IS INTERESTING.<br />
                        <span className="cways-stroke-text-dark">WHAT PEOPLE DO WITH IT</span><br />
                        IS MORE INTERESTING.
                    </h2>
                </section>

                {/* WORK SECTION & CAROUSEL */}
                <section className="work stack-card" id="work">
                    <div className="work-head">
                        <div>
                            <div className="section-label">03 / SELECTED BUILDS</div>
                            <h2 className="cways-section-title light-theme">
                                THREE<br />
                                <span className="cways-stroke-text-light">THINGS</span><br />
                                I BUILT.
                            </h2>
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

                {/* BELIEF */}
                <section className="belief stack-card">
                    <div>
                        <div className="section-label">06 / WHY AI?</div>
                        <h2 className="cways-section-title">
                            EVERYONE<br />
                            DESERVES<br />
                            <span className="cways-stroke-text-dark">A JARVIS.</span>
                        </h2>
                        <p>AI removes the friction between intent and execution. It makes humans more capable and lets an
                            individual take an idea from workflow to working software.</p>
                    </div>
                    <div className="jarvis">JARVIS // HUMAN CAPABILITY SHOULD EXPAND.</div>
                </section>

                {/* TIMELINE */}
                <section className="timeline stack-card">
                    <div className="timeline-head">
                        <div className="section-label">07 / THE PERSON</div>
                        <h2 className="cways-section-title">
                            HOW I GOT<br />
                            <span className="cways-stroke-text-dark">HERE.</span>
                        </h2>
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

                {/* UNIFIED CWAYS.IN STYLE FOOTER WITH MERGED HEADING & CONTENT */}
                <footer className="cways-footer-theme" id="contact">
                    <div className="cways-footer-inner">
                        {/* EYEBROW TAG */}
                        <div className="cways-footer-eyebrow">08 / LET'S BUILD</div>

                        {/* HEADING */}
                        <h2 className="cways-footer-heading">
                            GOT A GOOD<br />
                            <span className="cways-stroke-text-dark">PROBLEM?</span>
                        </h2>

                        {/* SUBTEXT */}
                        <p className="cways-footer-subtext">
                            AI product opportunity, prototype build, life sciences RAG solution, or strategic advisory — let's start a conversation.
                        </p>

                        {/* HUGE EMAIL HIGHLIGHT */}
                        <a href="mailto:praneshsoni@outlook.com" className="cways-footer-email" data-cursor="EMAIL">
                            PRANESHSONI@OUTLOOK.COM
                        </a>

                        {/* AUTHOR & ROLE ROW */}
                        <div className="cways-footer-author-row">
                            <span className="author-dot"></span>
                            <span className="author-name">PRANESH SONI</span>
                            <span className="author-sep">—</span>
                            <span className="author-title">AI PRODUCT OWNER & BUILDER</span>
                        </div>

                        {/* SOCIAL LINK ROW */}
                        <div className="cways-footer-socials">
                            <a href="https://www.linkedin.com/in/pranesh-soni" target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN">
                                LINKEDIN
                            </a>
                            <a href="https://substack.com/@praneshsoni" target="_blank" rel="noopener noreferrer" data-cursor="SUBSTACK">
                                SUBSTACK
                            </a>
                        </div>

                        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
                        <div className="cways-footer-bottom-bar">
                            <div className="cways-footer-copy">© 2026 PRANESH SONI.</div>
                            <div className="cways-footer-nav-links">
                                <a href="#top" className="cways-back-top" data-cursor="TOP">
                                    Back to top <span className="arrow">↑</span>
                                </a>
                            </div>
                        </div>

                        {/* ULTRA-LARGE OUTLINE STROKE BRAND TEXT AT BOTTOM */}
                        <div className="cways-footer-stroke-brand">
                            PRANESH SONI
                        </div>
                    </div>
                </footer>

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
                        <button className="modal-tab" id="modalKpiTabBtn" data-tab="kpis">PRODUCT KPIs &amp; IMPACT</button>
                    </div>

                    <div className="tab-pane active" id="tab-overview">
                        <div className="modal-grid">
                            <div>
                                <h3 className="modal-section-title">Problem &amp; Impact</h3>
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
                                        <span id="modalRole">AI Product Owner &amp; Prototyper</span>
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
                        <h3 className="modal-section-title">System Architecture &amp; Knowledge Retrieval</h3>
                        <div className="modal-text" id="modalArchText">
                            Documents are parsed into semantic chunks and stored in a vector index with metadata filtering.
                            Query processing runs dual-stage retrieval: dense vector similarity followed by reranking against
                            internal GxP compliance guidelines.
                        </div>
                    </div>

                    <div className="tab-pane" id="tab-kpis">
                        <h3 className="modal-section-title">Product Impact &amp; Business KPIs</h3>
                        <div className="kpi-charts-wrapper" id="modalKpisWrapper">

                            {/* CHART 1: CONTRACT REVIEW EFFORT REDUCTION */}
                            <div className="kpi-chart-card">
                                <div className="kpi-card-header">
                                    <h4 className="kpi-chart-title">Contract Review Effort</h4>
                                    <p className="kpi-chart-sub">Measured reduction in review effort after introducing the GenAI Contracting Assistant.</p>
                                </div>
                                <div className="kpi-bar-comparison">
                                    <div className="kpi-bar-group">
                                        <div className="kpi-bar-label-top">
                                            <span>Before AI</span>
                                            <span className="kpi-bar-val">100%</span>
                                        </div>
                                        <div className="kpi-bar-track">
                                            <div className="kpi-bar-fill before" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                    <div className="kpi-bar-group">
                                        <div className="kpi-bar-label-top">
                                            <span>After AI</span>
                                            <span className="kpi-bar-val highlight">37.5%</span>
                                        </div>
                                        <div className="kpi-bar-track">
                                            <div className="kpi-bar-fill after" style={{ width: '37.5%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kpi-badge-impact">
                                    <span className="impact-arrow">↓</span> <strong>60–65% Reduction</strong> in Contract-Review Effort
                                </div>
                            </div>

                            {/* CHART 2: PRODUCTION ADOPTION & RETENTION */}
                            <div className="kpi-chart-card">
                                <div className="kpi-card-header">
                                    <h4 className="kpi-chart-title">From Capability to Adoption</h4>
                                    <p className="kpi-chart-sub">Production adoption and retention of the GenAI Contracting Assistant.</p>
                                </div>
                                <div className="kpi-metrics-grid">
                                    <div className="kpi-metric-box">
                                        <div className="kpi-ring-wrap">
                                            <svg viewBox="0 0 36 36" className="kpi-ring-svg">
                                                <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path className="ring-stroke" strokeDasharray="89, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <span className="ring-text">89%</span>
                                        </div>
                                        <div className="metric-info">
                                            <div className="metric-name">Adoption</div>
                                            <div className="metric-sub">~550 active users</div>
                                        </div>
                                    </div>

                                    <div className="kpi-metric-box">
                                        <div className="kpi-ring-wrap">
                                            <svg viewBox="0 0 36 36" className="kpi-ring-svg">
                                                <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path className="ring-stroke retention" strokeDasharray="97, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <span className="ring-text">97%</span>
                                        </div>
                                        <div className="metric-info">
                                            <div className="metric-name">Retention</div>
                                            <div className="metric-sub">Long-term active usage</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kpi-summary-strip">
                                    <span>~550 Active Users</span> • <span>89% Adoption</span> • <span>97% Retention</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </>
    );
}
