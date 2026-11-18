"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type Artwork,
  type Campaign,
  initialCampaigns,
} from "@/lib/campaigns";

type StoredData = {
  campaigns: Campaign[];
  respondedIds: string[];
};

const STORAGE_KEY = "valdiscov-field-notes-v1";
const categories = ["All inquiries", "Material life", "Everyday rituals", "Ways of seeing"];

function isStoredData(value: unknown): value is StoredData {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<StoredData>;
  return Array.isArray(data.campaigns) && Array.isArray(data.respondedIds);
}

function Illustration({ artwork }: { artwork: Artwork }) {
  return (
    <div className={`artwork artwork-${artwork}`} aria-hidden="true">
      {artwork === "chair" && (
        <svg viewBox="0 0 360 300" fill="none">
          <path d="M111 67h133v90H111z" fill="#D6C93D" />
          <path d="M123 156h109l18 94h-11l-23-73h-77l-20 73h-11z" fill="#286C78" />
          <path d="M133 174h89" stroke="#AFC5C2" strokeWidth="5" />
          <path d="M129 82v66m95-66v66" stroke="#D44B35" strokeWidth="5" />
          <path d="m113 199-24 13m143-13 25 12" stroke="#40516D" strokeWidth="3" />
          <circle cx="137" cy="111" r="3" fill="#19243A" />
          <path d="M270 65c14 17 20 33 16 49m-9-27 12 4" stroke="#D44B35" strokeWidth="3" />
        </svg>
      )}
      {artwork === "notebook" && (
        <svg viewBox="0 0 360 300" fill="none">
          <path d="m94 74 152-20 28 171-154 23z" fill="#D44B35" />
          <path d="m112 82 126-17 22 149-127 17z" fill="#F2F1E9" />
          <path d="m134 101 81-11m-77 31 88-12m-84 33 89-12m-85 33 72-10" stroke="#777B70" strokeWidth="2" />
          <path d="m109 83 21 148m-17-147 20 147" stroke="#9E3428" strokeWidth="3" />
          <path d="M207 197c8-12 15-17 25-18" stroke="#286C78" strokeWidth="3" />
          <circle cx="256" cy="96" r="18" fill="#D6C93D" />
        </svg>
      )}
      {artwork === "window" && (
        <svg viewBox="0 0 360 300" fill="none">
          <path d="M69 45h222v206H69z" fill="#C8D1C5" />
          <path d="M88 64h184v168H88z" fill="#E0A37B" />
          <path d="M181 64v168M88 148h184" stroke="#F5F1DD" strokeWidth="8" />
          <path d="M92 68h85v76H92z" fill="#286C78" />
          <path d="M186 68h82v76h-82z" fill="#D6C93D" />
          <path d="M92 153h85v75H92z" fill="#40516D" />
          <path d="M186 153h82v75h-82z" fill="#D44B35" />
          <path d="M64 251h232" stroke="#19243A" strokeWidth="4" />
          <path d="M114 51c18-14 40-20 64-20m61 224c16-8 29-20 40-38" stroke="#286C78" strokeWidth="3" />
        </svg>
      )}
      {artwork === "custom" && (
        <svg viewBox="0 0 360 300" fill="none">
          <path d="M80 76h200v148H80z" fill="#E6E5DA" />
          <circle cx="180" cy="148" r="58" fill="#40516D" />
          <path d="M180 96c26 21 39 38 39 53s-13 31-39 51c-26-20-39-36-39-51s13-32 39-53Z" fill="#D6C93D" />
          <path d="M64 238h232" stroke="#286C78" strokeWidth="3" />
        </svg>
      )}
      <span className="artwork-index">{artwork === "custom" ? "NEW FIELD NOTE" : "OBSERVATION No."}</span>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-heading">
          <p className="eyebrow">FIELD NOTE / VALDISCOV</p>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <h2 id="modal-title" className="visually-hidden">{title}</h2>
        {children}
      </section>
    </div>
  );
}

