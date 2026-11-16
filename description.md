# ValDiscov - Requirements Specification

## 1. Product Vision
ValDiscov is a platform for discovering the value of anything in terms of anything that the campaign initiator defines. It is not limited to monetary price alone. The platform allows a campaign initiator to define the subject of evaluation and the specific criteria for judging it, such as price, quality, rarity, usefulness, desirability, condition, sentiment, social value, personal meaning, novelty, or any custom metric relevant to the campaign.

The platform exists to create insight, exploration, and new possibilities. It is not a marketplace and does not provide financial incentives or facilitate monetary transactions. It helps people understand how different communities interpret value, how judgments differ across perspectives, and what new possibilities emerge through comparing those perspectives.

## 2. Why People Will Participate
Participants must gain something meaningful and intellectually rewarding without any monetary incentive. The system must provide emotional, intellectual, social, and exploratory value. People will participate because the platform offers them:
- insight: a deeper understanding of how value is assigned in different contexts,
- exploration: the ability to test assumptions, compare perspectives, and challenge conventional thinking,
- self-expression: the chance to share personal judgment, taste, and reasoning,
- learning: exposure to different interpretations of value across communities and domains,
- curiosity: the experience of discovering unexpected patterns, trends, and possibilities,
- community: belonging to a group focused on exploration and meaning-making rather than commerce,
- intellectual reward: recognition for thoughtful, creative, or insightful contributions.

Participation should feel like a meaningful act of discovery, not a transaction. The platform exists to expand understanding and possibility, not to generate financial return.

## 3. Product Objectives
The objective is to create a non-commercial, engaging platform for value discovery where:
- the platform exists for exploration, insight, and possibility, not to earn money or generate profit,
- no user motivation, platform feature, or success measure depends on monetary reward or revenue,
- a campaign initiator can define what is being evaluated and how value should be judged,
- participants can respond using the initiator's pre-defined criteria,
- different types of value are captured beyond just price,
- contributions create a social and community-led valuation process,
- users are encouraged to participate because the platform focuses on insight generation, exploration, comparison, and intellectual engagement,
- the system helps people uncover patterns, possibilities, and hidden interpretations of value.

## 4. User Value Proposition and Motivation
The platform must create a clear and compelling reason for the public to participate without any monetary incentive. The value proposition is philosophical, intellectual, emotional, and social.

Users should feel that by participating they gain:
- deeper insight into how value is shaped by context,
- a way to explore possibilities and question assumptions,
- social recognition for thoughtful and creative judgment,
- a sense of involvement in a meaningful intellectual community,
- the enjoyment of comparing perspectives and discovering patterns,
- personal learning through exposure to diverse interpretations,
- a feeling of contribution to a larger inquiry about meaning, possibility, and human judgment.

The system must not use money, prizes with monetary value, or financial status as motivation or reward. It should recognize curiosity, exploration, reflection, and thoughtful participation through non-monetary means. The platform should celebrate insight and possibility, not transactions.

## 5. Non-Monetized Engagement Model
ValDiscov must give participants a satisfying experience even when they receive no material reward. Each campaign should help a participant move through a meaningful discovery loop:
1. **Curiosity:** encounter an interesting question, subject, or perspective.
2. **Contribution:** make a judgment, explain reasoning, or offer a new interpretation using the campaign's criteria.
3. **Comparison:** see how their view relates to a diverse range of other contributions.
4. **Insight:** discover patterns, disagreements, context, or unexpected interpretations.
5. **Reflection:** understand what they learned or how their thinking changed.
6. **Further exploration:** follow a related question, campaign, or line of inquiry.

Campaign results should do more than display a single winning answer or average score. Where appropriate, they should show distributions, contrasting viewpoints, recurring themes, outliers, and participant explanations. Results must avoid presenting subjective or exploratory judgments as objectively correct.

Non-monetary forms of recognition may include attribution, appreciation, contribution history, or optional badges for participation and thoughtful contribution. Recognition must not become a cash equivalent, paid advantage, or high-pressure competition. Leaderboards must be optional and designed carefully so they do not imply that one perspective is universally correct.

