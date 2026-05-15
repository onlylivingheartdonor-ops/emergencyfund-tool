"use client"

import { useState } from "react"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .ef-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .ef-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .ef-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .ef-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .ef-title em { font-style: italic; color: #0369a1; }
  .ef-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .ef-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .ef-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .ef-field-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .ef-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .ef-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .ef-input-wrap { position: relative; }
  .ef-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .ef-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .ef-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .ef-input.no-prefix { padding-left: 0; }
  .ef-input:focus { border-color: #0369a1; }

  .ef-months-row { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
  .ef-months-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .5rem; }
  .ef-months-tab { padding: .45rem .9rem; border: 1px solid #e0dbd3; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; cursor: pointer; background: none; transition: all .15s; }
  .ef-months-tab.on { border-color: #0369a1; background: #eff6ff; color: #0369a1; }

  .ef-result-hero { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; }
  .ef-result-eyebrow { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #1e40af; margin-bottom: .3rem; }
  .ef-result-val { font-family: 'DM Serif Display', serif; font-size: 3.5rem; color: #1e40af; line-height: 1; }
  .ef-result-sub { font-size: 12px; color: #1e40af; margin-top: .5rem; line-height: 1.6; opacity: .75; }

  .ef-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .ef-result-cell { background: #fff; padding: 1rem 1.1rem; }
  .ef-result-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .ef-result-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #1a1a1a; }
  .ef-result-cell-val.blue { color: #0369a1; }
  .ef-result-cell-val.green { color: #166534; }
  .ef-result-cell-val.amber { color: #b45309; }
  .ef-result-cell-val.red { color: #b91c1c; }

  .ef-status { border-radius: 4px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; border-left: 3px solid; }
  .ef-status.funded   { background: #f0fdf4; border-color: #166534; }
  .ef-status.close    { background: #fefce8; border-color: #b45309; }
  .ef-status.partial  { background: #fff7ed; border-color: #c2410c; }
  .ef-status.start    { background: #fff1f2; border-color: #b91c1c; }
  .ef-status-title { font-family: 'DM Serif Display', serif; font-size: 1rem; margin-bottom: .25rem; }
  .ef-status.funded  .ef-status-title { color: #166534; }
  .ef-status.close   .ef-status-title { color: #b45309; }
  .ef-status.partial .ef-status-title { color: #c2410c; }
  .ef-status.start   .ef-status-title { color: #b91c1c; }
  .ef-status-body { font-size: 12px; color: #555; line-height: 1.6; }

  .ef-progress-section { margin-bottom: 1.5rem; }
  .ef-progress-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .5rem; display: flex; justify-content: space-between; }
  .ef-progress-track { height: 10px; background: #e0dbd3; border-radius: 5px; overflow: hidden; margin-bottom: .4rem; }
  .ef-progress-fill { height: 100%; border-radius: 5px; transition: width .6s, background .4s; }
  .ef-progress-legend { font-size: 11px; color: #888; }

  .ef-savings-plan { border: 1.5px dashed #bfdbfe; border-radius: 4px; padding: 1.25rem; margin-bottom: 1rem; }
  .ef-savings-plan-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #0369a1; margin-bottom: .75rem; }
  .ef-savings-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: .75rem; }
  .ef-savings-cell { background: #fff; padding: .85rem 1rem; text-align: center; }
  .ef-savings-cell-label { font-size: 10px; letter-spacing: .06em; text-transform: uppercase; color: #aaa; margin-bottom: .25rem; }
  .ef-savings-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #0369a1; }
  .ef-savings-input-row { display: flex; align-items: center; gap: .75rem; }
  .ef-savings-input-label { font-size: 12px; color: #555; white-space: nowrap; }
  .ef-savings-input { flex: 1; border: none; border-bottom: 1.5px solid #bfdbfe; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .3rem 0 .3rem 1rem; outline: none; transition: border-color .2s; }
  .ef-savings-input:focus { border-color: #0369a1; }
  .ef-savings-result { font-size: 12px; color: #0369a1; margin-top: .6rem; min-height: 1.2em; line-height: 1.6; }

  .ef-hysa-note { font-size: 12px; color: #555; padding: .9rem 1rem; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 3px; line-height: 1.6; }
  .ef-hysa-note span { color: #0369a1; font-weight: 500; }

  .ef-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .ef-info-item { padding: .75rem; border-left: 2px solid #bfdbfe; }
  .ef-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .ef-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .ef-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .ef-prose p:last-child { margin-bottom: 0; }
  .ef-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .ef-prose ul li { margin-bottom: .3rem; }

  .ef-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .ef-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #bfdbfe; line-height: 1; margin-bottom: .4rem; }
  .ef-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .ef-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .ef-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .ef-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .ef-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .ef-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .ef-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .ef-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .ef-field-row, .ef-field-row-3 { grid-template-columns: 1fr; }
    .ef-result-grid, .ef-savings-grid { grid-template-columns: 1fr; }
    .ef-info-grid, .ef-tip-grid { grid-template-columns: 1fr; }
  }
`

const MONTH_OPTIONS = [3, 4, 6, 8, 9, 12]

const RELATED = [
  { label: "Credit Card Debt Payoff Calculator",  href: "https://creditcarddebtpayoffcalculator.com" },
  { label: "Debt Reducing Calculator",            href: "https://debtreducingcalculator.com" },
  { label: "Side Hustle Tax Estimator",           href: "https://sidehustletaxestimator.com" },
  { label: "High Yield Savings Calculator",       href: "https://highyieldsavingscalculator.com" },
  { label: "Retirement Savings Gap",              href: "https://retirementsavingsgap.com" },
  { label: "Life Insurance Coverage Calculator",  href: "https://lifeinsurancecoveragecalculator.com" },
  { label: "Online Course ROI Calculator",        href: "https://onlinecourseroi.com" },
  { label: "Subscription Cost Calculator",        href: "https://mysubscriptioncost.com" },
  { label: "Email Attachment Size Checker",       href: "https://emailattachmentsize.com" },
  { label: "GPA Calculator",                      href: "https://gpacalculator.site" },
  { label: "YouTube Title Checker",               href: "https://youtubetitlechecker.com" },
  { label: "Strong Password Builder",             href: "https://strongpasswordbuilder.com" },
  { label: "Cool Username Generator",             href: "https://coolusernamegenerator.com" },
]

function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US") }

function getStatus(pct) {
  if (pct >= 100) return { key: "funded",  title: "Fully funded",       msg: "Your emergency fund meets your target. Focus on keeping it topped up and consider moving excess to longer-term savings or investments." }
  if (pct >= 75)  return { key: "close",   title: "Almost there",       msg: "You're within striking distance of your goal. A few more months of consistent saving will get you fully funded." }
  if (pct >= 25)  return { key: "partial", title: "Partially funded",   msg: "You have a meaningful start. Keep building — even a partial fund significantly reduces the financial impact of an unexpected expense." }
  return               { key: "start",   title: "Just getting started", msg: "Every dollar you add matters. An emergency fund is the foundation of financial stability — prioritize this before other savings goals." }
}

function getProgressColor(pct) {
  if (pct >= 100) return "#166534"
  if (pct >= 75)  return "#0369a1"
  if (pct >= 25)  return "#b45309"
  return "#b91c1c"
}

export default function Page() {
  const [housing,     setHousing]     = useState("1500")
  const [food,        setFood]        = useState("600")
  const [transport,   setTransport]   = useState("400")
  const [utilities,   setUtilities]   = useState("200")
  const [insurance,   setInsurance]   = useState("300")
  const [other,       setOther]       = useState("200")
  const [targetMonths, setTargetMonths] = useState(6)
  const [currentSavings, setCurrentSavings] = useState("0")
  const [monthlySaving,  setMonthlySaving]  = useState("")
  const [hysaRate,       setHysaRate]       = useState("4.5")

  const monthly = [housing, food, transport, utilities, insurance, other]
    .reduce((sum, v) => sum + (parseFloat(v) || 0), 0)

  const target  = monthly * targetMonths
  const current = parseFloat(currentSavings) || 0
  const gap     = Math.max(target - current, 0)
  const pct     = target > 0 ? Math.min((current / target) * 100, 100) : 0
  const status  = target > 0 ? getStatus(pct) : null

  // Savings plan
  const ms = parseFloat(monthlySaving) || 0
  const monthsToGoal = ms > 0 ? Math.ceil(gap / ms) : null

  // HYSA interest while building
  const hysaMonthlyRate = (parseFloat(hysaRate) || 0) / 100 / 12
  const hysaGrowth = ms > 0 && monthsToGoal
    ? current * Math.pow(1 + hysaMonthlyRate, monthsToGoal) +
      ms * ((Math.pow(1 + hysaMonthlyRate, monthsToGoal) - 1) / (hysaMonthlyRate || 1)) - current - ms * monthsToGoal
    : 0

  // Time scenarios
  const scenarios = [100, 200, 500].map(amt => ({
    amt,
    months: gap > 0 ? Math.ceil(gap / amt) : 0,
  }))

  return (
    <>
      <style>{css}</style>
      <main className="ef-wrap">

        <div className="ef-header">
          <p className="ef-eyebrow">Personal Finance</p>
          <h1 className="ef-title">Emergency Fund<br /><em>Calculator</em></h1>
        </div>

        <div className="ef-card">
          <p className="ef-section-title" style={{ marginBottom: ".5rem" }}>Monthly essential expenses</p>
          <p style={{ fontSize: "12px", color: "#888", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            Enter only essential costs — the expenses that must be paid regardless of circumstances.
          </p>

          <div className="ef-field-row">
            <div>
              <label className="ef-field-label" htmlFor="housing">Housing</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="housing" className="ef-input" type="number" min="0" placeholder="1500"
                  value={housing} onChange={e => setHousing(e.target.value)} />
              </div>
              <p className="ef-field-hint">Rent or mortgage payment</p>
            </div>
            <div>
              <label className="ef-field-label" htmlFor="food">Food</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="food" className="ef-input" type="number" min="0" placeholder="600"
                  value={food} onChange={e => setFood(e.target.value)} />
              </div>
              <p className="ef-field-hint">Groceries only — not dining out</p>
            </div>
          </div>

          <div className="ef-field-row">
            <div>
              <label className="ef-field-label" htmlFor="transport">Transportation</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="transport" className="ef-input" type="number" min="0" placeholder="400"
                  value={transport} onChange={e => setTransport(e.target.value)} />
              </div>
              <p className="ef-field-hint">Car payment, insurance, fuel, or transit</p>
            </div>
            <div>
              <label className="ef-field-label" htmlFor="utilities">Utilities</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="utilities" className="ef-input" type="number" min="0" placeholder="200"
                  value={utilities} onChange={e => setUtilities(e.target.value)} />
              </div>
              <p className="ef-field-hint">Electric, gas, water, internet, phone</p>
            </div>
          </div>

          <div className="ef-field-row">
            <div>
              <label className="ef-field-label" htmlFor="insurance">Insurance &amp; medical</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="insurance" className="ef-input" type="number" min="0" placeholder="300"
                  value={insurance} onChange={e => setInsurance(e.target.value)} />
              </div>
              <p className="ef-field-hint">Health, life, renters/homeowners insurance</p>
            </div>
            <div>
              <label className="ef-field-label" htmlFor="other">Other essentials</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="other" className="ef-input" type="number" min="0" placeholder="200"
                  value={other} onChange={e => setOther(e.target.value)} />
              </div>
              <p className="ef-field-hint">Minimum debt payments, prescriptions, childcare</p>
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <span className="ef-months-label">Target coverage — how many months?</span>
            <div className="ef-months-row">
              {MONTH_OPTIONS.map(m => (
                <button key={m} className={`ef-months-tab${targetMonths === m ? " on" : ""}`}
                  onClick={() => setTargetMonths(m)}>
                  {m} months
                </button>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5 }}>
              3–4 months for stable dual-income households · 6 months is the standard recommendation · 9–12 months for freelancers, single income, or variable pay
            </p>
          </div>

          <div className="ef-field-row" style={{ marginBottom: "1.5rem" }}>
            <div>
              <label className="ef-field-label" htmlFor="current">Current emergency savings</label>
              <div className="ef-input-wrap">
                <span className="ef-prefix">$</span>
                <input id="current" className="ef-input" type="number" min="0" placeholder="0"
                  value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
              </div>
              <p className="ef-field-hint">What you have set aside today</p>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: ".4rem" }}>
              {monthly > 0 && (
                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>
                  Your total monthly essentials: <strong style={{ color: "#1a1a1a", fontWeight: 500 }}>{fmt(monthly)}</strong>
                </p>
              )}
            </div>
          </div>

          {target > 0 && (
            <>
              <div className="ef-result-hero">
                <p className="ef-result-eyebrow">Emergency fund target</p>
                <p className="ef-result-val">{fmt(target)}</p>
                <p className="ef-result-sub">
                  {fmt(monthly)}/month × {targetMonths} months
                  {gap > 0 ? ` · ${fmt(gap)} still needed` : " · fully funded"}
                </p>
              </div>

              <div className="ef-result-grid">
                <div className="ef-result-cell">
                  <p className="ef-result-cell-label">Monthly essentials</p>
                  <p className="ef-result-cell-val blue">{fmt(monthly)}</p>
                </div>
                <div className="ef-result-cell">
                  <p className="ef-result-cell-label">Currently saved</p>
                  <p className={`ef-result-cell-val ${pct >= 100 ? "green" : pct >= 50 ? "blue" : "amber"}`}>{fmt(current)}</p>
                </div>
                <div className="ef-result-cell">
                  <p className="ef-result-cell-label">Gap remaining</p>
                  <p className={`ef-result-cell-val ${gap === 0 ? "green" : "red"}`}>{gap === 0 ? "None" : fmt(gap)}</p>
                </div>
              </div>

              {status && (
                <div className={`ef-status ${status.key}`}>
                  <p className="ef-status-title">{status.title}</p>
                  <p className="ef-status-body">{status.msg}</p>
                </div>
              )}

              <div className="ef-progress-section">
                <div className="ef-progress-label">
                  <span>Progress toward goal</span>
                  <span>{pct.toFixed(0)}% funded</span>
                </div>
                <div className="ef-progress-track">
                  <div className="ef-progress-fill" style={{ width: pct + "%", background: getProgressColor(pct) }} />
                </div>
                <p className="ef-progress-legend">{fmt(current)} saved of {fmt(target)} target</p>
              </div>

              {gap > 0 && (
                <div className="ef-savings-plan">
                  <p className="ef-savings-plan-title">How fast can you get there?</p>
                  <div className="ef-savings-grid">
                    {scenarios.map((s, i) => (
                      <div className="ef-savings-cell" key={i}>
                        <p className="ef-savings-cell-label">{fmt(s.amt)}/month</p>
                        <p className="ef-savings-cell-val">
                          {s.months < 12 ? `${s.months} mo` : `${Math.floor(s.months / 12)}y ${s.months % 12}m`}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="ef-savings-input-row" style={{ marginTop: ".75rem" }}>
                    <span className="ef-savings-input-label">I can save</span>
                    <span style={{ fontSize: ".9rem", color: "#aaa" }}>$</span>
                    <input className="ef-savings-input" type="number" min="0" placeholder="250"
                      value={monthlySaving} onChange={e => setMonthlySaving(e.target.value)} />
                    <span className="ef-savings-input-label">/month</span>
                  </div>
                  {monthsToGoal && (
                    <p className="ef-savings-result">
                      At {fmt(ms)}/month you'll reach your goal in{" "}
                      <strong style={{ fontWeight: 500 }}>
                        {monthsToGoal < 12 ? `${monthsToGoal} months` : `${Math.floor(monthsToGoal / 12)} years and ${monthsToGoal % 12} months`}
                      </strong>
                      {hysaGrowth > 1 ? ` — earning an estimated ${fmt(hysaGrowth)} in HYSA interest along the way.` : "."}
                    </p>
                  )}
                </div>
              )}

              <div className="ef-hysa-note">
                Keep your emergency fund in a <span>high-yield savings account</span> — not a checking account. At current HYSA rates around <span>4–5% APY</span>, a fully funded {targetMonths}-month emergency fund of <span>{fmt(target)}</span> earns roughly <span>{fmt(target * 0.045)}/year</span> in interest while remaining fully liquid.
              </div>
            </>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="ef-card">
          <p className="ef-section-title">How this calculator works</p>
          <div className="ef-prose">
            <p>An emergency fund is sized in months of essential expenses — not total income or total spending. The calculator asks you to enter only the costs you genuinely cannot avoid: housing, food, transportation, utilities, insurance, and essential debt payments. Discretionary spending like dining out, entertainment, and subscriptions is excluded because those would be cut first in a real financial emergency.</p>
            <p>The target coverage selector lets you choose between 3 and 12 months depending on your situation. The savings plan section shows how long it takes to reach your goal at different monthly saving amounts, and estimates the interest you'd earn if you keep your fund in a high-yield savings account throughout the accumulation period.</p>
          </div>
          <div className="ef-info-grid">
            <div className="ef-info-item">
              <p className="ef-info-title">Why essentials only</p>
              <p className="ef-info-body">In a job loss or financial crisis, you'd immediately cut non-essential spending. Basing your fund on essential expenses gives you a more accurate — and usually smaller, more achievable — target than using total monthly spending.</p>
            </div>
            <div className="ef-info-item">
              <p className="ef-info-title">Where to keep it</p>
              <p className="ef-info-body">A high-yield savings account is the right home for an emergency fund — FDIC insured, fully liquid, and currently paying 4–5% APY. Avoid CDs (penalty for early withdrawal) or investment accounts (value can drop when you need it most).</p>
            </div>
            <div className="ef-info-item">
              <p className="ef-info-title">How many months</p>
              <p className="ef-info-body">3 months is the minimum for stable dual-income households with job security. 6 months is the standard recommendation. 9–12 months is appropriate for freelancers, single-income households, commission-based workers, or anyone in a volatile industry.</p>
            </div>
            <div className="ef-info-item">
              <p className="ef-info-title">Replenishing after use</p>
              <p className="ef-info-body">After drawing on your emergency fund, treat restoring it as the top financial priority — ahead of extra debt payments or new investments. The fund only works as a safety net if it stays funded.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="ef-card">
          <p className="ef-section-title">Why an emergency fund is the foundation of financial health</p>
          <div className="ef-prose">
            <p>An emergency fund does something no other financial tool does: it converts financial emergencies into financial inconveniences. A $3,000 car repair or a month of unexpected medical bills is devastating without savings and merely annoying with them. That difference — between an emergency that derails your finances for years and one you handle in an afternoon — is the entire value of the fund.</p>
            <p>Without an emergency fund, unexpected expenses go on credit cards. Credit card debt at 20%+ APR compounds quickly, and what started as a $2,000 emergency can take years to pay off and cost double that in interest. The emergency fund breaks that cycle before it starts.</p>
            <p>It also removes the pressure to make bad financial decisions under stress. When your car breaks down and you have savings, you can take time to get multiple quotes and choose a good mechanic. When you don't, you take whatever solution is fastest — which is almost never the cheapest. The fund buys you options, and options are worth a lot when you're under pressure.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="ef-card">
          <p className="ef-section-title">How to build your emergency fund faster</p>
          <div className="ef-tip-grid">
            <div>
              <p className="ef-tip-num">01</p>
              <p className="ef-tip-title">Automate the contribution</p>
              <p className="ef-tip-body">Set up an automatic transfer to your HYSA on payday — before you have a chance to spend it. Even $50 or $100 per paycheck builds the habit and the balance simultaneously. Automation removes the decision from your path entirely.</p>
            </div>
            <div>
              <p className="ef-tip-num">02</p>
              <p className="ef-tip-title">Start with a $1,000 mini-fund</p>
              <p className="ef-tip-body">If a fully-funded 3–6 month target feels overwhelming, start with $1,000. This covers the most common financial emergencies — a car repair, a medical bill, a broken appliance — and provides meaningful protection while you build toward the full target.</p>
            </div>
            <div>
              <p className="ef-tip-num">03</p>
              <p className="ef-tip-title">Use windfalls deliberately</p>
              <p className="ef-tip-body">Tax refunds, work bonuses, and side income are the fastest path to a fully funded emergency fund. Directing even half of an unexpected windfall to your fund can compress a multi-year saving timeline into months.</p>
            </div>
            <div>
              <p className="ef-tip-num">04</p>
              <p className="ef-tip-title">Keep it separate and boring</p>
              <p className="ef-tip-body">Your emergency fund should be in a dedicated account you don't see regularly — close enough to access in 1–2 business days, far enough that it doesn't tempt casual spending. A separate HYSA at a different bank from your checking account is the classic setup.</p>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="ef-card">
          <p className="ef-section-title">Related tools</p>
          <div className="ef-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="ef-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="ef-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Emergency fund targets vary by individual circumstances. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="ef-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
