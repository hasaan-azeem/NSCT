import { SYLLABUS } from "../data/syllabus";

export default function Sidebar({ selectedArea, onSelectArea }) {
  return (
    <div style={{
      width: "260px",
      flexShrink: 0,
      background: "#13161f",
      borderRight: "1px solid #1e2230",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        padding: "14px 14px 8px",
        fontSize: "10px",
        color: "#4b5563",
        letterSpacing: "2px",
        textTransform: "uppercase",
        borderBottom: "1px solid #1e2230",
        marginBottom: "4px",
      }}>
        Subject Areas
      </div>

      {SYLLABUS.map((area) => {
        const isSelected = selectedArea?.id === area.id;
        return (
          <button
            key={area.id}
            onClick={() => onSelectArea(area)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 14px",
              background: isSelected ? `${area.color}18` : "transparent",
              border: "none",
              borderLeft: isSelected ? `3px solid ${area.color}` : "3px solid transparent",
              color: isSelected ? "#f0e8d8" : "#8892a4",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "12px",
              lineHeight: "1.4",
              transition: "all 0.15s",
              width: "100%",
            }}
          >
            <span style={{ fontSize: "18px", flexShrink: 0 }}>{area.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontWeight: isSelected ? "bold" : "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {area.area}
              </div>
              <div style={{ fontSize: "10px", color: "#4b5563", marginTop: "2px" }}>
                {area.topics.length} topics
              </div>
            </div>
            <span style={{
              fontSize: "10px",
              background: `${area.color}25`,
              color: area.color,
              padding: "2px 7px",
              borderRadius: "10px",
              flexShrink: 0,
              fontWeight: "bold",
            }}>
              {area.weight}
            </span>
          </button>
        );
      })}

      <div style={{
        padding: "12px 14px",
        marginTop: "auto",
        borderTop: "1px solid #1e2230",
        fontSize: "10px",
        color: "#3a4050",
        lineHeight: "1.6",
      }}>
        HEC · NSCT · April 4-5, 2026<br />
        Virtual University of Pakistan
      </div>
    </div>
  );
}
