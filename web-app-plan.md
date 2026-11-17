# ValDiscov Web Application Plan

## 1. Purpose

Turn [description.md](./description.md) into a responsive web application for running non-commercial, campaign-based explorations of value. Campaign creators define a subject and evaluation framework; participants contribute perspectives; the application presents comparisons and patterns without implying that subjective results are objectively correct.

This plan is a delivery roadmap, not a claim that a technology stack or product-policy decision has already been approved.

## 2. Product guardrails

- The product is for discovery and understanding, not commerce.
- Do not build payments, purchases, bidding, cash-equivalent rewards, subscriptions, advertising, or paid promotion.
- Price may be a campaign criterion, but it must never lead to a transaction or financial incentive.
- Show the campaign's criteria and response rules before participation.
- Present results with context, distributions, and differing perspectives; do not reduce every campaign to a winner or single score.
- Keep recognition optional and non-monetary. Do not make leaderboards the default.
- Collect only the personal data needed to operate the service, and provide clear privacy and reporting controls.

## 3. MVP definition

### Include

1. Public campaign discovery, detail pages, keyword search, and basic category/status filters.
2. Account registration, login, and the ability to manage one's own profile and campaigns.
3. Campaign drafts and publishing with a title, description, context, optional image, dates, eligibility, and participation rules.
4. A constrained set of configurable criteria and response types:
   - numeric or bounded-scale rating,
   - single- or multi-select vote,
   - written reflection,
   - optional explanation alongside a rating or vote.
5. One valid submission per user per campaign, with edits allowed until the campaign closes.
6. Campaign state transitions: draft, scheduled, active, closed, and archived.
7. Results with response counts, distributions for numeric and choice responses, and permission-controlled written responses.
8. Creator tools to close a campaign, review its submissions and aggregate results, and publish a contextual result summary.
9. Basic reporting and admin moderation for campaigns and user-generated content.
10. Responsive, accessible interfaces and essential email notifications for account and campaign events.

### Defer

- Arbitrary custom calculation code, weighted composite scores, and complex ranking engines.
- Invited-only cohorts, participant caps, real-time result updates, and sophisticated personalization.
- Badges, public leaderboards, and social-following features.
- Automated AI summaries, external market data, and native mobile applications.
- Advanced analytics, recommendation systems, and high-volume notification infrastructure.

Keep the data model extensible, but implement only response types the product can validate, explain, and test end to end.

## 4. Recommended technical approach

These are starting recommendations for a small, maintainable first release; confirm them before implementation.

- **Web application:** TypeScript with a full-stack React framework such as Next.js. Use server-rendered pages for public campaign discovery and accessible form-based interactions.
- **Database:** PostgreSQL for users, campaigns, versioned criteria, submissions, moderation, and audit records.
- **Data access:** A typed ORM such as Prisma, with schema migrations reviewed and tested in CI.
- **Authentication:** A maintained authentication library or provider supporting secure sessions, verified email, and role checks. Never store plaintext passwords.
- **Media:** Private-by-default object storage with validated uploads and generated thumbnails. Serve public campaign media through controlled, non-executable URLs.
- **Deployment:** Managed application hosting, managed PostgreSQL, object storage, and a separate staging environment. Use environment-managed secrets and automated backups.
- **Application structure:** Keep campaign rules, submission validation, aggregation, and campaign state transitions in server-side domain modules rather than embedding them in UI components.
- **Operations:** Structured logs, error reporting, uptime checks, database backups, and documented restore procedures from the first deploy.

Avoid microservices for the MVP. A modular monolith provides simpler deployment and transactions while preserving boundaries between identity, campaigns, participation, results, media, and moderation.

## 5. Core domain model

Use relational records for entities and explicit, versioned configuration for campaign-defined criteria.

