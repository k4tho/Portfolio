from __future__ import annotations

import os
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib.colors import Color, black
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


SOURCE = Path(r"C:\Users\katie\Documents\cpsc\Resumes\Katie Ho Resume.pdf")
WORK_DIR = Path(r"C:\Users\katie\Documents\cpsc\Personal\PortfolioWeb\tmp\pdfs\dodgers-2026-09-26-work")
OUTPUT_DIR = Path(r"C:\Users\katie\Documents\cpsc\Resumes\Los Angeles Dodgers - 2026-09-26")
OUTPUT = OUTPUT_DIR / "Katie Ho Resume.pdf"


def extract_embedded_fonts() -> dict[str, Path]:
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(SOURCE))
    fonts = reader.pages[0]["/Resources"]["/Font"]
    wanted = {
        "Lora-Regular": "Lora-Regular",
        "Lora-Bold": "Lora-Bold",
        "Lora-Italic": "Lora-Italic",
        "Lora-Medium": "Lora-Medium",
    }
    extracted: dict[str, Path] = {}
    for _, reference in fonts.items():
        font = reference.get_object()
        base_name = str(font.get("/BaseFont", "")).split("+")[-1].lstrip("/")
        if base_name not in wanted:
            continue
        descendants = font.get("/DescendantFonts", [])
        if not descendants:
            continue
        descriptor = descendants[0].get_object()["/FontDescriptor"].get_object()
        stream = descriptor.get("/FontFile2")
        if stream is None:
            continue
        path = WORK_DIR / f"{base_name}.ttf"
        path.write_bytes(stream.get_object().get_data())
        extracted[wanted[base_name]] = path
    missing = set(wanted.values()) - set(extracted)
    if missing:
        raise RuntimeError(f"Missing embedded fonts: {sorted(missing)}")
    return extracted


def register_fonts(font_paths: dict[str, Path]) -> None:
    for name, path in font_paths.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))


PAGE_W, PAGE_H = letter
LEFT = 36
RIGHT = 576
TEXT_LEFT = 54
MUTED = Color(0.42, 0.42, 0.42)


def draw_section(c: canvas.Canvas, title: str, y: float) -> float:
    c.setFillColor(black)
    c.setFont("Lora-Bold", 11)
    c.drawString(LEFT, y, title)
    start = LEFT + pdfmetrics.stringWidth(title, "Lora-Bold", 11) + 8
    c.setLineWidth(0.8)
    c.line(start, y - 1.5, RIGHT, y - 1.5)
    return y - 15


def draw_job(c: canvas.Canvas, employer: str, dates: str, role: str, y: float) -> float:
    c.setFillColor(black)
    c.setFont("Lora-Bold", 8.8)
    c.drawString(LEFT, y, employer)
    c.setFont("Lora-Italic", 8.4)
    c.drawRightString(RIGHT, y, dates)
    y -= 12
    c.setFillColor(MUTED)
    c.setFont("Lora-Regular", 8.4)
    c.drawString(LEFT, y, role)
    return y - 12


def draw_bullet(c: canvas.Canvas, text: str, y: float, font_size: float = 8.15) -> float:
    width = pdfmetrics.stringWidth(text, "Lora-Regular", font_size)
    max_width = RIGHT - TEXT_LEFT
    if width > max_width:
        raise ValueError(f"Bullet exceeds one line ({width:.1f} > {max_width:.1f}): {text}")
    c.setFillColor(black)
    c.circle(LEFT + 2.7, y + 2.5, 1.65, stroke=0, fill=1)
    c.setFont("Lora-Regular", font_size)
    c.drawString(TEXT_LEFT, y, text)
    return y - 12


