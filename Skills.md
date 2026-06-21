# Skills

Claude Code Skills are modular, file-based extensions — each one a folder with a `SKILL.md` (plus optional scripts/resources) that packages domain knowledge or a specific workflow. Claude loads a skill's full instructions only when it's relevant (matched by its description or invoked explicitly via `/skill-name`), keeping the rest of the context window free. They're how you give Claude reusable, specialized capabilities — like a particular review process, a design system, or a deployment routine — without bloating every conversation with instructions it doesn't need yet.

## Useful Skills

### Frontend Design Skill by Anthropic

[Frontend Design Skill by Anthropic](https://skillsmp.com/creators/anthropics/skills/skills-frontend-design)

Guides Claude to commit to a distinctive design direction (purpose, tone, constraints, differentiation) before writing any UI code, and bans generic AI defaults like Inter, Roboto, and purple gradients — so output doesn't look templated.

```text
    npx skills add https://github.com/anthropics/skills --skill frontend-design

    /frontend-design
```

### Grill with Docs by Matt Pocock

[Grill with Docs by Matt Pocock](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md)

A Socratic, interview-style planning skill: it grills you on a proposed change one question at a time, checks your answers against the codebase and existing docs, and writes confirmed terminology and decisions back into `CONTEXT.md` and ADRs (Architecture Decision Record)  as you go. Best used before starting a significant change.

```text
    npx skills@latest add mattpocock/skills

    /grill-with-docs
```
