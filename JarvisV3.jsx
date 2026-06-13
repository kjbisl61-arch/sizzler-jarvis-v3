import { useState } from "react";

const BRAND = {
  oceanBlue: "#0077B6",
  coral: "#FF6B6B",
  skySurf: "#48CAE4",
  sand: "#FFF3E0",
  charcoal: "#2D3436",
};

const TABS = [
  { id: "org", label: "Org Chart" },
  { id: "today", label: "Today" },
  { id: "ideas", label: "Ideas" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "modules", label: "Modules" },
  { id: "website", label: "Website" },
];

function Tag({ color, children }) {
  const colors = {
    blue: { bg: "#e3f4fd", text: BRAND.oceanBlue },
    coral: { bg: "#ffe8e8", text: BRAND.coral },
    green: { bg: "#e3f9e5", text: "#2d7a3a" },
    gold: { bg: "#fff3cd", text: "#856404" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 700, marginRight: 4, background: c.bg, color: c.text }}>
      {children}
    </span>
  );
}

function Card({ children, accent }) {
  const accents = { blue: BRAND.oceanBlue, coral: BRAND.coral, gold: "#F4A261", sky: BRAND.skySurf };
  return (
    <div style={{ background: "white", borderRadius: 8, padding: "14px 16px", marginBottom: 12, borderLeft: `4px solid ${accents[accent] || BRAND.skySurf}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", color: "#888", marginBottom: 10 }}>{children}</div>;
}

function ChkRow({ children }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f0f0f0" }}>{children}</div>;
}

function Prog({ pct }) {
  return (
    <div style={{ height: 6, background: "#eee", borderRadius: 3, overflow: "hidden", margin: "8px 0" }}>
      <div style={{ height: "100%", borderRadius: 3, background: BRAND.oceanBlue, width: `${pct}%`, transition: "width 0.3s" }} />
    </div>
  );
}

function Btn({ onClick, children, variant = "ghost", size = "md" }) {
  const styles = {
    primary: { background: BRAND.oceanBlue, color: "white", border: `1.5px solid ${BRAND.oceanBlue}` },
    coral: { background: BRAND.coral, color: "white", border: `1.5px solid ${BRAND.coral}` },
    ghost: { background: "transparent", color: BRAND.charcoal, border: "1.5px solid #ddd" },
  };
  const sizes = {
    sm: { padding: "5px 10px", fontSize: "0.72rem" },
    md: { padding: "7px 14px", fontSize: "0.78rem" },
  };
  return (
    <button onClick={onClick} style={{ ...styles[variant], ...sizes[size], borderRadius: 6, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {children}
    </button>
  );
}

function Inp({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #ddd", borderRadius: 6, fontSize: "0.88rem", color: BRAND.charcoal, background: "#fafafa", marginBottom: 8, outline: "none", boxSizing: "border-box" }}
    />
  );
}

function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", padding: "8px 10px", border: "1.5px solid #ddd", borderRadius: 6, fontSize: "0.88rem", color: BRAND.charcoal, background: "#fafafa", marginBottom: 8, outline: "none", boxSizing: "border-box", resize: "vertical", minHeight: 72, fontFamily: "inherit" }}
    />
  );
}

function AlertBox({ children }) {
  return (
    <div style={{ background: "#e3f4fd", borderLeft: `4px solid ${BRAND.oceanBlue}`, padding: "10px 14px", marginBottom: 14, fontSize: "0.85rem", color: BRAND.oceanBlue, borderRadius: "0 6px 6px 0" }}>
      {children}
    </div>
  );
}

// ORG CHART
function OrgTab() {
  const agents = [
    { n: "Maya", r: "Writer", c: "" },
    { n: "Ray", r: "Audio", c: "" },
    { n: "Finn", r: "Video", c: "" },
    { n: "Cleo", r: "Media", c: "" },
    { n: "Marco", r: "Products & services", c: "" },
    { n: "Ada", r: "Document control", c: "ada" },
    { n: "Rex", r: "Database", c: "" },
    { n: "Leo", r: "Contracts", c: "" },
  ];
  const devAgents = [
    { n: "Max", r: "Accounting / budget" },
    { n: "Vera", r: "Legal" },
    { n: "Scout", r: "Web intelligence" },
  ];

  const nodeStyle = (bg, border) => ({
    background: bg, borderRadius: 8, padding: "10px 18px", textAlign: "center",
    border: `1px solid ${border || "#ddd"}`, minWidth: 100,
  });

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Sizzler Operating Hierarchy</div>
      <AlertBox><strong>Foundation layer.</strong> Agent brain/link structure is a future sprint build.</AlertBox>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={nodeStyle(BRAND.oceanBlue, BRAND.oceanBlue)}>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "white" }}>Siz + Jarvis</div>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Strategy & direction</div>
        </div>
        <div style={{ width: 2, height: 20, background: "#ccc" }} />
        <div style={nodeStyle(BRAND.coral, BRAND.coral)}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "white" }}>Ellis</div>
          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Editor - publishing gatekeeper</div>
        </div>
        <div style={{ width: 2, height: 20, background: "#ccc" }} />
        <div style={{ width: "80%", height: 2, background: "#ccc" }} />
        <div style={{ width: 2, height: 10, background: "#ccc" }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, width: "100%" }}>
          {agents.map(a => (
            <div key={a.n} style={{ ...nodeStyle("white"), borderLeft: `3px solid ${a.c === "ada" ? "#F4A261" : BRAND.skySurf}`, minWidth: 95 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>{a.n}</div>
              <div style={{ fontSize: "0.68rem", color: "#888", marginTop: 2, fontStyle: "italic" }}>{a.r}</div>
            </div>
          ))}
        </div>
        <div style={{ width: 2, height: 20, background: "#ccc" }} />
        <div style={{ width: "80%", height: 2, background: "#ccc" }} />
        <div style={{ width: 2, height: 10, background: "#ccc" }} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, width: "100%" }}>
          {devAgents.map(a => (
            <div key={a.n} style={{ ...nodeStyle("white"), borderLeft: "3px solid #aaa", opacity: 0.7, minWidth: 95 }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>{a.n}</div>
              <div style={{ fontSize: "0.68rem", color: "#888", marginTop: 2, fontStyle: "italic" }}>{a.r}</div>
              <Tag color="gold">Under development</Tag>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "#eee", margin: "14px 0" }} />

      <Card>
        <CardTitle>Agent notes</CardTitle>
        <ChkRow><Tag color="gold">Ada</Tag><span style={{ fontSize: "0.85rem" }}>Document control - links with Maya (Writer)</span></ChkRow>
        <ChkRow><Tag color="coral">Ellis</Tag><span style={{ fontSize: "0.85rem" }}>Gates all content - nothing goes live without sign-off</span></ChkRow>
        <ChkRow><Tag color="blue">Scout</Tag><span style={{ fontSize: "0.85rem" }}>Web intelligence - finds relevant people, events, media</span></ChkRow>
      </Card>
    </div>
  );
}

// TODAY
function TodayTab() {
  const [focus, setFocus] = useState("");
  const [focusSaved, setFocusSaved] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, label: "Check in - set today's single focus", done: false },
    { id: 2, label: "Open Jarvis and review Today tab", done: false },
    { id: 3, label: "Complete priority build task", done: false },
    { id: 4, label: "Log session to Builder's Log", done: false },
    { id: 5, label: "End-of-session honest review", done: false },
  ]);

  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Today</div>

      <Card accent="blue">
        <CardTitle>Single lane focus</CardTitle>
        {focusSaved ? (
          <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue }}>
            Focus: {focus} <Btn onClick={() => setFocusSaved(false)} size="sm">Edit</Btn>
          </div>
        ) : (
          <>
            <Inp value={focus} onChange={e => setFocus(e.target.value)} placeholder="What's the one thing getting done today?" />
            <Btn onClick={() => focus.trim() && setFocusSaved(true)} variant="primary" size="sm">Lock it in</Btn>
          </>
        )}
      </Card>

      <Card>
        <CardTitle>Session checklist - {done}/{tasks.length} done</CardTitle>
        <Prog pct={pct} />
        {tasks.map(t => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f0f0f0" }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} style={{ width: 16, height: 16, cursor: "pointer", accentColor: BRAND.oceanBlue }} />
            <label style={{ fontSize: "0.88rem", cursor: "pointer", textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.4 : 1 }}>{t.label}</label>
          </div>
        ))}
      </Card>

      <Card accent="coral">
        <CardTitle>Lane drift check</CardTitle>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>About to start something new? Pause. Is it the single lane? If not - park it in Ideas.</p>
      </Card>

      <Card accent="gold">
        <CardTitle>2-hour rule</CardTitle>
        <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>90-min flag. Hard stop at 2 hours. No exceptions.</p>
      </Card>
    </div>
  );
}

// IDEAS
function IdeasTab() {
  const [ideas, setIdeas] = useState([
    { id: 1, text: "Agent brain/link structure for Org Chart", priority: "high", status: "queued", agent: "Jarvis", created: "13 Jun 2026" },
    { id: 2, text: "Jarvis as repeatable business generator", priority: "high", status: "queued", agent: "Jarvis", created: "13 Jun 2026" },
    { id: 3, text: "Scout - web intelligence agent", priority: "medium", status: "raw", agent: "Scout", created: "13 Jun 2026" },
  ]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [agent, setAgent] = useState("");

  const addIdea = () => {
    if (!text.trim()) return;
    const now = new Date();
    setIdeas([...ideas, {
      id: Date.now(), text: text.trim(), priority, status: "raw", agent: agent.trim(),
      created: now.toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" })
    }]);
    setText(""); setAgent("");
  };

  const updateStatus = (id, status) => setIdeas(ideas.map(i => i.id === id ? { ...i, status } : i));
  const removeIdea = (id) => setIdeas(ideas.filter(i => i.id !== id));

  const sTag = (s) => {
    const m = { raw: ["gold", "Raw"], queued: ["blue", "Queued"], go: ["green", "Go"], "no-go": ["coral", "No-go"] };
    const [c, l] = m[s] || ["gold", s];
    return <Tag color={c}>{l}</Tag>;
  };
  const pTag = (p) => {
    const m = { high: ["coral", "High"], medium: ["blue", "Medium"], low: ["green", "Low"] };
    const [c, l] = m[p] || ["blue", p];
    return <Tag color={c}>{l}</Tag>;
  };

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Ideas Intake</div>

      <Card accent="blue">
        <CardTitle>Capture an idea</CardTitle>
        <Inp value={text} onChange={e => setText(e.target.value)} placeholder="The idea..." />
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ flex: 1, padding: "7px 10px", border: "1.5px solid #ddd", borderRadius: 6, fontSize: "0.85rem", background: "#fafafa" }}>
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <input value={agent} onChange={e => setAgent(e.target.value)} placeholder="Linked agent..." style={{ flex: 1, padding: "7px 10px", border: "1.5px solid #ddd", borderRadius: 6, fontSize: "0.85rem", background: "#fafafa", outline: "none" }} />
        </div>
        <Btn onClick={addIdea} variant="primary" size="sm">Capture idea</Btn>
      </Card>

      <Card>
        <CardTitle>Idea queue ({ideas.length})</CardTitle>
        {ideas.length === 0 && <p style={{ fontSize: "0.85rem", opacity: 0.5 }}>No ideas yet.</p>}
        {ideas.map(idea => (
          <div key={idea.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #f0f0f0", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{idea.text}</div>
              <div style={{ fontSize: "0.7rem", color: "#aaa", marginTop: 2 }}>{sTag(idea.status)} {pTag(idea.priority)} {idea.agent && <Tag color="blue">{idea.agent}</Tag>} Created: {idea.created}</div>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flexShrink: 0 }}>
              <Btn onClick={() => updateStatus(idea.id, "go")} size="sm">Go</Btn>
              <Btn onClick={() => updateStatus(idea.id, "no-go")} variant="coral" size="sm">No-go</Btn>
              <Btn onClick={() => updateStatus(idea.id, "queued")} size="sm">Queue</Btn>
              <Btn onClick={() => removeIdea(idea.id)} size="sm">X</Btn>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// WEEKLY
function WeeklyTab() {
  const [review, setReview] = useState("");
  const [reviewSaved, setReviewSaved] = useState(false);
  const [plan, setPlan] = useState("");
  const [planSaved, setPlanSaved] = useState(false);

  const days = [
    ["Monday", "Production plan + single lane lock"],
    ["Tuesday", "GoPro / content capture session"],
    ["Wednesday", "Buffer + travel prep"],
    ["Thursday", "Flex / travel day"],
    ["Friday", "End-of-week honest review"],
    ["Weekend", "Ocean + rest + recharge"],
  ];

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Weekly Rhythm</div>

      <Card accent="coral">
        <CardTitle>End-of-week honest review</CardTitle>
        {reviewSaved ? (
          <><p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{review}</p><Btn onClick={() => setReviewSaved(false)} size="sm">Edit</Btn></>
        ) : (
          <><Textarea value={review} onChange={e => setReview(e.target.value)} placeholder="What actually happened this week? Be honest..." /><Btn onClick={() => review.trim() && setReviewSaved(true)} variant="coral" size="sm">Save review</Btn></>
        )}
      </Card>

      <Card accent="blue">
        <CardTitle>Monday production plan</CardTitle>
        {planSaved ? (
          <><p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{plan}</p><Btn onClick={() => setPlanSaved(false)} size="sm">Edit</Btn></>
        ) : (
          <><Textarea value={plan} onChange={e => setPlan(e.target.value)} placeholder="What's the one lane for this week?" /><Btn onClick={() => plan.trim() && setPlanSaved(true)} variant="primary" size="sm">Lock plan</Btn></>
        )}
      </Card>

      <Card>
        <CardTitle>Weekly rhythm</CardTitle>
        {days.map(([d, t]) => (
          <div key={d} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f0f0f0" }}>
            <Tag color="blue">{d}</Tag>
            <span style={{ fontSize: "0.85rem" }}>{t}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// MONTHLY
function MonthlyTab() {
  const phases = [
    { label: "Phase 1 - Content before monetisation", status: "active", note: "Now to 6 months" },
    { label: "Phase 2 - Product gifting & brand relationships", status: "pending", note: "6-12 months" },
    { label: "Phase 3 - Affiliate, Patreon, guide, speaking", status: "pending", note: "12+ months" },
  ];

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Monthly Overview</div>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        {[["3", "Pillars"], ["7", "Posts/wk"], ["1", "Video/wk"], ["11", "Agents"]].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: "white", borderRadius: 8, padding: 12, textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: BRAND.oceanBlue }}>{n}</div>
            <div style={{ fontSize: "0.68rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.3px", marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <Card accent="blue">
        <CardTitle>Content pillars</CardTitle>
        <ChkRow><span style={{ fontSize: "1.1rem" }}>🌊</span><span style={{ fontSize: "0.85rem" }}><strong>Ocean</strong> - Bodysurfing, NZ beaches, handplane, GoPro</span></ChkRow>
        <ChkRow><span style={{ fontSize: "1.1rem" }}>🚐</span><span style={{ fontSize: "0.85rem" }}><strong>Road</strong> - Caravan, nomadic life, NZ travel</span></ChkRow>
        <ChkRow><span style={{ fontSize: "1.1rem" }}>🎨</span><span style={{ fontSize: "0.85rem" }}><strong>Human</strong> - Personal story, watercolour, reinvention at 64</span></ChkRow>
      </Card>

      <Card>
        <CardTitle>Growth phases</CardTitle>
        {phases.map(p => (
          <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", flexShrink: 0, background: p.status === "active" ? BRAND.coral : "#ddd" }} />
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "0.85rem" }}>{p.label}</strong>
              <div style={{ fontSize: "0.72rem", color: "#888", marginTop: 1 }}>{p.note}</div>
            </div>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: p.status === "active" ? BRAND.coral : "#aaa" }}>{p.status === "active" ? "NOW" : "UPCOMING"}</span>
          </div>
        ))}
      </Card>

      <Card accent="coral">
        <CardTitle>Posting cadence</CardTitle>
        <ChkRow><Tag color="blue">Instagram</Tag><span style={{ fontSize: "0.85rem" }}>4x/week - 2 Reels, 2 photos</span></ChkRow>
        <ChkRow><Tag color="blue">Facebook</Tag><span style={{ fontSize: "0.85rem" }}>3x/week</span></ChkRow>
        <ChkRow><Tag color="blue">YouTube</Tag><span style={{ fontSize: "0.85rem" }}>1 video + 1 Short/week</span></ChkRow>
      </Card>
    </div>
  );
}

// MODULES
function ModulesTab() {
  const mods = [
    { n: "Sizzler brand kit", s: "done" },
    { n: "Content plan", s: "done" },
    { n: "Brand Bible", s: "done" },
    { n: "Business Plan - executive summary", s: "done" },
    { n: "Business Plan - business description", s: "done" },
    { n: "Sizzler Architecture v1.1", s: "done" },
    { n: "Sizzler Project Plan v1.0", s: "done" },
    { n: "Website development flow", s: "done" },
    { n: "Builder's Log app", s: "done" },
    { n: "Control Centre app", s: "done" },
    { n: "Jarvis V3", s: "active" },
    { n: "Ideas intake database", s: "next" },
    { n: "Rex database", s: "pending" },
    { n: "NZ Bodysurfing Guide", s: "pending" },
    { n: "Patreon setup", s: "pending" },
  ];

  const done = mods.filter(m => m.s === "done").length;
  const pct = Math.round((done / mods.length) * 100);

  const sTag = (s) => {
    if (s === "done") return <Tag color="green">Done</Tag>;
    if (s === "active") return <Tag color="coral">Active</Tag>;
    if (s === "next") return <Tag color="blue">Next</Tag>;
    return <Tag color="gold">Pending</Tag>;
  };

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Modules</div>
      <Card accent="blue">
        <CardTitle>Build progress - {done}/{mods.length} complete</CardTitle>
        <Prog pct={pct} />
        <p style={{ fontSize: "0.78rem", color: "#888", marginTop: 6 }}>{pct}% of Sizzler ecosystem built</p>
      </Card>
      <Card>
        <CardTitle>All modules</CardTitle>
        {mods.map(m => (
          <div key={m.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
            <span style={{ fontSize: "0.85rem" }}>{m.n}</span>
            {sTag(m.s)}
          </div>
        ))}
      </Card>
    </div>
  );
}

// WEBSITE
function WebsiteTab() {
  const phases = [
    { phase: "Foundation", items: ["Domain & hosting", "Brand colours + fonts live", "Home page skeleton"] },
    { phase: "Rooms", items: ["About / Story page", "Ocean page", "Road page", "Human page"] },
    { phase: "Furniture", items: ["Content feed integration", "Contact form", "Links to socials"] },
    { phase: "Automation", items: ["Email capture", "Affiliate links", "Patreon integration"] },
  ];

  return (
    <div>
      <div style={{ fontSize: "1rem", fontWeight: 700, color: BRAND.oceanBlue, marginBottom: 14 }}>Website Build</div>
      <AlertBox><strong>Guiding principle:</strong> Foundation - Rooms - Furniture - Automation</AlertBox>
      <Card accent="blue">
        <CardTitle>Build status</CardTitle>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Foundation", "Rooms", "Furniture", "Automation"].map((p, i) => (
            <div key={p} style={{ textAlign: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: i === 0 ? BRAND.coral : "#ddd", margin: "0 auto 4px" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>{p}</span>
            </div>
          ))}
        </div>
      </Card>
      {phases.map(p => (
        <Card key={p.phase}>
          <CardTitle>{p.phase}</CardTitle>
          {p.items.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f0f0f0" }}>
              <input type="checkbox" style={{ width: 16, height: 16, cursor: "pointer", accentColor: BRAND.oceanBlue }} />
              <label style={{ fontSize: "0.88rem", cursor: "pointer" }}>{item}</label>
            </div>
          ))}
        </Card>
      ))}
      <Card accent="coral">
        <CardTitle>8 sections - website development flow</CardTitle>
        {["Vision", "Brand", "Structure", "Content", "Design", "Tech", "Launch", "Build order"].map(s => (
          <div key={s} style={{ padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}>
            <Tag color="blue">{s}</Tag>
          </div>
        ))}
      </Card>
    </div>
  );
}

// APP ROOT
export default function App() {
  const [active, setActive] = useState("org");

  const renderTab = () => {
    switch (active) {
      case "org": return <OrgTab />;
      case "today": return <TodayTab />;
      case "ideas": return <IdeasTab />;
      case "weekly": return <WeeklyTab />;
      case "monthly": return <MonthlyTab />;
      case "modules": return <ModulesTab />;
      case "website": return <WebsiteTab />;
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", color: BRAND.charcoal, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ background: BRAND.oceanBlue, padding: "16px 20px 12px", display: "flex", alignItems: "baseline", gap: 12, borderRadius: "10px 10px 0 0" }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "white", margin: 0 }}>Sizzler Jarvis V3</h1>
        <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}>Wave, Road & Everything Between</span>
      </div>

      <div style={{ display: "flex", background: BRAND.charcoal, overflowX: "auto" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              flex: 1, minWidth: 72, padding: "11px 6px",
              background: "transparent", border: "none",
              borderBottom: active === t.id ? `3px solid ${BRAND.skySurf}` : "3px solid transparent",
              color: active === t.id ? BRAND.skySurf : "rgba(255,255,255,0.45)",
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.4px",
              textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ background: BRAND.sand, padding: 20, minHeight: 400, borderRadius: "0 0 10px 10px", border: "1px solid #ddd", borderTop: "none" }}>
        {renderTab()}
      </div>
    </div>
  );
}
