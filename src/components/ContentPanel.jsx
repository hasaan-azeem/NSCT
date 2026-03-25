import { SYLLABUS } from "../data/syllabus";

function WelcomeScreen({ onSelectArea }) {
  const totalTopics = SYLLABUS.reduce((s, a) => s + a.topics.length, 0);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "40px",
      textAlign: "center",
      animation: "fadeIn 0.4s ease",
    }}>
      <div style={{ fontSize: "56px", marginBottom: "20px" }}>📖</div>
      <h2 style={{ fontSize: "20px", color: "#d0c8b8", marginBottom: "8px", fontWeight: "bold" }}>
        NSCT Study Hub
      </h2>
      <p style={{ fontSize: "13px", color: "#4b5563", maxWidth: "380px", lineHeight: "1.7", marginBottom: "8px" }}>
        AI-powered study notes for all {totalTopics} topics across 10 subject areas.
        Select a subject from the left, then click any topic to generate instant notes,
        key concepts, and MCQ practice questions.
      </p>
      <p style={{ fontSize: "11px", color: "#3a4050", marginBottom: "32px" }}>
        HEC National Skill Competency Test · April 4-5, 2026
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
        width: "100%",
        maxWidth: "480px",
      }}>
        {SYLLABUS.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelectArea(a)}
            style={{
              padding: "12px 16px",
              background: `${a.color}12`,
              border: `1px solid ${a.color}30`,
              borderRadius: "10px",
              color: a.color,
              cursor: "pointer",
              fontSize: "12px",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "all 0.15s",
            }}
          >
            <span>{a.icon} {a.area.split(" ").slice(0, 3).join(" ")}</span>
            <span style={{
              background: `${a.color}25`,
              padding: "2px 7px",
              borderRadius: "8px",
              fontSize: "10px",
              fontWeight: "bold",
            }}>{a.weight}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function LoadingScreen({ topic, color }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", padding: "40px" }}>
      <div style={{
        width: "42px",
        height: "42px",
        border: `3px solid ${color}25`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        margin: "0 auto 20px",
        animation: "spin 0.8s linear infinite",
      }} />
      <div style={{ color: "#6b7280", fontSize: "14px" }}>
        Generating notes for
      </div>
      <div style={{ color, fontSize: "16px", fontWeight: "bold", marginTop: "6px" }}>
        {topic}
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", padding: "40px" }}>
      <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚠️</div>
      <div style={{ color: "#ef4444", fontSize: "14px", marginBottom: "20px" }}>{message}</div>
      <button
        onClick={onRetry}
        style={{
          padding: "10px 20px",
          background: "#ef444420",
          border: "1px solid #ef444440",
          borderRadius: "8px",
          color: "#ef4444",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        Try Again
      </button>
    </div>
  );
}

function ContentSection({ section, color }) {
  const renderLine = (line, j) => {
    if (!line.trim()) return null;

    if (line.match(/^\*\*Q\d+\./)) {
      const cleaned = line.replace(/\*\*/g, "");
      return (
        <div key={j} style={{
          padding: "12px 16px",
          marginBottom: "6px",
          background: "#1a1f2e",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#d0c8b8",
          lineHeight: "1.6",
        }}>
          {cleaned}
        </div>
      );
    }

    if (line.match(/^\*\*Answer:/)) {
      const cleaned = line.replace(/\*\*/g, "");
      return (
        <div key={j} style={{
          padding: "10px 14px",
          marginBottom: "20px",
          background: `${color}15`,
          borderLeft: `3px solid ${color}`,
          borderRadius: "0 6px 6px 0",
          fontSize: "13px",
          color,
          lineHeight: "1.6",
        }}>
          {cleaned}
        </div>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
          <span style={{ color, flexShrink: 0, marginTop: "3px", fontSize: "10px" }}>▸</span>
          <span style={{ fontSize: "14px", color: "#c0b8a8", lineHeight: "1.7" }}>{line.slice(2)}</span>
        </div>
      );
    }

    return (
      <p key={j} style={{ margin: "0 0 12px", fontSize: "14px", color: "#c0b8a8", lineHeight: "1.8" }}>
        {line}
      </p>
    );
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{
        fontSize: "11px",
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color,
        margin: "0 0 14px",
        paddingBottom: "8px",
        borderBottom: `1px solid ${color}25`,
      }}>
        {section.heading}
      </h2>
      <div>{section.content.map((line, j) => renderLine(line, j))}</div>
    </div>
  );
}

export default function ContentPanel({ area, topic, content, loading, error, onRetry, onSelectArea }) {
  if (!topic && !loading) {
    return (
      <div style={{ flex: 1, overflowY: "auto", background: "#0f1117" }}>
        <WelcomeScreen onSelectArea={onSelectArea} />
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ flex: 1, overflowY: "auto", background: "#0f1117" }}>
        <LoadingScreen topic={topic} color={area?.color || "#3b82f6"} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ flex: 1, overflowY: "auto", background: "#0f1117" }}>
        <ErrorScreen message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "#0f1117", padding: "32px 40px" }}>
      <div style={{ maxWidth: "740px", animation: "fadeIn 0.3s ease" }}>
        {/* Topic Header */}
        <div style={{
          marginBottom: "28px",
          paddingBottom: "20px",
          borderBottom: `1px solid ${area.color}30`,
        }}>
          <div style={{
            fontSize: "11px",
            color: area.color,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <span>{area.icon}</span>
            <span>{area.area}</span>
            <span style={{
              background: `${area.color}25`,
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "10px",
              fontWeight: "bold",
            }}>{area.weight}</span>
          </div>
          <h1 style={{ fontSize: "24px", color: "#f0e8d8", fontWeight: "bold", lineHeight: "1.3" }}>
            {topic}
          </h1>
        </div>

        {/* Content Sections */}
        {content.map((section, i) => (
          <ContentSection key={i} section={section} color={area.color} />
        ))}

        {/* Footer actions */}
        <div style={{
          marginTop: "16px",
          padding: "16px",
          background: "#13161f",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          border: "1px solid #1e2230",
        }}>
          <button
            onClick={onRetry}
            style={{
              padding: "8px 18px",
              background: `${area.color}20`,
              border: `1px solid ${area.color}40`,
              borderRadius: "6px",
              color: area.color,
              cursor: "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ↺ Regenerate Notes
          </button>
          <span style={{ fontSize: "11px", color: "#3a4050" }}>
            AI-generated · Select another topic to continue
          </span>
        </div>
      </div>
    </div>
  );
}