- **User:** identity, profile, account status, timestamps.
- **Campaign:** owner, title, description, context, category, visibility, status, schedule, participation policy, and published result summary.
- **CampaignVersion:** immutable snapshot of the criteria, response types, validation limits, and rules used for a published campaign. A change that affects submissions creates a new version or is disallowed after participation begins.
- **Criterion:** campaign version, label, description, response type, bounds/options, display order, and whether a written explanation is allowed.
- **Submission:** campaign/version, participant, submitted and updated timestamps, moderation status.
- **SubmissionAnswer:** criterion and validated answer payload. Constrain payload formats by response type and validate them on the server.
- **MediaAsset:** storage key, validated media metadata, owner, campaign association, and processing status.
- **Report / ModerationAction:** reporter or moderator, target, reason, decision, and timestamps.
- **AuditEvent:** actor, action, target, timestamp, and relevant before/after metadata for sensitive campaign changes.
- **Notification:** recipient, event type, read state, and delivery status.

Enforce one submission per participant per campaign with a database uniqueness constraint. Keep moderation and audit history separate from user-editable content. Do not store precomputed results as the only source of truth; aggregates must be reproducible from valid submissions and the campaign version.

## 6. Main user journeys

### Campaign creator

1. Sign up and verify account.
2. Create and save a draft with subject, context, media, criteria, response rules, and schedule.
3. Preview the participant experience and resolve validation errors.
4. Publish, or submit for moderation if the launch policy requires review.
5. Monitor participation, close the campaign, review results, and publish a result summary.

### Participant

1. Browse or search public campaigns and inspect a campaign's rules and criteria.
2. Sign in when required and submit validated answers.
3. See a clear confirmation and the campaign's result-visibility policy.
4. Compare their perspective with available aggregate results and return to reflect or explore related campaigns.

### Moderator

1. Review reports and queued content.
2. Hide or restore content, restrict campaigns, or take account action with a recorded reason.
3. Review an audit trail and communicate decisions to affected users.

## 7. Delivery phases and exit criteria

Phases are ordered milestones, not calendar estimates. Validate each phase before starting the next.

### Phase 0 — Product decisions and UX definition

- Confirm launch audience, account requirements, campaign publication policy, and result visibility.
- Define the exact MVP response types and validation rules.
- Produce user flows and wireframes for discovery, campaign creation, contribution, results, and moderation.
- Define privacy, retention, community rules, reporting, and accessibility requirements.

**Exit:** Stakeholders approve the MVP boundary, core flows, policy decisions, and measurable acceptance criteria.

### Phase 1 — Application foundation

- Create the application, local development setup, staging environment, CI checks, and database migrations.
- Implement authentication, session handling, account verification, role checks, and baseline accessibility patterns.
- Add structured error handling, logging, secrets management, and backup/restore setup.

**Exit:** Users can register and sign in; protected actions enforce authorization; a deployment can be rolled back and data restored in a rehearsal.

### Phase 2 — Campaign authoring and discovery

- Implement campaign drafts, criteria editor, preview, publication, scheduling, and state transitions.
- Add media upload validation, storage, and image preview processing.
- Build public campaign listing, detail page, search, and basic filters.

**Exit:** A creator can publish a valid campaign using only supported response types, and a guest can discover and understand its rules.

### Phase 3 — Participation and integrity

- Implement campaign-specific forms, server-side validation, submission persistence, edit rules, and duplicate-submission protection.
- Enforce eligibility and campaign open/close state on every submission request.
- Add confirmation and essential campaign notifications.

**Exit:** Eligible users can submit valid answers; invalid, duplicate, unauthorized, and late submissions are rejected with clear feedback and no partial writes.

### Phase 4 — Results and reflection

- Implement transparent aggregation by criterion, with sample sizes and appropriate distributions.
- Implement privacy-aware display of written responses and the creator's result summary.
- Add result publication, archive views, and participant contribution history.

**Exit:** Results are reproducible from stored answers, match the campaign version, explain their calculation, and do not imply false precision or objective truth.

### Phase 5 — Moderation and release readiness

