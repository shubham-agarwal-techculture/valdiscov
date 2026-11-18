# ValDiscov

ValDiscov is a non-commercial, campaign-based platform for exploring how people interpret value. A campaign may focus on price, quality, usefulness, beauty, rarity, emotional meaning, social value, condition, or a custom combination of dimensions.

The application is not a marketplace. It does not process purchases, bids, subscriptions, payments, or cash rewards. Its purpose is to collect perspectives, reveal patterns, encourage reflection, and make unfamiliar interpretations visible.

This repository contains a responsive Next.js prototype for campaign discovery, participation, and local data preview. It includes the main user journey, campaign creation, search and category filtering, 1–5 scale submissions, aggregate distributions, and browser-local persistence.

## Table of contents

- [Product vision](#product-vision)
- [Current prototype](#current-prototype)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Campaign model](#campaign-model)
- [Core user journeys](#core-user-journeys)
- [Data persistence](#data-persistence)
- [Guardrails](#guardrails)
- [MVP scope](#mvp-scope)
- [Roadmap](#roadmap)
- [Non-functional requirements](#non-functional-requirements)
- [Success measures](#success-measures)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Product vision

ValDiscov helps people ask:

> What makes something matter?

Value is treated as contextual, subjective, and multidimensional. Campaign initiators define the subject and the dimensions through which participants evaluate it. Participants add a perspective, see how it relates to others, and discover agreements, differences, and unexpected interpretations.

The experience follows a non-transactional discovery loop:

1. **Curiosity** - encounter an interesting subject or question.
2. **Contribution** - add a judgment or explanation.
3. **Comparison** - view the distribution of perspectives.
4. **Insight** - notice patterns and contrasting viewpoints.
5. **Reflection** - reconsider the original assumptions.
6. **Further exploration** - follow another inquiry or campaign.

Monetary price may be explored as a campaign dimension, but it must never create a transaction or financial incentive.

## Current prototype

The current application is a client-side Next.js prototype with local storage-backed state.

It supports:

- Public-style campaign discovery
- Category filtering
- Keyword search
- Campaign detail dialogs
- 1–5 rating submissions across multiple dimensions
- Aggregate bar-chart distributions
- Campaign creation
- One-perspective-per-campaign tracking
- Browser-local persistence
- Responsive mobile and desktop layouts
- Basic storage-error handling and notices

The prototype does not yet include a server, database, authentication provider, media upload service, moderation system, or hosted campaign workflow.

## Features

### Campaign discovery

The home page presents a visual collection of open inquiries. Users can:

- Browse campaign cards and artwork
- Filter by material life, everyday rituals, or ways of seeing
- Search titles, decks, categories, and context
- Open campaign details
- Review response counts and closing labels
- Return to the complete collection

### Campaign participation

For each campaign, participants can:

- Read the subject, context, category, owner, and closing state
- Respond to one or more 1–5 scale dimensions
- Submit one local perspective per campaign
- View aggregate distributions without a winner or final ranking
- See a contextual reflection from the campaign

The interface presents a range of views rather than implying that a subjective answer is objectively correct.

### Campaign creation

The creation dialog allows a browser user to add an inquiry containing:

- Title
- Context
- Category
- One to four custom dimensions

New campaigns receive local custom artwork and are added to the collection immediately.

### Accessibility and responsive behavior

The interface uses:

- Semantic buttons and navigation
- Dialog roles and `Escape` key handling
- Visible keyboard focus
- Labeled form controls
- Screen-reader-only labels where appropriate
- Responsive layouts for narrow and wide viewports
- Reduced visual complexity for utility-focused views

## Technology stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **UI:** React 19
- **Styling:** Global CSS
- **State:** React hooks
- **Persistence:** Browser `localStorage`
- **Illustrations:** Inline SVG
- **Package manager:** npm

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm 10 or newer

### Installation

```powershell
git clone <repository-url>
cd valDiscov
npm install
```

### Run the development server

```powershell
npm run dev
```

Open `http://localhost:3000`.

### Create a production build

```powershell
npm run build
npm run start
```

The production build is generated by Next.js and served on port `3000` by default.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create and type-check a production build |
| `npm run start` | Serve the production build |

The package also contains a legacy `lint` script. With the current Next.js version, use your preferred ESLint configuration directly or add and configure ESLint before relying on `npm run lint`.

## Project structure

```text
.
├── app/
│   ├── globals.css       # Global visual system and responsive layouts
│   ├── layout.tsx        # Root layout and page metadata
│   └── page.tsx          # Discovery, details, participation, and creation UI
├── lib/
│   └── campaigns.ts      # Campaign types and starter campaign data
├── description.md        # Full product requirements specification
├── web-app-plan.md       # Delivery roadmap and implementation guidance
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Campaign model

The prototype uses the following core campaign fields:

| Field | Purpose |
| --- | --- |
| `id` | Stable local campaign identifier |
| `number` | Display sequence |
| `title` | Public inquiry name |
| `deck` | Short introductory question |
| `context` | Subject and relevant background |
| `category` | Discovery category |
| `closes` | Closing or status label |
| `contributors` | Number of local perspectives |
| `owner` | Campaign initiator name |
| `artwork` | Illustration type |
| `dimensions` | The dimensions participants evaluate |
| `reflection` | Contextual interpretation of current responses |

Each dimension contains a label and a five-item distribution:

```text
[1, 2, 3, 4, 5]
```

For example, a campaign dimension may ask:

- How useful is this?
- How meaningful does it feel?
- How much does it deserve to be kept?

A participant response increments the matching bucket for every dimension in the campaign.

## Core user journeys

### Guest or visitor

1. Arrives on the home page.
2. Reviews an introductory inquiry.
3. Searches or filters the collection.
4. Opens an inquiry.
5. Reads the context and aggregate results.
6. Optionally adds a 1–5 perspective.

### Campaign initiator

1. Opens “Begin an inquiry”.
2. Adds a title and context.
3. Chooses a category.
4. Defines up to four dimensions.
5. Publishes the campaign locally.
6. Opens the new inquiry to view or contribute.

### Future creator workflow

The planned hosted workflow adds:

- Account verification
- Campaign drafts
- Scheduled publication
- Publishing or moderation review
- Eligible participant groups
- Campaign versioning
- Closure and archival
- Persistent result summaries
- Audit history

## Data persistence

The prototype persists this shape in `localStorage`:

```ts
type StoredData = {
  campaigns: Campaign[];
  respondedIds: string[];
};
```

The storage key is:

```text
valdiscov-field-notes-v1
```

When the app loads, it:

- Restores saved campaigns and response IDs
- Adds starter campaigns that are missing from older local data
- Displays a non-destructive notice if storage is unavailable or invalid
- Continues operating in memory if browser storage fails

Local data is not shared across devices or browser profiles. Clearing browser storage removes prototype campaigns and contributions.

## Guardrails

The product design requires every implementation to preserve these boundaries:

- No buying or selling
- No payments or escrow
- No auctions or bidding
- No paid campaign promotion
- No subscriptions
- No prizes or cash-equivalent rewards
- No paid access or advertising
- No objective rankings of subjective perspectives
- No external-market-data integration in the MVP
- No leaderboards that imply universal correctness

Recognition is optional and may include attribution, appreciation, contribution history, or badges. It must not provide monetary value or paid advantage.

## MVP scope

### Included in the prototype

- Campaign discovery
- Keyword search
- Basic category filters
- Campaign detail view
- Custom campaign creation
- 1–5 scale responses
- Multiple campaign dimensions
- Aggregate distributions
- Browser-local persistence
- Responsive layout

### Required before a hosted MVP launch

The implementation roadmap includes:

- Accounts and verified login
- Secure session handling
- Role-based authorization
- Server-side campaign validation
- A database and migrations
- One-submission-per-participant constraints
- Campaign publication and state transitions
- Private, creator-only, or public result visibility controls
- Written-response support with appropriate privacy
- Media upload validation and storage
- Reporting and moderation
- Notification preferences
- Audit and moderation records
- Backup and restore procedures
- Production monitoring

### Deferred

- Arbitrary custom calculation code
- Weighted composite rankings
- Real-time presence or updates
- Invited-only cohorts
- Participant caps
- Sophisticated personalization
- Automated AI summaries
- Public leaderboards
- Native mobile applications
- External market-data integrations

## Roadmap

The recommended delivery sequence is:

1. **Product decisions**
   - Confirm the launch audience and account policy
   - Define result visibility and privacy rules
   - Approve moderation responsibilities

2. **Application foundation**
   - Add authentication and secure sessions
   - Establish the database and migrations
   - Add logging and environment management

3. **Campaign authoring and discovery**
   - Replace browser state with server-backed campaigns
   - Add publication and scheduling
   - Add validated media support

4. **Participation and integrity**
   - Enforce eligibility and campaign state
   - Validate submissions on the server
   - Prevent duplicate contributions
   - Support submission edits and closure rules

5. **Results and reflection**
   - Reproduce aggregates from stored answers
   - Add qualifying sample sizes
   - Present contrasting responses and contextual summaries

6. **Moderation and launch**
   - Add reports, moderation actions, and audit trails
   - Complete accessibility and privacy checks
   - Establish backups, alerts, rate limits, and incident procedures

## Non-functional requirements

### Performance

- Campaign discovery and search should respond quickly
- Submission writes should fail safely rather than partially persist
- Media uploads should show validation and progress feedback

### Reliability

- Campaign state changes must be consistent
- Submissions must remain tied to the correct campaign version
- Aggregates must be reproducible from stored answers
- Sensitive actions must be auditable

### Security

- Passwords must never be stored in plaintext
- Uploaded media must be size-, format-, and content-validated
- Server-side authorization must cover every write
- CSRF, XSS, SQL injection, and access-control risks must be addressed
- Secrets must remain outside source control

### Privacy

- Written response visibility must be explained before submission
- Account and submission retention rules must be documented
- Reporting and deletion controls must be available
- Sensitive actions should be logged without unnecessary personal data

### Accessibility

- Core workflows must support keyboard navigation
- Focus states must remain visible
- Labels and validation must be understandable
- Layouts must remain usable on mobile and desktop
- Automated checks must be supplemented by manual review

### Observability

Production hosting should include:

- Structured application logs
- Submission and campaign-state error telemetry
- Upload failure monitoring
- Uptime checks
- Backup verification
- Alert and incident procedures

## Success measures

Success should be measured through learning and participation quality, not revenue or commerce.

Useful measures include:

- Participants reporting that they gained a new perspective
- Campaign completion with a meaningful result summary
- Range and depth of participating viewpoints
- Reasoned or reflective contributions
- Return visits to relevant campaigns
- Clarity of campaign criteria
- Confidence in how responses are displayed and used
- Submission reliability
- Moderator response quality
- Perceived safety and respect

No single metric should be interpreted as proof that insight was created.

## Limitations

The current prototype:

- Stores all changes in the browser
- Does not synchronize data across devices
- Does not authenticate users
- Does not enforce server-side campaign rules
- Does not upload or process real media
- Does not send notifications
- Does not provide moderation or reporting
- Does not verify campaign eligibility
- Uses fixed starter artwork for campaign types
- Presents local sample distributions as prototype data

These limitations should be clearly communicated wherever the prototype is demonstrated.

## Contributing

Before a contribution:

1. Read [description.md](./description.md) for product requirements.
2. Read [web-app-plan.md](./web-app-plan.md) for roadmap and system boundaries.
3. Preserve the non-commercial guardrails.
4. Keep campaign rules server-authoritative in hosted implementations.
5. Keep subjective results contextual and avoid false precision.
6. Add tests for campaign state, submission validation, and aggregation before backend implementation.

Recommended future test coverage:

- Unit tests for campaign state transitions
- Unit tests for criteria validation
- Unit tests for distribution aggregation
- Integration tests for publishing and submissions
- End-to-end tests for the creator, participant, and moderator journeys
- Accessibility checks for dialogs and forms
- Backup and restore rehearsals

## License

See [LICENSE](./LICENSE) for the repository license terms.