### User Value Goals
- **Before participating:** the user can quickly understand the campaign question, criteria, and what they can explore.
- **During participation:** the user can express a considered view without needing specialist knowledge or making a purchase.
- **After participating:** the user can access a useful result or reflection that reveals how their view compares with others and what may be learned.
- **Over time:** the user can revisit their contributions, follow emerging questions, and recognize how their own perspectives develop.

### Engagement Success Measures
Success should be evaluated by the quality and usefulness of the experience, not revenue, transaction volume, or time spent alone. The platform should assess:
- whether participants report learning something or gaining a new perspective,
- whether campaign results help users understand patterns and differences in responses,
- the proportion of campaigns that produce a meaningful result summary,
- whether users return to explore or contribute to relevant questions,
- whether participation includes a range of perspectives and reasoned contributions,
- whether users feel respected, safe, and free from pressure to compete.

These measures should be interpreted with user feedback and campaign context; no single engagement metric should be treated as proof that insight was created.

## 6. Key Stakeholders
- Campaign Initiator: defines the campaign, uploads the subject, sets evaluation criteria, and decides the rules of participation.
- Registered Users: browse campaigns, submit responses, ratings, votes, or reflections, and participate in community exploration.
- Guests: can browse public campaigns but need registration to participate in submitted evaluations.
- Admin/Moderator: monitors campaigns, reviews submissions, enforces rules, and handles complaints or suspicious activity.
- System/Platform: manages authentication, media, calculations, notifications, analytics, and data integrity.
- Insight Seekers / Explorers: users motivated by curiosity, discovery, learning, and understanding value in non-traditional ways.

## 7. Core Idea
The system must support a campaign-driven valuation model in which the campaign initiator defines:
- the item, object, idea, asset, or concept to be evaluated,
- the context for evaluation,
- the accepted criteria or dimensions of value,
- the method of submission and calculation,
- the duration and closing rules.

Price is only one possible criterion. The system must support broader evaluation frameworks.

## 8. Required Functional Scope

### 8.1 Campaign Initiator Features
#### FR-01: Create a campaign
The campaign initiator must be able to:
- upload an image or media file representing the subject,
- provide a title, description, and campaign context,
- define the subject being evaluated,
- specify the evaluation criteria (for example: price, quality, beauty, utility, rarity, sentiment, condition, social value, custom metric),
- set the campaign type (prediction, vote, ranking, score, reflection, or custom response),
- define campaign start and end dates,
- publish or save the campaign as draft.

#### FR-02: Define value dimensions
The initiator must be able to:
- create one or multiple value dimensions,
- assign unit or scale for each dimension,
- set weights if some criteria are more important than others,
- use predefined criteria or create custom ones,
- allow participants to judge based on numerical values, ranking, rating, yes/no, or free-text rationale.

#### FR-03: Publish a campaign and control participation
The initiator must be able to:
- publish campaigns after review,
- decide which forms of contribution are allowed, such as comments, ratings, rankings, or written reflection,
- set eligibility rules (registered users only, limited participants, invited users),
- close or extend a campaign,
- view participation statistics and result summaries.

#### FR-04: Review and finalize campaign outcomes
The initiator must be able to:
- review all responses submitted by participants,
- view aggregated results by criteria,
- identify meaningful patterns, contrasting perspectives, or outcomes,
- finalize the campaign and publish a result summary,
- archive ended campaigns for future reference.

### 8.2 User Participation Features
#### FR-05: User registration and authentication
The system must support:
- user sign up and login,
- secure password storage,
- role-based access control,
- session handling and account verification.

#### FR-06: Browse and discover campaigns
Users must be able to:
- browse active campaigns,
- search campaigns by keywords, category, and creator,
- filter by campaign type, date, or participation status,
- view campaign description, media, and rules.

