# Resume Tailoring Workflow

Apply these instructions whenever the user provides a job description and asks for a tailored resume.

## Source and accuracy

- Locate the user's original resume in this project folder and treat it as the formatting source of truth.
- Never overwrite or modify the original resume.
- Tailor wording and keywords only where they truthfully match experience already supported by the resume or other user-provided project materials.
- Do not invent responsibilities, technologies, accomplishments, metrics, credentials, or dates.

## Tailoring requirements

- Identify the job description's important role-specific keywords, skills, tools, responsibilities, and qualifications.
- Incorporate relevant keywords naturally into the existing summary, skills, experience, and project content where contextually accurate.
- Prioritize changes that improve alignment with the role while keeping the resume readable and credible.
- Keep every resume bullet to no more than one visually rendered line. Rewrite or shorten any bullet that wraps.
- Preserve the original section order, typography, margins, spacing, alignment, colors, and overall visual formatting.
- Keep the finished resume as clean and tidy as the original.
- Render and visually inspect the completed resume before delivery. Correct wrapping, clipping, overflow, inconsistent spacing, and layout shifts.

## Output

- Create a new folder in the project root named `<Company Name> - YYYY-MM-DD`, using the local date on which the resume is created.
- Save the tailored resume inside that folder as `Katie Ho Resume` while preserving the source resume's file extension.
- Do not place unrelated working files in the delivery folder.

## Match score

After completing each tailored resume, report a 0–100 job-match score based on:

- 40 points: relevant keywords and required skills
- 30 points: alignment between prior responsibilities and the target role
- 20 points: tools, technologies, and domain knowledge
- 10 points: education and other stated qualifications

Briefly explain the strongest matches and the most important remaining gaps. Treat the score as a transparent heuristic, not a guarantee of how a particular applicant-tracking system will rank the resume.

Use this interpretation scale:

- 85–100: strong alignment
- 75–84: competitive alignment and a reasonable submission target
- 65–74: moderate alignment with some filtering risk
- Below 65: weak alignment; substantial required qualifications or keywords are missing

Aim for at least 75 when the user's real experience supports it. Never add unsupported claims merely to raise the score.