def build_resume() -> None:
    register_fonts(extract_embedded_fonts())
    OUTPUT_DIR.mkdir(parents=True, exist_ok=False)
    c = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    c.setTitle("Katie Ho Resume")
    c.setAuthor("Katie Ho")

    c.setFillColor(black)
    c.setFont("Lora-Medium", 15)
    c.drawCentredString(PAGE_W / 2, 756, "Katie Ho")
    c.setFont("Lora-Regular", 8.7)
    contact = "katiehh04@gmail.com  •  linkedin.com/in/katho4/  •  github.com/k4tho  •  k4tho.github.io/Portfolio"
    c.drawCentredString(PAGE_W / 2, 736, contact)

    y = draw_section(c, "Education", 708)
    c.setFont("Lora-Bold", 8.8)
    c.drawString(LEFT, y, "University of Southern California, Los Angeles, CA")
    c.setFont("Lora-Italic", 8.4)
    c.drawRightString(RIGHT, y, "(expected) May 2028")
    y -= 12
    c.setFont("Lora-Regular", 8.6)
    c.drawString(72, y, "Master of Science, Computer Science (Data Science)")
    y -= 14
    c.setFont("Lora-Bold", 8.8)
    c.drawString(LEFT, y, "Chapman University, Orange, CA")
    c.setFont("Lora-Italic", 8.4)
    c.drawRightString(RIGHT, y, "August 2025")
    y -= 12
    c.setFont("Lora-Regular", 8.6)
    c.drawString(72, y, "Bachelor of Computer Science, Game Development Programming & Analytics Minor")

    y = draw_section(c, "Technical Skills", y - 22)
    c.setFont("Lora-Regular", 8.2)
    c.drawString(LEFT, y, "Languages: Python, R, SQL, Java, C#, JavaScript, TypeScript, C++, HTML, CSS")
    y -= 12
    c.drawString(LEFT, y, "Data & ML: Predictive Modeling, Model Evaluation, Time-Series Analysis, Pandas, NumPy, XGBoost, TensorFlow, PyTorch")
    y -= 12
    c.drawString(LEFT, y, "Technologies & Tools: Git, GitHub, MySQL, Plotly, Matplotlib, Bash, Linux, Docker, Azure DevOps, Excel, Tableau")

    y = draw_section(c, "Experience", y - 21)
    y = draw_job(c, "Xilo", "December 2025 - August 2026", "Tech Support Engineer", y)
    for bullet in [
        "Built JavaScript/TypeScript automation across ~100 websites, increasing insurance agent efficiency by 50%+.",
        "Tested and debugged 25+ integrations using reusable field mappings, validation logic, and automated workflows.",
        "Evaluated LLM prompts and configurations for an AI quoting agent supporting 4+ simultaneous quotes.",
        "Communicated technical findings to clients and translated urgent business needs into scalable solutions.",
    ]:
        y = draw_bullet(c, bullet, y)

    y = draw_job(c, "Progressify", "June 2025 - August 2025", "Frontend Developer & Data Analytics Intern", y - 2)
    for bullet in [
        "Performed ad hoc SQL and Azure analysis of usage data to answer stakeholder questions and guide UX decisions.",
        "Interpreted engagement trends and communicated findings on underused features and navigation issues.",
    ]:
        y = draw_bullet(c, bullet, y)

    y = draw_job(c, "VRelax", "May 2023 - June 2025", "Research Assistant", y - 2)
    for bullet in [
        "Built and evaluated Random Forest, XGBoost, and TCN predictive models, achieving 88-95% classification accuracy.",
        "Engineered time-series motion features including velocity, duration, distance, curvature, and trajectory for 40+ subjects.",
        "Developed Python pipelines with Pandas and NumPy to clean, normalize, and transform sensor data for model training.",
        "Analyzed and visualized model results with Plotly, communicating findings through presentations and publications.",
    ]:
        y = draw_bullet(c, bullet, y)

    y = draw_job(c, "Code Ninjas", "July 2022 - March 2024", "Tutor (JavaScript, C#, Lua, and Scratch)", y - 2)
    y = draw_bullet(
        c,
        "Explained technical concepts to ~40 students weekly using clear, audience-appropriate instruction.",
        y,
    )

    y = draw_section(c, "Projects", y - 9)
    c.setFont("Lora-Bold", 8.8)
    c.drawString(LEFT, y, "Database App (Freelance work)")
    c.setFont("Lora-Italic", 8.4)
    c.drawString(194, y, "- C#, Python, MySQL")
    y -= 12
    for bullet in [
        "Built Python ETL pipelines to clean, validate, and migrate 3,000+ Excel records into MySQL.",
        "Developed a C# WPF application for ad hoc retrieval, validation, and reporting of centralized business data.",
    ]:
        y = draw_bullet(c, bullet, y)

    c.setFont("Lora-Bold", 8.8)
    c.drawString(LEFT, y - 1, "Evacuate (IEEE GameSIG 2025 Semi-Finalist)")
    title_width = pdfmetrics.stringWidth("Evacuate (IEEE GameSIG 2025 Semi-Finalist)", "Lora-Bold", 8.8)
    c.setFont("Lora-Italic", 8.4)
    c.drawString(LEFT + title_width + 5, y - 1, "- C# & Unity")
    y -= 13
    for bullet in [
        "Led a five-person team using Git version control, integrating code and delivering milestone builds on deadline.",
        "Developed player-state, AI behavior, inventory, and progression systems in C# and Unity.",
    ]:
        y = draw_bullet(c, bullet, y)

    if y < 28:
        raise ValueError(f"Content extends too low on the page: y={y}")
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