#### FR-07: Submit value signals based on campaign rules
Users must be able to:
- contribute according to the specific campaign criteria,
- estimate or assess a monetary price only when the campaign explicitly asks about price as a topic of exploration; this must not create a transaction or financial incentive,
- submit scores, ratings, rankings, or other forms if the campaign uses non-price dimensions,
- enter comments or explanations when allowed,
- edit or update a submission before the campaign closes if the rules permit.

#### FR-08: Participate in community valuation experiments
Users must be able to:
- upload their own image or object for a valuation campaign,
- create trials or experiments using their own evaluation criteria,
- invite others to participate,
- view aggregated community feedback,
- compare multiple interpretations of value.

#### FR-09: Community engagement and retention
The platform must support engagement tools such as:
- optional recognition for thoughtful or useful contributions, without treating subjective judgments as objectively right or wrong,
- optional badges for participation milestones,
- notifications for campaign activity,
- personalization of followed campaigns or categories,
- community discussion around interpretation of value.

### 8.3 Shared System Features
#### FR-10: Media handling
The system must support:
- image and file upload in common formats,
- preview generation and thumbnails,
- validation of file size and type,
- optional compression and image optimization.

#### FR-11: Notifications and alerts
The system must notify users about:
- new or relevant campaigns,
- responses received,
- campaign closings,
- updates to campaign activity or results,
- results published by the initiator,
- admin moderation decisions.

#### FR-12: Audit and transparency
The system must maintain:
- campaign creation and modification logs,
- user submissions and timestamps,
- decision rules used in each campaign,
- admin or moderator actions,
- final result history and archived campaigns.

#### FR-13: Calculation and aggregation engine
The system must support:
- aggregation of participant responses,
- weighted scoring when criteria have different importance,
- ranking and summary calculations,
- custom evaluation logic depending on campaign type,
- display of final analysis in a simple user-friendly format.

## 9. Business Rules and Logic
- A campaign initiator defines the evaluation framework; the system must not force price-only valuation.
- A campaign may explore price as a topic, or evaluate quality, utility, rarity, desirability, sentiment, custom metrics, or any combination; it must never facilitate buying, selling, payment, or monetary rewards.
- Each campaign must define the criteria, rules, and accepted response types before publication.
- A campaign can be based on ratings, votes, rankings, comments, objective scores, reflective responses, or custom submissions.
- Only eligible users may participate in a given campaign.
- Submission validation must ensure a response matches the campaign's specified format and rules.
- Campaigns must be closed according to the initiator-defined schedule or manual closure.
- Final results must be traceable to the campaign's defined evaluation criteria.
- System must support both quantitative and qualitative assessment methods.

## 10. Value Dimensions Supported by the Platform
The platform must support value discovery across multiple dimensions, including but not limited to:
- monetary price
- perceived quality
- rarity or scarcity
- utility or usefulness
- emotional or aesthetic value
- social or cultural value
- condition or status
- symbolic or personal significance
- custom initiative-defined metrics

This means the platform must not assume that value is always measured in currency. It must allow value to be decided by the campaign initiator as described in the campaign setup.

## 11. Functional Use Cases
### Use Case 1: Campaign initiator defines a custom valuation campaign
1. Initiator logs in.
2. Initiator uploads an image or object reference.
3. Initiator defines the subject and description.
4. Initiator chooses evaluation criteria such as price, rarity, quality, and utility.
5. Initiator sets participation rules and campaign duration.
6. Campaign is published and visible to users.

### Use Case 2: Users contribute evaluations according to custom criteria
1. User logs in.
2. User opens an active campaign.
3. User provides answers based on the defined criteria.
4. User submits a score, ranking, reflection, or other response depending on campaign type.
5. System validates the submission and stores it.
6. User sees updated campaign activity and results.

### Use Case 3: User creates a campaign with non-price evaluation
1. User logs in.
2. User uploads an image and defines a subject.
3. User decides that value should be assessed on beauty, quality, or social relevance instead of price.
4. User creates custom criteria and publishes the campaign.
5. Other users participate in the valuation process.
6. Results are aggregated using the selected evaluation model.

