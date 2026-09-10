// src/components/preact/Dashboard.jsx
import { useState, useEffect } from 'preact/hooks';

const DIAGNOSTIC_INSIGHTS = [
  {
    id: 1,
    title: "Fix the Path Before Adding Traffic",
    text: "Improving acquisition is unlikely to be the first priority if new traffic is still reaching a weak conversion path.",
    badgeColor: "var(--color-primary)",
    icon: "path"
  },
  {
    id: 2,
    title: "Look Beyond Lead Volume",
    text: "More leads may not solve the problem when follow-up and lifecycle marketing are underdeveloped.",
    badgeColor: "var(--color-secondary)",
    icon: "journey"
  },
  {
    id: 3,
    title: "Build the Foundation First",
    text: "Channel expansion usually makes more sense after the core offer and conversion journey are working clearly.",
    badgeColor: "var(--color-accent-teal)",
    icon: "foundation"
  },
  {
    id: 4,
    title: "Evaluate the Whole System",
    text: "Marketing problems often span multiple systems, so individual tactics should be evaluated in context.",
    badgeColor: "#8b5cf6",
    icon: "system"
  }
];

const GROWTH_FOUNDATION = [
  {
    name: "Positioning",
    status: "Needs Attention",
    tone: "attention",
    observation: "Primary offer is difficult to understand quickly."
  },
  {
    name: "Acquisition",
    status: "Opportunity",
    tone: "opportunity",
    observation: "Acquisition relies too heavily on a limited set of channels."
  },
  {
    name: "Conversion",
    status: "Needs Attention",
    tone: "attention",
    observation: "Paid traffic reaches a conversion path with unnecessary friction."
  }
];

const CUSTOMER_SYSTEM = [
  {
    name: "Follow-Up",
    status: "Needs Attention",
    tone: "attention",
    observation: "Lead follow-up ends too early in the customer journey."
  },
  {
    name: "Retention",
    status: "Opportunity",
    tone: "opportunity",
    observation: "Repeat-purchase and lifecycle opportunities are underdeveloped."
  },
  {
    name: "Measurement",
    status: "Strong",
    tone: "strong",
    observation: "Core tracking exists, with opportunities to make reporting more actionable."
  }
];

const PRIORITY_ACTIONS = [
  "Clarify the primary offer",
  "Improve the conversion path",
  "Strengthen lead follow-up",
  "Expand acquisition after the foundation is stronger."
];

function renderInsightIcon(iconName) {
  const style = { width: '1.2rem', height: '1.2rem', display: 'block' };

  switch (iconName) {
    case 'path':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={style}>
          <path d="M4 19V9a2 2 0 0 1 2-2h12" />
          <polyline points="14 3 18 7 14 11" />
          <circle cx="4" cy="19" r="2" />
        </svg>
      );
    case 'journey':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={style}>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 6h3a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3" />
        </svg>
      );
    case 'foundation':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={style}>
          <path d="M3 21h18" />
          <path d="M5 21V10l7-5 7 5v11" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case 'system':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={style}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="5" cy="5" r="2" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="m7 7 3 3m4 0 3-3m-7 7-3 3m7-3 3 3" />
        </svg>
      );
    default:
      return null;
  }
}

function DiagnosticArea({ area }) {
  return (
    <div class={`diagnostic-row diagnostic-${area.tone}`}>
      <div class="diagnostic-row-header">
        <span class="diagnostic-name">{area.name}</span>
        <span class={`status-pill status-${area.tone}`}>{area.status}</span>
      </div>
      <p class="diagnostic-observation">{area.observation}</p>
    </div>
  );
}

