import { useState, useRef, useEffect } from "react";
import { SYLLABUS } from "./data/syllabus";
import { fetchTopicNotes, parseContent } from "./services/api";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopicList from "./components/TopicList";
import ContentPanel from "./components/ContentPanel";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedArea, setSelectedArea] = useState(SYLLABUS[0]); // Problem Solving first (20%)
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);

  async function loadTopic(area, topic) {
    setSelectedTopic(topic);
    setContent(null);
    setError(null);
    setLoading(true);

    try {
      const text = await fetchTopicNotes(area.area, topic);
      const parsed = parseContent(text);
      setContent(parsed);
    } catch (err) {
      setError("Failed to generate notes. Please check your connection and try again.");
    }

    setLoading(false);
  }

  function handleSelectArea(area) {
    setSelectedArea(area);
    setSelectedTopic(null);
    setContent(null);
    setError(null);
  }

  function handleRetry() {
    if (selectedArea && selectedTopic) {
      loadTopic(selectedArea, selectedTopic);
    }
  }

  useEffect(() => {
    if (content && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [content]);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0f1117",
      color: "#e8e0d0",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      <Header
        selectedArea={selectedArea}
        onSelectArea={handleSelectArea}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {sidebarOpen && (
          <Sidebar selectedArea={selectedArea} onSelectArea={handleSelectArea} />
        )}

        <TopicList
          area={selectedArea}
          selectedTopic={selectedTopic}
          onSelectTopic={(topic) => loadTopic(selectedArea, topic)}
        />

        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", background: "#0f1117" }}>
          <ContentPanel
            area={selectedArea}
            topic={selectedTopic}
            content={content}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            onSelectArea={handleSelectArea}
          />
        </div>
      </div>
    </div>
  );
}