### Use Case 4: Initiator finalizes a campaign
1. Initiator reviews participant submissions.
2. Initiator sees aggregate results across defined criteria.
3. Initiator decides the campaign result or closes the campaign.
4. System publishes final outcome and notifies participants.

## 12. Non-Functional Requirements
### NFR-01: Performance
The platform must provide responsive experiences for:
- campaign listing and search,
- submission of evaluations,
- live result updates when supported,
- media upload and preview generation.

### NFR-02: Scalability
The platform must support growth in:
- users,
- campaigns,
- submissions,
- media files,
- complex aggregation logic.

### NFR-03: Availability
The platform should be available with high uptime for active campaigns and voting periods.

### NFR-04: Reliability and Data Integrity
The system must ensure:
- every submission is recorded accurately,
- aggregation is based on the correct campaign rules,
- sensitive actions are auditable,
- campaign states remain consistent across open, closed, and archived phases.

### NFR-05: Security
The system must protect:
- user accounts and access,
- media files and uploaded content,
- campaign configuration and final results,
- against common web attacks such as SQL injection, XSS, CSRF, and unauthorized access.

### NFR-06: Usability
The platform must be intuitive enough for both initiators and users to:
- create campaigns,
- participate without confusion,
- understand evaluation criteria,
- interpret aggregated results clearly.

### NFR-07: Maintainability
The system should be modular so that adding new evaluation types, scoring engines, or campaign templates does not disrupt existing functionality.

### NFR-08: Observability and Monitoring
The system must support logging and monitoring for:
- upload failures,
- submission errors,
- campaign closures,
- application performance and user activity trends.

### NFR-09: Privacy and Compliance
The platform must preserve user privacy, support consent and data retention requirements, and protect personal information used in user profiles and submissions.

### NFR-10: Accessibility
The interface should support accessible workflows for:
- campaign creation,
- media upload,
- submission of evaluations,
- result viewing for all users including those using assistive technologies.

## 13. Acceptance Criteria
- A campaign initiator can create a campaign and define what is being evaluated.
- The initiator can define any custom set of value criteria; price is optional rather than mandatory.
- Users can submit scores, votes, rankings, reflections, or other non-transactional responses based on the campaign's rules.
- The system stores submissions and aggregation results correctly.
- Results can be displayed by campaign-defined criteria.
- The platform may explore monetary price as a subject, but does not support transactions, financial rewards, or monetary incentives.
- Participants can access campaign outcomes that help them compare perspectives and gain insight rather than simply select a winner.
- Moderation and campaign closure are supported.

## 14. Scope Boundaries
### In Scope
- Campaign creation and publishing
- Custom criteria definition
- User submissions based on campaign rules
- Aggregation and final results
- Insight-oriented result summaries and reflection
- Media upload and moderation
- Community engagement and notifications

### Out of Scope for Initial Version
- Buying, selling, payment processing, financial settlement, cash prizes, and monetary rewards
- Revenue-generating features such as advertising, paid access, subscriptions, or paid campaign promotion
- Complex AI-based valuation models
- Commercial bidding, auctions, or other transaction functionality
- External market data integration for some value dimensions
- Full mobile app development beyond responsive web

## 15. Recommended MVP Priorities
1. Campaign creation with image upload
2. Custom criteria definition by initiator
3. Flexible non-transactional submission types
4. Aggregation and insight-oriented result summaries
5. Community participation and relevant notifications
6. Campaign moderation and closure
7. Reflection, contribution history, and optional non-monetary recognition

## 16. Final Interpretation
ValDiscov is a non-commercial, campaign-driven exploration platform. The campaign initiator defines the subject and the dimensions through which it will be explored; participants contribute perspectives and receive insight through comparison, reflection, and discovery. Price may be discussed as one possible subject or dimension, but the platform must never facilitate monetary transactions or use money as a motivation. Its success is measured by the understanding and possibilities it helps people discover.