export default function Dashboard() {
  const [insightIndex, setInsightIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setInsightIndex((prev) => (prev + 1) % DIAGNOSTIC_INSIGHTS.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const activeInsight = DIAGNOSTIC_INSIGHTS[insightIndex];

  return (
    <div class="dashboard-grid">
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 0.75rem;
          width: 100%;
          font-family: var(--font-body);
        }

        .db-card {
          background: rgba(12, 12, 14, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1rem;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05);
          transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .db-card:hover {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(16, 16, 20, 0.85);
        }

        .card-title {
          font-family: var(--font-headings);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-dark-secondary);
          margin-bottom: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .context-label {
          color: var(--color-primary);
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0;
          text-align: right;
          text-transform: none;
        }

        .col-overview,
        .col-priority,
        .col-insights {
          grid-column: span 12;
        }

        .col-diagnostic {
          grid-column: span 6;
        }

        .control-overview {
          display: grid;
          grid-template-columns: minmax(110px, 0.7fr) 2.3fr;
          gap: 1rem;
          align-items: stretch;
        }

        .review-total {
          display: flex;
          align-items: baseline;
          gap: 0.55rem;
          padding-right: 1rem;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .review-count {
          font-family: var(--font-headings);
          font-size: 1.9rem;
          font-weight: 800;
          color: var(--color-text-dark-primary);
          line-height: 1;
        }

        .review-label {
          color: var(--color-text-dark-secondary);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-breakdown {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.45rem;
        }

        .status-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.35rem;
          min-width: 0;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: var(--color-text-dark-secondary);
          font-size: 0.66rem;
          font-weight: 600;
        }

        .status-summary strong {
          font-family: var(--font-headings);
          font-size: 0.9rem;
          color: var(--color-text-dark-primary);
        }

        .status-summary-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .status-strong-dot { background: var(--color-accent-teal); }
        .status-opportunity-dot { background: var(--color-secondary); }
        .status-attention-dot { background: var(--color-primary); }

        .diagnostic-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .diagnostic-row {
          padding: 0.55rem 0.65rem;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-left-width: 3px;
          border-radius: 9px;
        }

        .diagnostic-attention { border-left-color: var(--color-primary); }
        .diagnostic-opportunity { border-left-color: var(--color-secondary); }
        .diagnostic-strong { border-left-color: var(--color-accent-teal); }

        .diagnostic-row-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.45rem;
          margin-bottom: 0.2rem;
        }

        .diagnostic-name {
          font-family: var(--font-headings);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-text-dark-primary);
        }

        .status-pill {
          padding: 0.12rem 0.4rem;
          border-radius: 999px;
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: none;
          white-space: nowrap;
        }

        .status-attention {
          color: var(--color-primary);
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .status-opportunity {
          color: var(--color-secondary);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .status-strong {
          color: var(--color-accent-teal);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .diagnostic-observation {
          color: var(--color-text-dark-secondary);
          font-size: 0.7rem;
          line-height: 1.32;
        }

        .priority-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.45rem;
        }

        .priority-step {
          display: grid;
          grid-template-columns: auto auto 1fr;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 0.7rem;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: var(--color-text-dark-primary);
          font-size: 0.72rem;
          font-weight: 600;
        }

        .priority-number {
          font-family: var(--font-headings);
          color: var(--color-primary);
          font-weight: 800;
        }

        .priority-divider {
          color: var(--color-text-dark-secondary);
        }

        .insight-card-inner {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .insight-card-inner.fade-out {
          opacity: 0;
          transform: translateY(4px);
        }

        .insight-icon-box {
          width: 2.35rem;
          height: 2.35rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .insight-content-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .insight-pill {
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .insight-heading {
          font-family: var(--font-headings);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-text-dark-primary);
        }

        .insight-desc {
          color: var(--color-text-dark-secondary);
          font-size: 0.72rem;
          line-height: 1.35;
        }

        @media (min-width: 2000px) {
          .dashboard-grid {
            gap: 0.8rem;
          }

          .db-card {
            padding: 1.075rem;
            border-radius: 17px;
          }

          .card-title {
            margin-bottom: 0.8rem;
            font-size: 0.9rem;
          }

          .context-label {
            font-size: 0.75rem;
          }

          .review-count {
            font-size: 2.05rem;
          }

          .review-label {
            font-size: 0.85rem;
          }

          .status-summary {
            padding: 0.55rem;
            font-size: 0.7rem;
          }

          .status-summary strong {
            font-size: 0.95rem;
          }

          .diagnostic-list,
          .priority-grid {
            gap: 0.5rem;
          }

          .diagnostic-row {
            padding: 0.6rem 0.7rem;
          }

          .diagnostic-name {
            font-size: 0.825rem;
          }

          .status-pill {
            font-size: 0.6rem;
          }

          .diagnostic-observation {
            font-size: 0.75rem;
          }

          .priority-step {
            padding: 0.6rem 0.75rem;
            font-size: 0.775rem;
          }

          .insight-icon-box {
            width: 2.5rem;
            height: 2.5rem;
          }

          .insight-heading {
            font-size: 0.875rem;
          }

          .insight-desc {
            font-size: 0.775rem;
          }
        }

        @media (max-width: 768px) {
          .col-diagnostic {
            grid-column: span 12;
          }

          .control-overview {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .review-total {
            padding-right: 0;
            padding-bottom: 1rem;
            border-right: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .priority-grid {
            grid-template-columns: 1fr;
          }

          .card-title {
            align-items: flex-start;
          }
        }
      `}</style>

      <div class="db-card col-overview">
        <div class="card-title">
          <span>MARKETING CONTROL ROOM</span>
          <span class="context-label">Example diagnostic review</span>
        </div>
        <div class="control-overview">
          <div class="review-total">
            <span class="review-count">6</span>
            <span class="review-label">areas reviewed</span>
          </div>
          <div class="status-breakdown">
            <div class="status-summary">
              <span class="status-summary-label"><span class="status-dot status-strong-dot"></span>Strong:</span>
              <strong>1</strong>
            </div>
            <div class="status-summary">
              <span class="status-summary-label"><span class="status-dot status-opportunity-dot"></span>Opportunity:</span>
              <strong>2</strong>
            </div>
            <div class="status-summary">
              <span class="status-summary-label"><span class="status-dot status-attention-dot"></span>Needs Attention:</span>
              <strong>3</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="db-card col-diagnostic">
        <div class="card-title">GROWTH FOUNDATION</div>
        <div class="diagnostic-list">
          {GROWTH_FOUNDATION.map((area) => <DiagnosticArea key={area.name} area={area} />)}
        </div>
      </div>

      <div class="db-card col-diagnostic">
        <div class="card-title">CUSTOMER SYSTEM</div>
        <div class="diagnostic-list">
          {CUSTOMER_SYSTEM.map((area) => <DiagnosticArea key={area.name} area={area} />)}
        </div>
      </div>

      <div class="db-card col-priority">
        <div class="card-title">RECOMMENDED FOCUS</div>
        <div class="priority-grid">
          {PRIORITY_ACTIONS.map((action, index) => (
            <div class="priority-step" key={action}>
              <span class="priority-number">{String(index + 1).padStart(2, '0')}</span>
              <span class="priority-divider">—</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

      <div class="db-card col-insights">
        <div class="card-title">
          <span>DIAGNOSTIC INSIGHT</span>
          <span class="context-label">Illustrative observations</span>
        </div>
        <div class={`insight-card-inner ${isAnimating ? 'fade-out' : ''}`}>
          <div class="insight-icon-box" style={{ color: activeInsight.badgeColor }}>
            {renderInsightIcon(activeInsight.icon)}
          </div>
          <div class="insight-content-box">
            <div class="insight-header">
              <span class="insight-pill" style={`background-color: ${activeInsight.badgeColor};`}>EXAMPLE</span>
              <h4 class="insight-heading">{activeInsight.title}</h4>
            </div>
            <p class="insight-desc">{activeInsight.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
