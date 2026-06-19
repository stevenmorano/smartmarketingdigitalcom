// src/components/preact/Dashboard.jsx
import { useState, useEffect } from 'preact/hooks';

// AI Insights items to cycle through
const INSIGHTS = [
  {
    id: 1,
    title: "Audience Optimization",
    text: "Your best performing e-commerce audience segment is 25-34, representing 42% of total conversions.",
    badgeColor: "var(--color-primary)",
    icon: "👤"
  },
  {
    id: 2,
    title: "Meta Ads Opportunity",
    text: "Increasing budget by 15% on high-intent lookalikes could raise ROAS by up to 22%.",
    badgeColor: "var(--color-secondary)",
    icon: "📈"
  },
  {
    id: 3,
    title: "Email Automation Efficiency",
    text: "Welcome & Abandoned Cart automations generated 37% of revenue this month with 0 ad spend.",
    badgeColor: "var(--color-accent-teal)",
    icon: "✉️"
  },
  {
    id: 4,
    title: "Keyword Cost Reduction",
    text: "Excluding low-intent search phrases reduced overall Cost Per Lead by 12.5% this week.",
    badgeColor: "#8b5cf6",
    icon: "🔍"
  }
];

export default function Dashboard() {
  const [insightIndex, setInsightIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cycle insights every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setInsightIndex((prev) => (prev + 1) % INSIGHTS.length);
        setIsAnimating(false);
      }, 500); // Duration of fade-out before switching content
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeInsight = INSIGHTS[insightIndex];

  return (
    <div class="dashboard-grid">
      <style>{`
        /* Scoped styles for the Dashboard Preact component */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.25rem;
          width: 100%;
          font-family: var(--font-body);
        }

        /* Card Common Styles */
        .db-card {
          background: rgba(13, 18, 34, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: border-color 0.3s ease;
        }

        .db-card:hover {
          border-color: rgba(59, 130, 246, 0.25);
        }

        .card-title {
          font-family: var(--font-headings);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-dark-secondary);
          margin-bottom: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* 1. Performance Overview Card (Leads, CPL, ROAS) */
        .col-perf {
          grid-column: span 12;
        }

        .perf-metrics-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .metric-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metric-label {
          font-size: 0.8rem;
          color: var(--color-text-dark-secondary);
        }

        .metric-value-wrap {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .metric-val {
          font-family: var(--font-headings);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--color-text-dark-primary);
        }

        .metric-pct {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .pct-positive { color: var(--color-accent-teal); }
        .pct-negative { color: #f43f5e; }

        .sparkline-svg {
          width: 100%;
          height: 32px;
          margin-top: 0.5rem;
        }

        .spark-path {
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawPath 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 2. Lead Funnel Card */
        .col-funnel {
          grid-column: span 6;
        }

        .funnel-container {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 0.5rem;
        }

        .funnel-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          overflow: hidden;
          font-size: 0.85rem;
        }

        .funnel-bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.03) 100%);
          border-left: 3px solid var(--color-primary);
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .funnel-stage:nth-child(2) .funnel-bg {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.12) 0%, rgba(6, 182, 212, 0.03) 100%);
          border-left-color: rgba(59, 130, 246, 0.8);
        }
        .funnel-stage:nth-child(3) .funnel-bg {
          background: linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.03) 100%);
          border-left-color: var(--color-secondary);
        }
        .funnel-stage:nth-child(4) .funnel-bg {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.03) 100%);
          border-left-color: var(--color-accent-teal);
        }

        .funnel-label {
          position: relative;
          z-index: 1;
          font-weight: 500;
        }

        .funnel-val {
          position: relative;
          z-index: 1;
          font-weight: 700;
          font-family: var(--font-headings);
        }

        /* 3. Top Channels Card */
        .col-channels {
          grid-column: span 6;
        }

        .channels-wrapper {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .donut-chart-container {
          position: relative;
          width: 90px;
          height: 90px;
          flex-shrink: 0;
        }

        .donut-svg {
          transform: rotate(-90deg);
        }

        .donut-ring {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
          stroke-width: 8;
        }

        .donut-segment {
          fill: none;
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 283; /* 2 * PI * 45 */
          stroke-dashoffset: 283;
          transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .donut-center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-headings);
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-text-dark-primary);
        }

        .channels-legend {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.8rem;
          flex-grow: 1;
        }

        .legend-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .legend-dot-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .legend-val {
          font-weight: 600;
          color: var(--color-text-dark-primary);
        }

        /* 4. Revenue Card */
        .col-revenue {
          grid-column: span 12;
        }

        .revenue-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .rev-val {
          font-family: var(--font-headings);
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-text-dark-primary);
          line-height: 1;
        }

        .rev-subtext {
          font-size: 0.75rem;
          color: var(--color-text-dark-secondary);
          margin-top: 0.25rem;
        }

        .revenue-chart-svg {
          width: 100%;
          height: 100px;
        }

        /* 5. AI Insights Card */
        .col-insights {
          grid-column: span 12;
        }

        .insight-card-inner {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .insight-card-inner.fade-out {
          opacity: 0;
          transform: translateY(4px);
        }

        .insight-icon-box {
          font-size: 1.5rem;
          width: 2.75rem;
          height: 2.75rem;
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
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          letter-spacing: 0.05em;
          color: #ffffff;
        }

        .insight-heading {
          font-family: var(--font-headings);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-dark-primary);
        }

        .insight-desc {
          font-size: 0.8rem;
          color: var(--color-text-dark-secondary);
          line-height: 1.4;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .perf-metrics-container {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .col-funnel, .col-channels {
            grid-column: span 12;
          }
        }
      `}</style>

      {/* 1. Performance Overview Card */}
      <div class="db-card col-perf">
        <div class="card-title">
          <span>Performance Overview</span>
          <span style="font-size: 0.75rem; color: var(--color-primary);">Last 30 Days</span>
        </div>
        <div class="perf-metrics-container">
          {/* Leads */}
          <div class="metric-row">
            <span class="metric-label">Leads Generated</span>
            <div class="metric-value-wrap">
              <span class="metric-val">2,458</span>
              <span class="metric-pct pct-positive">↑ 39.4%</span>
            </div>
            <svg class="sparkline-svg" viewBox="0 0 120 40">
              <path class="spark-path" stroke="var(--color-primary)" stroke-dashoffset="0"
                d="M0,35 Q15,25 30,28 T60,18 T90,22 T120,5" style="animation-delay: 0.1s;" />
            </svg>
          </div>
          {/* CPL */}
          <div class="metric-row">
            <span class="metric-label">Cost Per Lead</span>
            <div class="metric-value-wrap">
              <span class="metric-val">$18.42</span>
              <span class="metric-pct pct-positive">↓ 12.5%</span>
            </div>
            <svg class="sparkline-svg" viewBox="0 0 120 40">
              <path class="spark-path" stroke="var(--color-secondary)" stroke-dashoffset="0"
                d="M0,5 Q15,20 30,12 T60,25 T90,15 T120,32" style="animation-delay: 0.3s;" />
            </svg>
          </div>
          {/* ROAS */}
          <div class="metric-row">
            <span class="metric-label">Average ROAS</span>
            <div class="metric-value-wrap">
              <span class="metric-val">4.6x</span>
              <span class="metric-pct pct-positive">↑ 20.7%</span>
            </div>
            <svg class="sparkline-svg" viewBox="0 0 120 40">
              <path class="spark-path" stroke="var(--color-accent-teal)" stroke-dashoffset="0"
                d="M0,32 Q15,30 30,22 T60,18 T90,8 T120,2" style="animation-delay: 0.5s;" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Lead Funnel Card */}
      <div class="db-card col-funnel">
        <div class="card-title">Lead Funnel</div>
        <div class="funnel-container">
          <div class="funnel-stage">
            <div class="funnel-bg" style="width: 100%"></div>
            <span class="funnel-label">Visitors</span>
            <span class="funnel-val">32,491</span>
          </div>
          <div class="funnel-stage">
            <div class="funnel-bg" style="width: 76%"></div>
            <span class="funnel-label">Leads (7.5%)</span>
            <span class="funnel-val">2,458</span>
          </div>
          <div class="funnel-stage">
            <div class="funnel-bg" style="width: 42%"></div>
            <span class="funnel-label">Qualified (41.5%)</span>
            <span class="funnel-val">1,020</span>
          </div>
          <div class="funnel-stage">
            <div class="funnel-bg" style="width: 18%"></div>
            <span class="funnel-label">Customers (29.6%)</span>
            <span class="funnel-val">302</span>
          </div>
        </div>
      </div>

      {/* 3. Top Channels Card */}
      <div class="db-card col-channels">
        <div class="card-title">Top Channels</div>
        <div class="channels-wrapper">
          <div class="donut-chart-container">
            <svg class="donut-svg" width="90" height="90" viewBox="0 0 100 100">
              <circle class="donut-ring" cx="50" cy="50" r="45" />
              {/* Paid Search Segment - 57% (Offset: 0, length: 161.3) */}
              <circle class="donut-segment" cx="50" cy="50" r="45" stroke="var(--color-primary)" 
                stroke-dasharray="283" stroke-dashoffset={283 - 161.3} />
              {/* Meta Ads Segment - 25% (Offset: 161.3, length: 70.7) */}
              <circle class="donut-segment" cx="50" cy="50" r="45" stroke="var(--color-secondary)" 
                stroke-dasharray="283" stroke-dashoffset={283 - 70.7} style="transform-origin: center; transform: rotate(205deg);" />
              {/* Email Segment - 13% (Offset: 232, length: 36.8) */}
              <circle class="donut-segment" cx="50" cy="50" r="45" stroke="var(--color-accent-teal)" 
                stroke-dasharray="283" stroke-dashoffset={283 - 36.8} style="transform-origin: center; transform: rotate(295deg);" />
              {/* Organic Segment - 5% (Offset: 268.8, length: 14.1) */}
              <circle class="donut-segment" cx="50" cy="50" r="45" stroke="#8b5cf6" 
                stroke-dasharray="283" stroke-dashoffset={283 - 14.1} style="transform-origin: center; transform: rotate(342deg);" />
            </svg>
            <div class="donut-center-text">63%</div>
          </div>
          <div class="channels-legend">
            <div class="legend-item">
              <div class="legend-dot-label">
                <span class="legend-dot" style="background: var(--color-primary)"></span>
                <span>Paid Search</span>
              </div>
              <span class="legend-val">57%</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot-label">
                <span class="legend-dot" style="background: var(--color-secondary)"></span>
                <span>Meta Ads</span>
              </div>
              <span class="legend-val">25%</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot-label">
                <span class="legend-dot" style="background: var(--color-accent-teal)"></span>
                <span>Email</span>
              </div>
              <span class="legend-val">13%</span>
            </div>
            <div class="legend-item">
              <div class="legend-dot-label">
                <span class="legend-dot" style="background: #8b5cf6"></span>
                <span>Organic</span>
              </div>
              <span class="legend-val">5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Revenue Card */}
      <div class="db-card col-revenue">
        <div class="revenue-header-row">
          <div>
            <div class="card-title" style="margin-bottom: 0.25rem;">Revenue Overview</div>
            <div class="rev-subtext">vs. prior 30 days</div>
          </div>
          <div style="text-align: right;">
            <div class="rev-val">$385,620</div>
            <div class="metric-pct pct-positive" style="margin-top: 0.25rem;">↑ 18.7%</div>
          </div>
        </div>
        <svg class="revenue-chart-svg" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--color-primary)" stop-opacity="0.25" />
              <stop offset="100%" stop-color="var(--color-primary)" stop-opacity="0.0" />
            </linearGradient>
          </defs>
          {/* Gradient Fill under line */}
          <path d="M0,90 L40,82 L80,85 L120,70 L160,75 L200,50 L240,55 L280,38 L320,30 L360,42 L400,10 L400,100 L0,100 Z" fill="url(#chartGlow)" />
          {/* Grid line grid */}
          <line x1="0" y1="33" x2="400" y2="33" stroke="rgba(255,255,255,0.02)" stroke-width="1" />
          <line x1="0" y1="66" x2="400" y2="66" stroke="rgba(255,255,255,0.02)" stroke-width="1" />
          {/* Animated line path */}
          <path class="spark-path" stroke="url(#gradient-line)" stroke-width="3.5" stroke-dashoffset="0"
            d="M0,90 L40,82 L80,85 L120,70 L160,75 L200,50 L240,55 L280,38 L320,30 L360,42 L400,10" />
          <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="var(--color-primary)" />
            <stop offset="100%" stop-color="var(--color-secondary)" />
          </linearGradient>
        </svg>
      </div>

      {/* 5. AI Insights Card */}
      <div class="db-card col-insights">
        <div class="card-title">
          <span>AI Systems Insights</span>
          <span style="font-size: 0.75rem; color: var(--color-accent-teal); display: flex; align-items: center; gap: 0.25rem;">
            <span style="width: 6px; height: 6px; background: var(--color-accent-teal); border-radius: 50%; display: inline-block;" class="animate-pulse-glow"></span>
            Real-time feed
          </span>
        </div>
        <div class={`insight-card-inner ${isAnimating ? 'fade-out' : ''}`}>
          <div class="insight-icon-box">{activeInsight.icon}</div>
          <div class="insight-content-box">
            <div class="insight-header">
              <span class="insight-pill" style={`background-color: ${activeInsight.badgeColor};`}>Insight</span>
              <h4 class="insight-heading">{activeInsight.title}</h4>
            </div>
            <p class="insight-desc">{activeInsight.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