function ResultBars({ distribution }: { distribution: number[] }) {
  const total = distribution.reduce((sum, count) => sum + count, 0);
  if (!total) return <p className="quiet-note">No perspectives yet. You could be the first.</p>;
  const average =
    distribution.reduce((sum, count, index) => sum + count * (index + 1), 0) / total;
  return (
    <div className="result-chart">
      <div className="result-chart-top">
        <span>Shared perspectives</span>
        <span>{average.toFixed(1)} <small>/ 5</small></span>
      </div>
      <div className="bar-set" aria-label={`${total} responses, average ${average.toFixed(1)} out of 5`}>
        {distribution.map((count, index) => (
          <div className="bar-column" key={index} title={`${index + 1} out of 5: ${count} responses`}>
            <span className="bar-count">{count || ""}</span>
            <span className="bar-track">
              <span className="bar-fill" style={{ height: `${Math.max(3, (count / Math.max(...distribution)) * 100)}%` }} />
            </span>
            <span className="bar-label">{index + 1}</span>
          </div>
        ))}
      </div>
      <p className="chart-caption">A range of views, not a verdict · {total} responses</p>
    </div>
  );
}

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [respondedIds, setRespondedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All inquiries");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [storageIssue, setStorageIssue] = useState("");
  const [notice, setNotice] = useState("");
  const [dimensionValues, setDimensionValues] = useState<Record<string, number>>({});

  const selectedCampaign = campaigns.find((campaign) => campaign.id === selectedId) ?? null;
  const visibleCampaigns = useMemo(() => {
    const query = search.trim().toLowerCase();
    return campaigns.filter((campaign) => {
      const matchesCategory = activeFilter === "All inquiries" || campaign.category === activeFilter;
      const matchesSearch =
        !query ||
        `${campaign.title} ${campaign.deck} ${campaign.category} ${campaign.context}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, campaigns, search]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (!isStoredData(parsed)) throw new Error("Saved field notes have an unexpected format.");
        const savedIds = new Set(parsed.campaigns.map((campaign) => campaign.id));
        const missingSamples = initialCampaigns.filter((campaign) => !savedIds.has(campaign.id));
        setCampaigns([...parsed.campaigns, ...missingSamples]);
        setRespondedIds(parsed.respondedIds);
      }
    } catch (error) {
      console.error("Could not restore ValDiscov's saved field notes.", error);
      setStorageIssue("Your saved field notes could not be restored. This session is still available, but changes may not persist.");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ campaigns, respondedIds }));
    } catch (error) {
      console.error("Could not save ValDiscov's field notes.", error);
      setStorageIssue("Changes could not be saved in this browser. You can continue, but they may not persist.");
    }
  }, [campaigns, hydrated, respondedIds]);

  const closeModals = () => {
    setSelectedId(null);
    setIsCreating(false);
  };

  function submitPerspective(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCampaign || respondedIds.includes(selectedCampaign.id)) return;
    const form = new FormData(event.currentTarget);
    const scores = selectedCampaign.dimensions.map((dimension, index) => {
      const value = Number(form.get(`dimension-${index}`));
      return Number.isInteger(value) && value >= 1 && value <= 5 ? value : 3;
    });
    setCampaigns((current) =>
      current.map((campaign) => {
        if (campaign.id !== selectedCampaign.id) return campaign;
        const dimensions = campaign.dimensions.map((dimension, index) => {
          const distribution = [...dimension.distribution];
          distribution[scores[index] - 1] = (distribution[scores[index] - 1] ?? 0) + 1;
          return { ...dimension, distribution };
        });
        return { ...campaign, contributors: campaign.contributors + 1, dimensions };
      }),
    );
    setRespondedIds((current) => [...current, selectedCampaign.id]);
    setNotice("Your perspective has been added. Thank you for taking a moment to look again.");
  }

  function createCampaign(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const context = String(form.get("context") ?? "").trim();
    const category = String(form.get("category") ?? "Everyday rituals");
    const dimensions = String(form.get("dimensions") ?? "")
      .split("\n")
      .map((label) => label.trim())
      .filter(Boolean)
      .slice(0, 4)
      .map((label) => ({ label, distribution: [0, 0, 0, 0, 0] }));
    if (!title || !context || dimensions.length === 0) return;

    const campaign: Campaign = {
      id: `note-${Date.now()}`,
      number: String(campaigns.length + 1).padStart(2, "0"),
      title,
      deck: "A new question for the field",
      context,
      category,
      closes: "Open inquiry",
      contributors: 0,
      owner: "You",
      artwork: "custom",
      dimensions,
      reflection: "This inquiry is just beginning. The first perspectives will shape what we notice.",
    };
    setCampaigns((current) => [campaign, ...current]);
    setIsCreating(false);
    setActiveFilter("All inquiries");
    setSearch("");
    setNotice("Your inquiry is now part of the collection.");
    setSelectedId(campaign.id);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="ValDiscov home">
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>VAL<span className="wordmark-slash">/</span>DISCOV</span>
        </a>
        <p className="header-note">An open field guide to what matters</p>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#inquiries">The inquiries</a>
          <a href="#about">Our approach</a>
          <button className="button button-dark header-cta" onClick={() => setIsCreating(true)}>
            Begin an inquiry <span aria-hidden="true">↗</span>
          </button>
        </nav>
      </header>

      {storageIssue && <p className="storage-message" role="status">{storageIssue}</p>}
      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button type="button" aria-label="Dismiss message" onClick={() => setNotice("")}>×</button>
        </div>
      )}

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> OPEN COLLECTION <span className="eyebrow-rule" /> VOL. 01 / 2026</p>
          <h1 id="hero-title">What makes<br />something <em>matter?</em></h1>
          <p className="hero-description">
            Value isn’t one number. It’s a thousand small reckonings—use, memory, beauty, belonging.
            We make room for all of them.
          </p>
          <a className="text-link" href="#inquiries">Explore the open inquiries <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art-wrap">
          <div className="hero-art-label"><span>PLATE 001</span><span>THE EVERYDAY, RE-EXAMINED</span></div>
          <Illustration artwork="chair" />
          <div className="hero-art-caption">
            <span>Object study</span>
            <span>Care leaves a trace.</span>
          </div>
          <span className="hero-orbit orbit-one" aria-hidden="true" />
          <span className="hero-orbit orbit-two" aria-hidden="true" />
        </div>
        <div className="hero-index" aria-hidden="true">01</div>
      </section>

      <section className="ticker" aria-label="Collection summary">
        <p><span>03</span> open inquiries</p>
        <span className="ticker-divider" aria-hidden="true">✳</span>
        <p><span>{campaigns.reduce((sum, campaign) => sum + campaign.contributors, 0)}</span> perspectives shared</p>
        <span className="ticker-divider" aria-hidden="true">✳</span>
        <p>Nothing for sale. <span>Everything to notice.</span></p>
      </section>

      <section className="inquiries-section" id="inquiries">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COMMONPLACE, MADE UNCOMMON</p>
            <h2>Open inquiries<span className="heading-period">.</span></h2>
          </div>
          <p className="section-intro">Each inquiry begins with a thing worth looking at twice.<br />Your perspective is part of the record.</p>
        </div>
        <div className="collection-tools">
          <div className="filter-list" aria-label="Filter inquiries">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={`filter-button${activeFilter === category ? " is-active" : ""}`}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="search-field">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="visually-hidden">Search inquiries</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a thread..." />
            <kbd>/</kbd>
          </label>
        </div>

        <div className="campaign-list">
          {visibleCampaigns.map((campaign) => (
            <article className="campaign-row" key={campaign.id}>
              <button
                type="button"
                className={`campaign-image campaign-image-${campaign.artwork}`}
                onClick={() => setSelectedId(campaign.id)}
                aria-label={`Read inquiry: ${campaign.title}`}
              >
                <Illustration artwork={campaign.artwork} />
                <span className="image-open" aria-hidden="true">↗</span>
              </button>
              <div className="campaign-number">{campaign.number}<span> / NOTE</span></div>
              <div className="campaign-copy">
                <p className="campaign-category">{campaign.category}</p>
                <button type="button" className="campaign-title" onClick={() => setSelectedId(campaign.id)}>
                  {campaign.title}
                </button>
                <p className="campaign-deck">{campaign.deck}</p>
              </div>
              <div className="campaign-meta">
                <span className="response-count">{campaign.contributors} <span>perspectives</span></span>
                <span className="closing-note"><span className="live-dot" /> {campaign.closes}</span>
              </div>
              <button className="row-arrow" type="button" aria-label={`Open ${campaign.title}`} onClick={() => setSelectedId(campaign.id)}>↗</button>
            </article>
          ))}
          {visibleCampaigns.length === 0 && (
            <div className="empty-state">
              <span aria-hidden="true">∅</span>
              <p>No inquiries in this corner of the collection yet.</p>
              <button className="text-link" onClick={() => { setActiveFilter("All inquiries"); setSearch(""); }}>Return to the whole collection <span aria-hidden="true">→</span></button>
            </div>
          )}
        </div>
        <p className="list-footnote"><span>↳</span> A small collection, kept deliberately open.</p>
      </section>

      <section className="approach-section" id="about">
        <div className="approach-mark" aria-hidden="true">∿</div>
        <div className="approach-copy">
          <p className="eyebrow">A NOTE ON HOW WE LOOK</p>
          <h2>Not a verdict.<br /><em>A way of seeing.</em></h2>
          <p>
            ValDiscov is a place to compare how people make meaning. There are no right answers to collect,
            no prizes to win, and nothing to buy. Just better questions—and the surprise of seeing through
            someone else&apos;s eyes.
          </p>
          <div className="approach-signoff"><span>Keep looking,</span><span className="signoff-rule" /><span>The ValDiscov field notes</span></div>
        </div>
        <div className="approach-stamp"><span>EST.</span><strong>2026</strong><span>FOR THE<br />CURIOUS</span></div>
      </section>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#" aria-label="ValDiscov home">
          <span className="wordmark-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>VAL<span className="wordmark-slash">/</span>DISCOV</span>
        </a>
        <p>A living collection of ways to see.</p>
        <a href="#hero-title">Back to the beginning ↑</a>
        <span className="footer-issue">FIELD NOTES · 2026</span>
      </footer>

      {selectedCampaign && (
        <Modal title={selectedCampaign.title} onClose={closeModals}>
          <div className="detail-topline">
            <span>{selectedCampaign.number} / {selectedCampaign.category}</span>
            <span>{selectedCampaign.contributors} perspectives</span>
          </div>
          <div className="detail-art"><Illustration artwork={selectedCampaign.artwork} /></div>
          <h2 className="detail-title">{selectedCampaign.title}</h2>
          <p className="detail-deck">{selectedCampaign.deck}</p>
          <p className="detail-context">{selectedCampaign.context}</p>
          <div className="detail-owner">AN INQUIRY BY <strong>{selectedCampaign.owner}</strong> <span>·</span> {selectedCampaign.closes}</div>
          <div className="detail-rule" />
          {respondedIds.includes(selectedCampaign.id) ? (
            <div className="thanks-panel">
              <p className="eyebrow">YOUR PERSPECTIVE IS IN THE RECORD</p>
              <p>Thank you. Here&apos;s how this small collection of views is taking shape.</p>
            </div>
          ) : (
            <form className="response-form" onSubmit={submitPerspective}>
              <div className="response-heading">
                <div><p className="eyebrow">ADD YOUR PERSPECTIVE</p><h3>There&apos;s no wrong way to look.</h3></div>
                <span className="scale-note">1 = not at all · 5 = very much</span>
              </div>
              {selectedCampaign.dimensions.map((dimension, index) => (
                <fieldset className="dimension-field" key={dimension.label}>
                  <legend>{dimension.label}</legend>
                  <div className="scale-options">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="scale-option">
                        <input
                          type="radio"
                          name={`dimension-${index}`}
                          value={value}
                          required
                          checked={(dimensionValues[`${selectedCampaign.id}-${index}`] ?? 0) === value}
                          onChange={() => setDimensionValues((current) => ({ ...current, [`${selectedCampaign.id}-${index}`]: value }))}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button className="button button-dark submit-perspective" type="submit">Add my perspective <span aria-hidden="true">↗</span></button>
              <p className="privacy-note">Your response joins an aggregate. We don&apos;t rank people or perspectives.</p>
            </form>
          )}
          <div className="results-block">
            <div className="results-heading"><p className="eyebrow">THE SHARED VIEW</p><span>Not a verdict</span></div>
            <p className="reflection-note">“{selectedCampaign.reflection}”</p>
            {selectedCampaign.dimensions.map((dimension) => (
              <div className="result-dimension" key={dimension.label}>
                <p>{dimension.label}</p>
                <ResultBars distribution={dimension.distribution} />
              </div>
            ))}
          </div>
          <p className="prototype-note">Local preview · contributions on this device only</p>
        </Modal>
      )}

      {isCreating && (
        <Modal title="Begin an inquiry" onClose={closeModals}>
          <div className="create-intro">
            <p className="eyebrow">START WITH A QUESTION</p>
            <h2>What would you like<br />to look at <em>together?</em></h2>
            <p>No need to find the answer. Make a little room for more ways of seeing.</p>
          </div>
          <form className="create-form" onSubmit={createCampaign}>
            <label>
              <span>Give your inquiry a name</span>
              <input name="title" placeholder="A small thing, seen again" minLength={4} maxLength={70} required />
            </label>
            <label>
              <span>What are we looking at?</span>
              <textarea name="context" placeholder="Offer a little context. What made you pause?" minLength={20} maxLength={500} required rows={3} />
            </label>
            <label>
              <span>Where does this question live?</span>
              <select name="category" defaultValue="Everyday rituals">
                <option>Material life</option>
                <option>Everyday rituals</option>
                <option>Ways of seeing</option>
              </select>
            </label>
            <label>
              <span>What should people consider?</span>
              <textarea name="dimensions" placeholder={"Still useful\nFeels meaningful\nWorth keeping"} required rows={3} />
              <small>One dimension per line, up to four. Responses use a simple 1–5 scale.</small>
            </label>
            <div className="create-boundary">Keep it curious: no transactions, prizes, or right answers.</div>
            <button type="submit" className="button button-dark create-submit">Publish this inquiry <span aria-hidden="true">↗</span></button>
          </form>
          <p className="prototype-note">This preview saves to this browser only. Accounts and publishing review are not connected yet.</p>
        </Modal>
      )}
    </main>
  );
}
