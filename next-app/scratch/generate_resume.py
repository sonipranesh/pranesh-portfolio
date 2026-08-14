import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors

pdf_path = "/Users/pranesh/Ag/next-app/public/Pranesh_Soni_Resume.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()
normal = styles['Normal']

title_style = ParagraphStyle(
    'DocTitle',
    parent=normal,
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=24,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#111111')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=normal,
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#444444')
)

section_heading = ParagraphStyle(
    'SectionHeading',
    parent=normal,
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=colors.HexColor('#111111'),
    spaceBefore=8,
    spaceAfter=2
)

job_title_style = ParagraphStyle(
    'JobTitleStyle',
    parent=normal,
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    textColor=colors.HexColor('#111111')
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=normal,
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    textColor=colors.HexColor('#222222')
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=normal,
    fontName='Helvetica',
    fontSize=8.8,
    leading=12,
    leftIndent=12,
    firstLineIndent=-8,
    textColor=colors.HexColor('#222222'),
    spaceAfter=3
)

story = []

# Title & Contact Header
story.append(Paragraph("Pranesh Soni", title_style))
story.append(Spacer(1, 4))
contact_text = "praneshsoni.com &nbsp;|&nbsp; linkedin.com/in/pranesh-soni &nbsp;|&nbsp; praneshsoni@outlook.com &nbsp;|&nbsp; +91-7727969906"
story.append(Paragraph(contact_text, contact_style))
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#111111'), spaceBefore=0, spaceAfter=8))

# SUMMARY
story.append(Paragraph("SUMMARY", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc'), spaceBefore=1, spaceAfter=5))
summary_text = "<b>AI Product Owner / Product Manager</b> with 3+ years delivering enterprise <b>Generative AI</b> products in regulated life sciences environments, from roadmap definition through production rollout. Track record across <b>LLM/RAG pipelines, responsible AI governance, and Agile/Scrum delivery</b> — translating complex business problems into AI-powered solutions that drive measurable adoption and ROI across global enterprise programs."
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 8))

