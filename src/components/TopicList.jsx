export default function TopicList({ area, selectedTopic, onSelectTopic }) {
  if (!area) return null;

  return (
    <div style={{
      width: "230px",
      flexShrink: 0,
      background: "#111420",
      borderRight: "1px solid #1e2230",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        padding: "14px",
        borderBottom: "1px solid #1e2230",
        position: "sticky",
        top: 0,
        background: "#111420",
        zIndex: 1,
      }}>
        <div style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: area.color,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <span>{area.icon}</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {area.area}
          </span>
        </div>
        <div style={{ fontSize: "11px", color: "#4b5563", marginTop: "4px" }}>
          {area.topics.length} topics · Weightage: {area.weight}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {area.topics.map((topic, i) => {
          const isSelected = selectedTopic === topic;
          return (
            <button
              key={i}
              onClick={() => onSelectTopic(topic)}
              style={{
                display: "block",
                width: "100%",
                padding: "9px 14px",
                background: isSelected ? `${area.color}20` : "transparent",
                border: "none",
                borderLeft: isSelected ? `2px solid ${area.color}` : "2px solid transparent",
                color: isSelected ? "#f0e8d8" : "#7a8494",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "12px",
                lineHeight: "1.5",
                transition: "all 0.12s",
              }}
            >
              <span style={{
                color: "#2a3040",
                marginRight: "8px",
                fontFamily: "monospace",
                fontSize: "10px",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
}
