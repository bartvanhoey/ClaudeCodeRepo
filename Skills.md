# Skills

Claude Code Skills are modular, file-based extensions — each one a folder with a `SKILL.md` (plus optional scripts/resources) that packages domain knowledge or a specific workflow. Claude loads a skill's full instructions only when it's relevant (matched by its description or invoked explicitly via `/skill-name`), keeping the rest of the context window free. They're how you give Claude reusable, specialized capabilities — like a particular review process, a design system, or a deployment routine — without bloating every conversation with instructions it doesn't need yet.

## Useful Skills

### 1. Frontend Design Skill by Anthropic

[Frontend Design Skill by Anthropic](https://skillsmp.com/creators/anthropics/skills/skills-frontend-design)

Guides Claude to commit to a distinctive design direction (purpose, tone, constraints, differentiation) before writing any UI code, and bans generic AI defaults like Inter, Roboto, and purple gradients — so output doesn't look templated.

```text
    npx skills add https://github.com/anthropics/skills --skill frontend-design

    /frontend-design
```

### 2. Grill with Docs by Matt Pocock

[Grill with Docs by Matt Pocock](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md)

A Socratic, interview-style planning skill: it grills you on a proposed change one question at a time, checks your answers against the codebase and existing docs, and writes confirmed terminology and decisions back into `CONTEXT.md` and ADRs (Architecture Decision Record)  as you go. Best used before starting a significant change.

```text
    npx skills@latest add mattpocock/skills

    /grill-with-docs
```

### 3. Test Driven Development Workflow by Affaan-m

[Test Driven Development Workflow by Affaan-m](https://github.com/affaan-m/ECC/tree/main/skills/tdd-workflow)

Enforces a strict red-green-refactor TDD cycle (user journeys → write failing tests → minimal implementation → pass tests → refactor → verify 80%+ coverage → evidence report) for new features, bug fixes, and refactors, with Git checkpoints at each stage.

```text
    npx skills add https://github.com/affaan-m/ECC --skill tdd-workflow

    /tdd-workflow
```

### 4. Code Reviewer Skill by Shubhamsaboo

[Code Reviewer Skill by Shubhamsaboo](https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/awesome_agent_skills/code-reviewer)

A prioritized code review skill that checks security (SQL injection, XSS, secrets) first, then performance, correctness, maintainability, and test coverage, surfacing findings by severity with concrete fix suggestions. Use it on PRs, pre-deployment code, or security audits.

```text
    npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps --skill code-reviewer

    /code-reviewer
```

### 5. Skill Creator by Anthropic

[Skill Creator by Anthropic](https://skillsmp.com/creators/anthropics/skills/skills-skill-creator)
A meta-skill that guides you through creating your own Claude Code Skill, with best practices for writing clear instructions, defining triggers, and structuring files. It generates a boilerplate `SKILL.md` and folder structure based on your input, so you can focus on the unique logic of your skill instead of setup.

```text
    /plugin marketplace add anthropics/skills

    /skill-creator
```

