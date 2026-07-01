# CLAUDE.md

Project guidance for Claude when working in the DISCIPLINE repository.

## Constitution Check

Before every new implementation phase:

- Read DISCIPLINE_CONSTITUTION.md first.
- Use it as the primary decision framework.
- If a conflict exists between the Constitution and any lower-level document, always follow the Constitution.
- Never implement a feature that contradicts the Constitution without first reporting the conflict.

## Canonical document hierarchy

1. docs/DISCIPLINE_CONSTITUTION.md (highest authority)
2. docs/DISCIPLINE_MASTER_CONTEXT.md
3. docs/DISCIPLINE_RULEBOOK.md
4. docs/DISCIPLINE_CANONICAL_TOKENS.md
5. docs/DISCIPLINE_COMPONENT_LIBRARY.md
6. docs/DISCIPLINE_BUILD_PLAN.md

In any conflict, the higher document prevails; the Constitution prevails over all.

## Architecture invariants (frozen)

Before building or modifying any component, read
`docs/DISCIPLINE_COMPONENT_ARCHITECTURE.md`. These are frozen, library-wide rules
that may be extended but never weakened. In particular:

- **Invariant A1 — base components never make layout decisions.** A base component
  defines only its material role, behavior, semantics, and intrinsic geometry
  (including an adaptable width and a default radius/padding). It never decides
  placement, full-bleed/edge-to-edge, alignment, page position, or any
  context-specific/responsive layout. Every layout decision is delegated to the
  consuming component. (`rounded-none`, `mx-auto`, `fixed inset-0`, page
  width-caps → belong to the consumer, not the base component.)

## Working state

Current build progress is tracked in PROJECT_STATE.md. Read it at the start of a session.