# WORK EXPERIENCE
story.append(Paragraph("WORK EXPERIENCE", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc'), spaceBefore=1, spaceAfter=5))
story.append(Paragraph("<font size=9.5><b>GenAI Product Owner</b> — Cognizant Technology Solutions</font><font color='#555555'> &nbsp;&nbsp;(May 2023 – Present)</font>", job_title_style))
story.append(Spacer(1, 3))

exp_bullets = [
    "• Defined <b>product vision, roadmap, and KPIs</b> for three enterprise GenAI products in a life sciences environment; conducted market research and feasibility assessments to inform strategic roadmap decisions.",
    "• Led product discovery through <b>customer-facing stakeholder interviews (40+ sessions)</b>, translating business challenges into AI-powered user stories, acceptance criteria, and product requirements.",
    "• Owned <b>end-to-end AI product lifecycle</b> — ideation through deployment and change management — using <b>Agile/Scrum</b>; drove iterative model improvement through structured A/B evaluation cycles.",
    "• Managed <b>risk, compliance, and responsible AI requirements</b> for AI systems — fairness, transparency, and data governance — aligned with life sciences regulatory standards.",
    "• Prioritized and managed the <b>product backlog</b> in collaboration with engineers and business leadership; tracked adoption KPIs and feature ROI via analytics and user feedback to inform roadmap decisions."
]
for bullet in exp_bullets:
    story.append(Paragraph(bullet, bullet_style))

story.append(Spacer(1, 8))

# PROJECTS
story.append(Paragraph("PROJECTS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc'), spaceBefore=1, spaceAfter=5))

# Doc Author
story.append(Paragraph("<b>Doc Author</b> – Clinical Functional Plan Workflow Automation (Syneos Health) <font color='#555555' size=8.5>(Jan 2026 – Present)</font>", job_title_style))
story.append(Paragraph("• Leading gap analysis and requirements gathering across clinical functional plan templates (TMF, ICF, and others), replacing a fully manual, time-intensive authoring process. Designed two automation approaches: a <b>SQL-based data pipeline</b> auto-populating conventional templates from study-specific source data, and an <b>agentic GenAI workflow</b> using <b>LLM-based prompt engineering</b> to convert master ICFs into country-specific ICFs and auto-populate compliance checklists against regulatory citations (21 CFR, ICH GCP), with a <b>human-in-the-loop</b> review architecture for GxP-aligned validation.", bullet_style))
story.append(Paragraph("• <b>Business impact:</b> Scaled the SQL-based flow to 10+ plan types in active production, automating ~40% of data pointers and saving ~30 minutes per user per study, with data-entry errors reduced by an estimated 20–25%. ICF agentic flow achieving ~70% automation with review error margin reduced by ~80%.", bullet_style))
story.append(Spacer(1, 4))

# SOP Assistant
story.append(Paragraph("<b>SOP Assistant</b> – AstraZeneca <font color='#555555' size=8.5>(July 2024 – Dec 2025)</font>", job_title_style))
story.append(Paragraph("• GenAI assistant for global manufacturing site operators to retrieve Standard Operating Procedures (SOPs) across regulated production environments. Enables query-based retrieval of exact SOP IDs and page-level hyperlinks from thousands of documents in Veeva Vault, supporting both natural-language and direct SOP-number queries.", bullet_style))
story.append(Paragraph("• <b>Business impact:</b> Scaled in six phases across 25 global sites; achieved ~79% adoption with 85–90% retention. Reduced SOP lookup time from ~2 hours/week to ~20 minutes/week per operator, saving ~790,000 minutes weekly and generating an estimated £59k–£75k MAU.", bullet_style))
story.append(Spacer(1, 4))

# Contracting Assistant
story.append(Paragraph("<b>Contracting Assistant</b> – AstraZeneca <font color='#555555' size=8.5>(May 2023 – Dec 2024)</font>", job_title_style))
story.append(Paragraph("• GenAI-powered assistant for contract and legal teams to support contract negotiation, review, and risk assessment with third-party vendors. Enables natural-language querying over enterprise contract templates using a RAG-based approach, returning context-aware responses with page-level document hyperlinks for traceability.", bullet_style))
story.append(Paragraph("• <b>Business impact:</b> Rolled out to ~550 users; achieved ~89% adoption and ~97% retention. Reduced contract review effort by 60–65% and eliminated manual comparison errors in contract analysis.", bullet_style))
story.append(Spacer(1, 8))

# EDUCATION
story.append(Paragraph("EDUCATION", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc'), spaceBefore=1, spaceAfter=5))
story.append(Paragraph("<b>Indian Institute of Management (IIM), Jammu</b> — Masters in Business Administration (MBA) <font color='#555555' size=8.5>(2021 – 2023)</font>", body_style))
story.append(Paragraph("<b>Govt. College of Technology and Agriculture (CTAE)</b> — Electrical Engineering <font color='#555555' size=8.5>(2015 – 2019)</font>", body_style))
story.append(Spacer(1, 8))

# SKILLS
story.append(Paragraph("SKILLS & CERTIFICATIONS", section_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#cccccc'), spaceBefore=1, spaceAfter=5))
story.append(Paragraph("• <b>Certifications:</b> SAFe 6 PO/PM, AWS Certified AI Practitioner", bullet_style))
story.append(Paragraph("• <b>Product Ownership:</b> Roadmapping, Backlog Prioritization, Stakeholder Management, Agile & Scrum Delivery", bullet_style))
story.append(Paragraph("• <b>AI & Data:</b> Generative AI, LLMs, RAG Pipelines, NLP, Prompt Engineering, Responsible AI, Data Governance", bullet_style))
story.append(Paragraph("• <b>Cloud & Tools:</b> AWS Services (S3, SageMaker, Bedrock), JIRA, Confluence, Python", bullet_style))

doc.build(story)
print("PDF generated successfully at:", pdf_path)
