import { SYLLABUS } from "../data/syllabus";

export default function Header({ selectedArea, onSelectArea, onToggleSidebar }) {
  const totalTopics = SYLLABUS.reduce((s, a) => s + a.topics.length, 0);

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1f2e 0%, #0f1117 100%)",
      borderBottom: "1px solid #2a2f3e",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flexShrink: 0,
      zIndex: 10,
    }}>
      <button
        onClick={onToggleSidebar}
        title="Toggle sidebar"
        style={{
          background: "#1e2230",
          border: "none",
          color: "#a0a8b8",
          cursor: "pointer",
          fontSize: "16px",
          padding: "6px 10px",
          borderRadius: "6px",
          transition: "background 0.15s",
          flexShrink: 0,
        }}
      >
        ☰
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "22px" }}>📖</span>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#f0e8d8", letterSpacing: "0.3px" }}>
            NSCT Study Hub
          </div>
          <div style={{ fontSize: "11px", color: "#4b5563" }}>
            HEC National Skill Competency Test · April 4–5, 2026 · {totalTopics} topics
          </div>
        </div>
      </div>

      <div style={{
        marginLeft: "auto",
        display: "flex",
        gap: "6px",
        alignItems: "center",
      }}>
        {SYLLABUS.map((a) => (
          <div
            key={a.id}
            title={`${a.area} (${a.weight})`}
            onClick={() => onSelectArea(a)}
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              background: a.color,
              opacity: selectedArea?.id === a.id ? 1 : 0.25,
              cursor: "pointer",
              transition: "opacity 0.2s, transform 0.2s",
              transform: selectedArea?.id === a.id ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
