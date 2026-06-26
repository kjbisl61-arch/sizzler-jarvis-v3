import { useState, useEffect } from "react";

const OCEAN_BLUE = "#0077B6";
const CORAL = "#FF6B6B";
const SKY = "#48CAE4";
const SAND = "#FFF3E0";
const DARK = "#2D3436";

const TABS = [
  { id: "org", label: "Org Chart" },
  { id: "today", label: "Today" },
  { id: "ideas", label: "Ideas" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "modules", label: "Modules" },
  { id: "website", label: "Website" },
  { id: "rex", label: "Rex" },
];

function Tag({ color, children }) {
  const map = {
    blue: { bg: "#e3f4fd", color: OCEAN_BLUE },
    coral: { bg: "#ffe8e8", color: CORAL },
    green: { bg: "#e3f9e5", color: "#2d7a3a" },
    gold: { bg: "#fff3cd", color: "#856404" },
  };
  const s = map[color] || map.blue;
  return (
    <span style={{ display:"inline-block", padding:"2px 8px", borderRadius:20, fontSize:"0.7rem", fontWeight:700, marginRight:4, background:s.bg, color:s.color }}>
      {children}
    </span>
  );
}

function Card({ children, accent }) {
  const borders = { blue:OCEAN_BLUE, coral:CORAL, gold:"#F4A261", sky:SKY };
  return (
    <div style={{ background:"white", borderRadius:8, padding:"14px 16px", marginBottom:12, borderLeft:`4px solid ${borders[accent]||SKY}`, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <div style={{ fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px", color:"#888", marginBottom:10 }}>{children}</div>;
}

function Prog({ pct }) {
  return (
    <div style={{ height:6, background:"#eee", borderRadius:3, overflow:"hidden", margin:"8px 0" }}>
      <div style={{ height:"100%", borderRadius:3, background:OCEAN_BLUE, width:`${pct}%` }} />
    </div>
  );
}

function AlertBox({ children }) {
  return (
    <div style={{ background:"#e3f4fd", borderLeft:`4px solid ${OCEAN_BLUE}`, padding:"10px 14px", marginBottom:14, fontSize:"0.85rem", color:OCEAN_BLUE, borderRadius:"0 6px 6px 0" }}>
      {children}
    </div>
  );
}

// ─── REX TAB ────────────────────────────────────────────────────────────────

const REX_KEY = "rex_client_profile";

const EMPTY_PROFILE = {
  fullName: "",
  email: "",
  dateRegistered: "",
  location: "",
  notes: "",
  knoxStatus: "pending",
  lastLogin: "",
  activeJobs: "",
  ipTimestamp: "",
};

function RexTab() {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(EMPTY_PROFILE);
  const [saved, setSaved] = useState(false);
  const [importError, setImportError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(REX_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      }
    } catch (e) {
      console.error("Rex load error:", e);
    }
  }, []);

  const saveProfile = (data) => {
    const withTimestamp = {
      ...data,
      ipTimestamp: data.ipTimestamp || new Date().toISOString(),
      dateRegistered: data.dateRegistered || new Date().toLocaleDateString("en-NZ", { day:"numeric", month:"short", year:"numeric" }),
    };
    try {
      localStorage.setItem(REX_KEY, JSON.stringify(withTimestamp));
      setProfile(withTimestamp);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error("Rex save error:", e);
    }
  };

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(EMPTY_PROFILE);
  };

  const exportProfile = () => {
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rex_profile_${profile.fullName.replace(/\s+/g,"_") || "export"}_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = (e) => {
    setImportError("");
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        saveProfile(parsed);
      } catch {
        setImportError("File could not be read. Make sure it is a Rex export file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const inp = {
    width: "100%",
    padding: "8px 10px",
    border: "1.5px solid #ddd",
    borderRadius: 6,
    fontSize: "0.85rem",
    background: "#fafafa",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 8,
    fontFamily: "inherit",
  };

  const isBlank = !profile.fullName && !profile.email;

  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Rex — Client Database</div>

      {isBlank && !editing && (
        <AlertBox>No client profile stored yet. Create one to get started.</AlertBox>
      )}

      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <div style={{ background:"white", borderRadius:8, padding:"10px 14px", flex:1, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", textAlign:"center" }}>
          <div style={{ fontSize:"1.2rem", fontWeight:700, color:OCEAN_BLUE }}>v1</div>
          <div style={{ fontSize:"0.65rem", color:"#888", textTransform:"uppercase", letterSpacing:"0.3px" }}>Version</div>
        </div>
        <div style={{ background:"white", borderRadius:8, padding:"10px 14px", flex:1, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", textAlign:"center" }}>
          <div style={{ fontSize:"1.2rem", fontWeight:700, color:isBlank ? "#ccc" : "#2d7a3a" }}>{isBlank ? "—" : "✓"}</div>
          <div style={{ fontSize:"0.65rem", color:"#888", textTransform:"uppercase", letterSpacing:"0.3px" }}>Profile</div>
        </div>
        <div style={{ background:"white", borderRadius:8, padding:"10px 14px", flex:1, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", textAlign:"center" }}>
          <div style={{ fontSize:"1.2rem", fontWeight:700, color: profile.knoxStatus === "active" ? "#2d7a3a" : CORAL }}>
            {profile.knoxStatus === "active" ? "✓" : "—"}
          </div>
          <div style={{ fontSize:"0.65rem", color:"#888", textTransform:"uppercase", letterSpacing:"0.3px" }}>Knox</div>
        </div>
        <div style={{ background:"white", borderRadius:8, padding:"10px 14px", flex:1, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", textAlign:"center" }}>
          <div style={{ fontSize:"1.2rem", fontWeight:700, color:OCEAN_BLUE }}>1</div>
          <div style={{ fontSize:"0.65rem", color:"#888", textTransform:"uppercase", letterSpacing:"0.3px" }}>Clients</div>
        </div>
      </div>

      {editing ? (
        <Card accent="blue">
          <CardTitle>Edit client profile</CardTitle>

          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#666", display:"block", marginBottom:3 }}>Full name</label>
          <input style={inp} value={draft.fullName} onChange={e => setDraft({...draft, fullName:e.target.value})} placeholder="Full name" />

          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#666", display:"block", marginBottom:3 }}>Email</label>
          <input style={inp} value={draft.email} onChange={e => setDraft({...draft, email:e.target.value})} placeholder="Email address" />

          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#666", display:"block", marginBottom:3 }}>Location</label>
          <input style={inp} value={draft.location} onChange={e => setDraft({...draft, location:e.target.value})} placeholder="City / region" />

          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#666", display:"block", marginBottom:3 }}>Knox auth status</label>
          <select style={{ ...inp }} value={draft.knoxStatus} onChange={e => setDraft({...draft, knoxStatus:e.target.value})}>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>

          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#666", display:"block", marginBottom:3 }}>Active jobs</label>
          <input style={inp} value={draft.activeJobs} onChange={e => setDraft({...draft, activeJobs:e.target.value})} placeholder="e.g. Job 5 — Rex database" />

          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#666", display:"block", marginBottom:3 }}>Notes / background</label>
          <textarea style={{ ...inp, resize:"vertical", minHeight:72 }} value={draft.notes} onChange={e => setDraft({...draft, notes:e.target.value})} placeholder="Personal notes, background, context..." />

          <div style={{ display:"flex", gap:8, marginTop:4 }}>
            <button onClick={() => saveProfile(draft)} style={{ padding:"7px 16px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>Save to Rex</button>
            <button onClick={cancelEdit} style={{ padding:"7px 16px", borderRadius:6, background:"transparent", color:DARK, border:"1.5px solid #ddd", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>Cancel</button>
          </div>
        </Card>
      ) : (
        <Card accent="blue">
          <CardTitle>Client profile</CardTitle>
          {[
            ["Full name", profile.fullName],
            ["Email", profile.email],
            ["Location", profile.location],
            ["Date registered", profile.dateRegistered],
            ["Last login", profile.lastLogin || "—"],
            ["Active jobs", profile.activeJobs || "—"],
          ].map(([label, value]) => (
            <div key={label} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0", alignItems:"flex-start" }}>
              <span style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", minWidth:110 }}>{label}</span>
              <span style={{ fontSize:"0.85rem", color: value && value !== "—" ? DARK : "#ccc" }}>{value || "—"}</span>
            </div>
          ))}
          {profile.notes && (
            <div style={{ padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}>
              <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", marginBottom:4 }}>Notes</div>
              <div style={{ fontSize:"0.85rem", lineHeight:1.6 }}>{profile.notes}</div>
            </div>
          )}
          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap", alignItems:"center" }}>
            <Tag color={profile.knoxStatus === "active" ? "green" : "gold"}>Knox: {profile.knoxStatus}</Tag>
            {saved && <Tag color="green">Saved ✓</Tag>}
          </div>
          <button onClick={startEdit} style={{ marginTop:12, padding:"7px 16px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>
            {isBlank ? "Create profile" : "Edit profile"}
          </button>
        </Card>
      )}

      <Card accent="coral">
        <CardTitle>Security — Knox status</CardTitle>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0" }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background: profile.knoxStatus === "active" ? "#2d7a3a" : CORAL, flexShrink:0 }} />
          <span style={{ fontSize:"0.85rem" }}>
            {profile.knoxStatus === "active" ? "Knox clearance active — profile secured" : "Knox clearance pending — set status to active when authentication is confirmed"}
          </span>
        </div>
        <div style={{ padding:"7px 0", borderTop:"1px solid #f0f0f0", marginTop:4 }}>
          <span style={{ fontSize:"0.72rem", color:"#aaa" }}>IP timestamp: {profile.ipTimestamp ? new Date(profile.ipTimestamp).toLocaleString("en-NZ") : "—"}</span>
        </div>
      </Card>

      <Card accent="gold">
        <CardTitle>Export & import — laptop migration</CardTitle>
        <p style={{ fontSize:"0.82rem", color:"#666", lineHeight:1.6, marginBottom:10 }}>
          Export saves your Rex profile as a JSON file. Import loads it back — use this when migrating to your new laptop in July.
        </p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button
            onClick={exportProfile}
            disabled={isBlank}
            style={{ padding:"7px 16px", borderRadius:6, background: isBlank ? "#eee" : "#F4A261", color: isBlank ? "#aaa" : "white", border:"none", cursor: isBlank ? "not-allowed" : "pointer", fontSize:"0.78rem", fontWeight:700 }}
          >
            Export to JSON
          </button>
          <label style={{ padding:"7px 16px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>
            Import from JSON
            <input type="file" accept=".json" onChange={importProfile} style={{ display:"none" }} />
          </label>
        </div>
        {importError && <p style={{ fontSize:"0.78rem", color:CORAL, marginTop:8 }}>{importError}</p>}
      </Card>

      <div style={{ fontSize:"0.72rem", color:"#aaa", textAlign:"center", marginTop:8 }}>
        Rex v1 — localStorage — single client — scale to multi-client in v2
      </div>
    </div>
  );
}

// ─── EXISTING COMPONENTS ────────────────────────────────────────────────────

function OrgTab() {
  const agents = [
    { n:"Maya", r:"Writer", ada:false },
    { n:"Ray", r:"Audio", ada:false },
    { n:"Finn", r:"Video", ada:false },
    { n:"Cleo", r:"Media", ada:false },
    { n:"Marco", r:"Products & services", ada:false },
    { n:"Ada", r:"Document control", ada:true },
    { n:"Rex", r:"Database", ada:false },
    { n:"Leo", r:"Contracts", ada:false },
  ];
  const devAgents = [
    { n:"Max", r:"Accounting / budget" },
    { n:"Vera", r:"Legal" },
    { n:"Scout", r:"Web intelligence" },
  ];
  const line = { width:2, height:20, background:"#ccc", margin:"0 auto" };
  const hline = { width:"80%", height:2, background:"#ccc", margin:"0 auto" };
  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Sizzler Operating Hierarchy</div>
      <AlertBox><strong>Foundation layer.</strong> Agent brain/link structure is a future sprint build.</AlertBox>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ background:OCEAN_BLUE, border:`1px solid ${OCEAN_BLUE}`, borderRadius:8, padding:"10px 18px", textAlign:"center", minWidth:150 }}>
          <div style={{ fontSize:"0.9rem", fontWeight:700, color:"white" }}>Siz + Jarvis</div>
          <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.7)", marginTop:2 }}>Strategy & direction</div>
        </div>
        <div style={line} />
        <div style={{ background:CORAL, border:`1px solid ${CORAL}`, borderRadius:8, padding:"10px 18px", textAlign:"center", minWidth:150 }}>
          <div style={{ fontSize:"0.85rem", fontWeight:700, color:"white" }}>Ellis</div>
          <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.7)", marginTop:2 }}>Editor - publishing gatekeeper</div>
        </div>
        <div style={line} />
        <div style={hline} />
        <div style={{ ...line, height:10 }} />
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, width:"100%" }}>
          {agents.map(a => (
            <div key={a.n} style={{ background:"white", borderRadius:8, padding:"10px 14px", textAlign:"center", border:"1px solid #ddd", borderLeft:`3px solid ${a.ada?"#F4A261":SKY}`, minWidth:95 }}>
              <div style={{ fontSize:"0.82rem", fontWeight:700 }}>{a.n}</div>
              <div style={{ fontSize:"0.68rem", color:"#888", marginTop:2, fontStyle:"italic" }}>{a.r}</div>
            </div>
          ))}
        </div>
        <div style={line} />
        <div style={hline} />
        <div style={{ ...line, height:10 }} />
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, width:"100%" }}>
          {devAgents.map(a => (
            <div key={a.n} style={{ background:"white", borderRadius:8, padding:"10px 14px", textAlign:"center", border:"1px solid #ddd", borderLeft:"3px solid #aaa", minWidth:95, opacity:0.7 }}>
              <div style={{ fontSize:"0.82rem", fontWeight:700 }}>{a.n}</div>
              <div style={{ fontSize:"0.68rem", color:"#888", marginTop:2, fontStyle:"italic" }}>{a.r}</div>
              <div style={{ marginTop:4 }}><Tag color="gold">Under development</Tag></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height:1, background:"#eee", margin:"14px 0" }} />
      <Card>
        <CardTitle>Agent notes</CardTitle>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}><Tag color="gold">Ada</Tag><span style={{ fontSize:"0.85rem" }}>Document control - links with Maya (Writer)</span></div>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}><Tag color="coral">Ellis</Tag><span style={{ fontSize:"0.85rem" }}>Gates all content - nothing goes live without sign-off</span></div>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0" }}><Tag color="blue">Scout</Tag><span style={{ fontSize:"0.85rem" }}>Web intelligence - finds relevant people, events, media</span></div>
      </Card>
    </div>
  );
}

function TodayTab() {
  const [focus, setFocus] = useState("");
  const [focusSaved, setFocusSaved] = useState(false);
  const [tasks, setTasks] = useState([
    { id:1, label:"Check in - set today's single focus", done:false },
    { id:2, label:"Open Jarvis and review Today tab", done:false },
    { id:3, label:"Complete priority build task", done:false },
    { id:4, label:"Log session to Builder's Log", done:false },
    { id:5, label:"End-of-session honest review", done:false },
  ]);
  const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, done:!t.done } : t));
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);
  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Today</div>
      <Card accent="blue">
        <CardTitle>Single lane focus</CardTitle>
        {focusSaved
          ? <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE }}>Focus: {focus} <button onClick={() => setFocusSaved(false)} style={{ marginLeft:10, padding:"4px 10px", borderRadius:6, border:"1.5px solid #ddd", background:"transparent", cursor:"pointer", fontSize:"0.72rem", fontWeight:700 }}>Edit</button></div>
          : <><input value={focus} onChange={e => setFocus(e.target.value)} placeholder="What's the one thing getting done today?" style={{ width:"100%", padding:"8px 10px", border:"1.5px solid #ddd", borderRadius:6, fontSize:"0.88rem", marginBottom:8, outline:"none", boxSizing:"border-box" }} /><button onClick={() => focus.trim() && setFocusSaved(true)} style={{ padding:"6px 14px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>Lock it in</button></>
        }
      </Card>
      <Card>
        <CardTitle>Session checklist - {done}/{tasks.length} done</CardTitle>
        <Prog pct={pct} />
        {tasks.map(t => (
          <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} style={{ width:16, height:16, cursor:"pointer", accentColor:OCEAN_BLUE }} />
            <label onClick={() => toggle(t.id)} style={{ fontSize:"0.88rem", cursor:"pointer", textDecoration:t.done?"line-through":"none", opacity:t.done?0.4:1 }}>{t.label}</label>
          </div>
        ))}
      </Card>
      <Card accent="coral"><CardTitle>Lane drift check</CardTitle><p style={{ fontSize:"0.85rem", lineHeight:1.6 }}>About to start something new? Pause. Is it the single lane? If not - park it in Ideas.</p></Card>
      <Card accent="gold"><CardTitle>2-hour rule</CardTitle><p style={{ fontSize:"0.85rem", lineHeight:1.6 }}>90-min flag. Hard stop at 2 hours. No exceptions.</p></Card>
    </div>
  );
}

function IdeasTab() {
  const [ideas, setIdeas] = useState([
    { id:1, text:"Agent brain/link structure for Org Chart", priority:"high", status:"queued", agent:"Jarvis", created:"13 Jun 2026" },
    { id:2, text:"Jarvis as repeatable business generator", priority:"high", status:"queued", agent:"Jarvis", created:"13 Jun 2026" },
    { id:3, text:"Scout - web intelligence agent", priority:"medium", status:"raw", agent:"Scout", created:"13 Jun 2026" },
  ]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [agent, setAgent] = useState("");
  const addIdea = () => {
    if (!text.trim()) return;
    const now = new Date();
    setIdeas([...ideas, { id:Date.now(), text:text.trim(), priority, status:"raw", agent:agent.trim(), created:now.toLocaleDateString("en-NZ",{day:"numeric",month:"short",year:"numeric"}) }]);
    setText(""); setAgent("");
  };
  const updateStatus = (id, s) => setIdeas(ideas.map(i => i.id === id ? { ...i, status:s } : i));
  const removeIdea = (id) => setIdeas(ideas.filter(i => i.id !== id));
  const sTag = (s) => { const m={raw:["gold","Raw"],queued:["blue","Queued"],go:["green","Go"],"no-go":["coral","No-go"]}; const [c,l]=m[s]||["gold",s]; return <Tag color={c}>{l}</Tag>; };
  const pTag = (p) => { const m={high:["coral","High"],medium:["blue","Medium"],low:["green","Low"]}; const [c,l]=m[p]||["blue",p]; return <Tag color={c}>{l}</Tag>; };
  const inp = { padding:"7px 10px", border:"1.5px solid #ddd", borderRadius:6, fontSize:"0.85rem", background:"#fafafa", outline:"none" };
  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Ideas Intake</div>
      <Card accent="blue">
        <CardTitle>Capture an idea</CardTitle>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="The idea..." style={{ ...inp, width:"100%", marginBottom:8, boxSizing:"border-box" }} />
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          <select value={priority} onChange={e => setPriority(e.target.value)} style={{ ...inp, flex:1 }}>
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <input value={agent} onChange={e => setAgent(e.target.value)} placeholder="Linked agent..." style={{ ...inp, flex:1 }} />
        </div>
        <button onClick={addIdea} style={{ padding:"6px 14px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>Capture idea</button>
      </Card>
      <Card>
        <CardTitle>Idea queue ({ideas.length})</CardTitle>
        {ideas.length === 0 && <p style={{ fontSize:"0.85rem", opacity:0.5 }}>No ideas yet.</p>}
        {ideas.map(idea => (
          <div key={idea.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"10px 0", borderBottom:"1px solid #f0f0f0", gap:8 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"0.85rem", lineHeight:1.5 }}>{idea.text}</div>
              <div style={{ fontSize:"0.7rem", color:"#aaa", marginTop:2 }}>{sTag(idea.status)} {pTag(idea.priority)} {idea.agent && <Tag color="blue">{idea.agent}</Tag>} {idea.created}</div>
            </div>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap", flexShrink:0 }}>
              {[["go","Go","ghost"],["no-go","No-go","coral"],["queued","Queue","ghost"]].map(([s,l,v]) => (
                <button key={s} onClick={() => updateStatus(idea.id, s)} style={{ padding:"4px 8px", borderRadius:6, background:v==="coral"?CORAL:"transparent", color:v==="coral"?"white":DARK, border:`1.5px solid ${v==="coral"?CORAL:"#ddd"}`, cursor:"pointer", fontSize:"0.7rem", fontWeight:700 }}>{l}</button>
              ))}
              <button onClick={() => removeIdea(idea.id)} style={{ padding:"4px 8px", borderRadius:6, background:"transparent", color:"#aaa", border:"1.5px solid #ddd", cursor:"pointer", fontSize:"0.7rem", fontWeight:700 }}>X</button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function WeeklyTab() {
  const [review, setReview] = useState("");
  const [reviewSaved, setReviewSaved] = useState(false);
  const [plan, setPlan] = useState("");
  const [planSaved, setPlanSaved] = useState(false);
  const ta = { width:"100%", padding:"8px 10px", border:"1.5px solid #ddd", borderRadius:6, fontSize:"0.88rem", marginBottom:8, outline:"none", boxSizing:"border-box", resize:"vertical", minHeight:72, fontFamily:"inherit" };
  const days = [["Monday","Production plan + single lane lock"],["Tuesday","GoPro / content capture session"],["Wednesday","Buffer + travel prep"],["Thursday","Flex / travel day"],["Friday","End-of-week honest review"],["Weekend","Ocean + rest + recharge"]];
  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Weekly Rhythm</div>
      <Card accent="coral">
        <CardTitle>End-of-week honest review</CardTitle>
        {reviewSaved
          ? <><p style={{ fontSize:"0.85rem", lineHeight:1.6 }}>{review}</p><button onClick={() => setReviewSaved(false)} style={{ marginTop:8, padding:"4px 10px", borderRadius:6, border:"1.5px solid #ddd", background:"transparent", cursor:"pointer", fontSize:"0.72rem", fontWeight:700 }}>Edit</button></>
          : <><textarea value={review} onChange={e => setReview(e.target.value)} placeholder="What actually happened this week? Be honest..." style={ta} /><button onClick={() => review.trim() && setReviewSaved(true)} style={{ padding:"6px 14px", borderRadius:6, background:CORAL, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>Save review</button></>
        }
      </Card>
      <Card accent="blue">
        <CardTitle>Monday production plan</CardTitle>
        {planSaved
          ? <><p style={{ fontSize:"0.85rem", lineHeight:1.6 }}>{plan}</p><button onClick={() => setPlanSaved(false)} style={{ marginTop:8, padding:"4px 10px", borderRadius:6, border:"1.5px solid #ddd", background:"transparent", cursor:"pointer", fontSize:"0.72rem", fontWeight:700 }}>Edit</button></>
          : <><textarea value={plan} onChange={e => setPlan(e.target.value)} placeholder="What's the one lane for this week?" style={ta} /><button onClick={() => plan.trim() && setPlanSaved(true)} style={{ padding:"6px 14px", borderRadius:6, background:OCEAN_BLUE, color:"white", border:"none", cursor:"pointer", fontSize:"0.78rem", fontWeight:700 }}>Lock plan</button></>
        }
      </Card>
      <Card>
        <CardTitle>Weekly rhythm</CardTitle>
        {days.map(([d,t]) => (
          <div key={d} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}>
            <Tag color="blue">{d}</Tag><span style={{ fontSize:"0.85rem" }}>{t}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function MonthlyTab() {
  const phases = [
    { label:"Phase 1 - Content before monetisation", status:"active", note:"Now to 6 months" },
    { label:"Phase 2 - Product gifting & brand relationships", status:"pending", note:"6-12 months" },
    { label:"Phase 3 - Affiliate, Patreon, guide, speaking", status:"pending", note:"12+ months" },
  ];
  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Monthly Overview</div>
      <div style={{ display:"flex", gap:10, marginBottom:14 }}>
        {[["3","Pillars"],["7","Posts/wk"],["1","Video/wk"],["11","Agents"]].map(([n,l]) => (
          <div key={l} style={{ flex:1, background:"white", borderRadius:8, padding:12, textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize:"1.5rem", fontWeight:700, color:OCEAN_BLUE }}>{n}</div>
            <div style={{ fontSize:"0.68rem", color:"#888", textTransform:"uppercase", letterSpacing:"0.3px", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <Card accent="blue">
        <CardTitle>Content pillars</CardTitle>
        {[["🌊","Ocean","Bodysurfing, NZ beaches, handplane, GoPro"],["🚐","Road","Caravan, nomadic life, NZ travel"],["🎨","Human","Personal story, watercolour, reinvention at 64"]].map(([icon,name,desc]) => (
          <div key={name} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}>
            <span style={{ fontSize:"1.1rem" }}>{icon}</span>
            <span style={{ fontSize:"0.85rem" }}><strong>{name}</strong> - {desc}</span>
          </div>
        ))}
      </Card>
      <Card>
        <CardTitle>Growth phases</CardTitle>
        {phases.map(p => (
          <div key={p.label} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:"1px solid #f0f0f0" }}>
            <div style={{ width:12, height:12, borderRadius:"50%", flexShrink:0, background:p.status==="active"?CORAL:"#ddd" }} />
            <div style={{ flex:1 }}><strong style={{ fontSize:"0.85rem" }}>{p.label}</strong><div style={{ fontSize:"0.72rem", color:"#888", marginTop:1 }}>{p.note}</div></div>
            <span style={{ fontSize:"0.68rem", fontWeight:700, color:p.status==="active"?CORAL:"#aaa" }}>{p.status==="active"?"NOW":"UPCOMING"}</span>
          </div>
        ))}
      </Card>
      <Card accent="coral">
        <CardTitle>Posting cadence</CardTitle>
        {[["Instagram","4x/week - 2 Reels, 2 photos"],["Facebook","3x/week"],["YouTube","1 video + 1 Short/week"]].map(([p,c]) => (
          <div key={p} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}>
            <Tag color="blue">{p}</Tag><span style={{ fontSize:"0.85rem" }}>{c}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ModulesTab() {
  const mods = [
    {n:"Sizzler brand kit",s:"done"},{n:"Content plan",s:"done"},{n:"Brand Bible",s:"done"},
    {n:"Business Plan - executive summary",s:"done"},{n:"Business Plan - business description",s:"done"},
    {n:"Sizzler Architecture v1.1",s:"done"},{n:"Sizzler Project Plan v1.0",s:"done"},
    {n:"Website development flow",s:"done"},{n:"Builder's Log app",s:"done"},{n:"Control Centre app",s:"done"},
    {n:"Jarvis V3",s:"active"},{n:"Ideas intake database",s:"next"},
    {n:"Rex database",s:"active"},{n:"NZ Bodysurfing Guide",s:"pending"},{n:"Patreon setup",s:"pending"},
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
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Modules</div>
      <Card accent="blue">
        <CardTitle>Build progress - {done}/{mods.length} complete</CardTitle>
        <Prog pct={pct} />
        <p style={{ fontSize:"0.78rem", color:"#888", marginTop:6 }}>{pct}% of Sizzler ecosystem built</p>
      </Card>
      <Card>
        <CardTitle>All modules</CardTitle>
        {mods.map(m => (
          <div key={m.n} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid #f0f0f0" }}>
            <span style={{ fontSize:"0.85rem" }}>{m.n}</span>{sTag(m.s)}
          </div>
        ))}
      </Card>
    </div>
  );
}

function WebsiteTab() {
  const phases = [
    { phase:"Foundation", items:["Domain & hosting","Brand colours + fonts live","Home page skeleton"] },
    { phase:"Rooms", items:["About / Story page","Ocean page","Road page","Human page"] },
    { phase:"Furniture", items:["Content feed integration","Contact form","Links to socials"] },
    { phase:"Automation", items:["Email capture","Affiliate links","Patreon integration"] },
  ];
  return (
    <div>
      <div style={{ fontSize:"1rem", fontWeight:700, color:OCEAN_BLUE, marginBottom:14 }}>Website Build</div>
      <AlertBox><strong>Guiding principle:</strong> Foundation - Rooms - Furniture - Automation</AlertBox>
      <Card accent="blue">
        <CardTitle>Build status</CardTitle>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          {["Foundation","Rooms","Furniture","Automation"].map((p,i) => (
            <div key={p} style={{ textAlign:"center" }}>
              <div style={{ width:14, height:14, borderRadius:"50%", background:i===0?CORAL:"#ddd", margin:"0 auto 4px" }} />
              <span style={{ fontSize:"0.7rem", fontWeight:700 }}>{p}</span>
            </div>
          ))}
        </div>
      </Card>
      {phases.map(p => (
        <Card key={p.phase}>
          <CardTitle>{p.phase}</CardTitle>
          {p.items.map(item => (
            <div key={item} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid #f0f0f0" }}>
              <input type="checkbox" style={{ width:16, height:16, cursor:"pointer", accentColor:OCEAN_BLUE }} />
              <label style={{ fontSize:"0.88rem", cursor:"pointer" }}>{item}</label>
            </div>
          ))}
        </Card>
      ))}
      <Card accent="coral">
        <CardTitle>8 sections - website development flow</CardTitle>
        {["Vision","Brand","Structure","Content","Design","Tech","Launch","Build order"].map(s => (
          <div key={s} style={{ padding:"6px 0", borderBottom:"1px solid #f0f0f0" }}>
            <Tag color="blue">{s}</Tag>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── APP SHELL ───────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("org");

  const renderTab = () => {
    if (active === "org") return <OrgTab />;
    if (active === "today") return <TodayTab />;
    if (active === "ideas") return <IdeasTab />;
    if (active === "weekly") return <WeeklyTab />;
    if (active === "monthly") return <MonthlyTab />;
    if (active === "modules") return <ModulesTab />;
    if (active === "website") return <WebsiteTab />;
    if (active === "rex") return <RexTab />;
    return null;
  };

  return (
    <div style={{ fontFamily:"sans-serif", color:DARK, maxWidth:900, margin:"0 auto" }}>
      <div style={{ background:OCEAN_BLUE, padding:"16px 20px 12px", display:"flex", alignItems:"baseline", gap:12, borderRadius:"10px 10px 0 0" }}>
        <h1 style={{ fontSize:"1.4rem", fontWeight:700, color:"white", margin:0 }}>Sizzler Jarvis V3</h1>
        <span style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.75)", fontStyle:"italic" }}>Wave, Road & Everything Between</span>
      </div>
      <div style={{ display:"flex", background:DARK, overflowX:"auto" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              flex:1, minWidth:72, padding:"11px 6px",
              background:"transparent", border:"none",
              borderBottom:`3px solid ${active === t.id ? SKY : "transparent"}`,
              color: active === t.id ? SKY : "rgba(255,255,255,0.45)",
              fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.4px",
              textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ background:SAND, padding:20, minHeight:400, borderRadius:"0 0 10px 10px", border:"1px solid #ddd", borderTop:"none" }}>
        {renderTab()}
      </div>
    </div>
  );
}