- Implement reporting, moderation queues and actions, audit history, account controls, and user-facing policies.
- Complete accessibility, privacy, security, performance, and cross-browser checks.
- Add production alerts, rate limits, incident procedures, support contact, and backup verification.
- Run a limited pilot and resolve high-severity usability or integrity issues.

**Exit:** Moderators can handle reports; critical journeys meet release criteria; operational owners can detect and respond to failures; pilot feedback is reviewed.

### Phase 6 — Post-MVP iteration

- Prioritize enhancements using participant learning, result usefulness, perspective diversity, safety feedback, and campaign completion quality.
- Consider ranking, weighted scoring, invitations, badges, or richer notifications only after validating their user value and risks.
- Reassess architecture against observed load before adding queues, caches, or service boundaries.

## 8. Cross-cutting quality plan

### Security and integrity

- Enforce authorization and campaign eligibility on the server for every write and moderation action.
- Validate and normalize all user input; escape output and use framework protections against common web risks.
- Use CSRF protection where applicable, secure cookies, rate limits for authentication and submissions, and least-privilege service credentials.
- Restrict upload size and formats, inspect media, generate safe derivatives, and prevent uploaded files from being served as executable content.
- Use database constraints and transactions for publication, state changes, and submissions.
- Keep secrets out of source control; log sensitive actions without logging passwords, tokens, or unnecessary personal content.

### Privacy, safety, and accessibility

- Define retention and deletion behavior for accounts, submissions, reports, and audit records before launch.
- Explain whether individual responses are public, private to the creator, or aggregate-only before submission.
- Provide reporting, blocking or hiding controls where appropriate, and a documented moderation policy.
- Support keyboard navigation, visible focus, semantic labels, screen-reader-friendly validation, sufficient contrast, and reduced-motion preferences.
- Test responsive layouts at narrow and wide viewport sizes.

### Verification

- **Unit tests:** campaign state transitions, criteria validation, authorization policy helpers, and aggregation functions.
- **Integration tests:** campaign publication, submission constraints, edits, closure, moderation, and database transaction behavior.
- **End-to-end tests:** creator publishes a campaign; participant contributes; creator closes and publishes results; moderator handles a report.
- **Accessibility checks:** automated checks plus keyboard and screen-reader review of core flows.
- **Operational checks:** migration/rollback rehearsal, backup restore, alert delivery, and upload failure handling.

## 9. Success measures

Use product-quality and learning measures, not revenue or time spent alone:

- Participants reporting that they learned something or encountered a useful perspective.
- Share of completed campaigns with a result summary that participants find useful.
- Participation breadth and the presence of reasoned contributions, interpreted in campaign context.
- Campaign completion and return to relevant exploration, balanced against pressure and notification fatigue.
- User-reported safety, clarity of criteria, and confidence about how responses will be used.
- Reliability of submissions, result calculations, campaign state transitions, and moderation response.

Use surveys and qualitative feedback alongside behavioral measures. Do not treat any single metric as proof of insight.

## 10. Decisions to resolve before implementation

1. Is every new campaign published immediately, or does the platform review some or all campaigns first?
2. Are results visible while a campaign is active, only after contribution, only after closure, or according to a creator-selected rule?
3. Are written responses public by default, visible only to the creator, or aggregate-only until explicitly shared?
4. Is account verification required before any contribution, and which campaign visibility/eligibility modes ship in the MVP?
5. What age groups and regions are in scope, and what privacy, consent, and retention obligations follow?
6. Which initial rating scale bounds and choice limits are supported, and may creators change criteria after the first response?
7. Who handles moderation, what response expectations apply, and what appeal path is available?
8. Which hosting, identity, email, and media-storage providers are acceptable for the project?

## 11. Definition of MVP complete

The MVP is ready for a limited launch when a creator can publish a supported campaign, an eligible participant can submit and understand how their response will be used, results can be reproduced and interpreted with context, and moderators can respond to reports. Core flows must work on mobile and desktop, be accessible, preserve data integrity, and comply with the product guardrails in this plan.
