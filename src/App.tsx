import { useEffect, useState } from "react";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchContent = () => {
    setLoading(true);
    
    Promise.all([
      fetch('/api/text1').then(res => res.json()),
      fetch('/api/text2').then(res => res.json())
    ])
    .then(([data1, data2]) => {
      setText1(data1.text);
      setText2(data2.text);
      setLastUpdated(new Date());
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching:", err);
      setLoading(false);
    });
  };

  const handleReset = () => {
    if (confirm('Reset both messages to original content from GitHub?')) {
      Promise.all([
        fetch('/api/text1', { method: 'DELETE' }),
        fetch('/api/text2', { method: 'DELETE' })
      ])
      .then(() => {
        fetchContent();
        alert('Messages reset to original! ✅');
      })
      .catch(err => {
        console.error('Reset failed:', err);
        alert('Reset failed ❌');
      });
    }
  };

  useEffect(() => {
    fetchContent();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchContent, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "40px 20px",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          🎓 Frontend Workshop
        </h1>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Live content collaboration demo with API
        </p>
        {lastUpdated && (
          <p style={{ color: "#999", fontSize: "12px", marginTop: "8px" }}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
        
        <div style={{ marginTop: "12px" }}>
          <button 
            onClick={fetchContent}
            style={{
              padding: "8px 16px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              marginRight: "8px"
            }}
          >
            🔄 Refresh Content
          </button>
          
          <button 
            onClick={handleReset}
            style={{
              padding: "8px 16px",
              background: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            🔄 Reset to Original
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
          <div style={{ fontSize: "18px", marginBottom: "12px" }}>
            ⏳ Loading content...
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "24px", marginBottom: "40px" }}>
          {/* User 1's Message */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "white"
          }}>
            <div style={{ fontSize: "12px", fontWeight: "600", marginBottom: "8px", opacity: 0.9 }}>
              👤 USER 1
            </div>
            <div style={{ fontSize: "18px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {text1 || "No message yet..."}
            </div>
          </div>

          {/* User 2's Message */}
          <div style={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "white"
          }}>
            <div style={{ fontSize: "12px", fontWeight: "600", marginBottom: "8px", opacity: 0.9 }}>
              👤 USER 2
            </div>
            <div style={{ fontSize: "18px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
              {text2 || "No message yet..."}
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>Sample Image</h2>
        <img 
          src="/puncak.jpg" 
          alt="Puncak" 
          style={{ 
            maxWidth: "100%",
            width: "400px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }} 
        />
      </div>

      <div style={{
        marginTop: "60px",
        padding: "20px",
        background: "#f8f9fa",
        borderRadius: "8px",
        fontSize: "14px",
        color: "#666",
        textAlign: "center"
      }}>
        <strong>Workshop Instructions:</strong>
        <br />
        <strong>Step 1:</strong> Press F12 → Click "Console" tab
        <br />
        <strong>Step 2:</strong> Type: <code style={{ background: "#fff", padding: "2px 6px" }}>allow pasting</code> and press Enter
        <br />
        <strong>Step 3:</strong> Copy and paste this code (change "Your Name"):
        <br />
        <code style={{ background: "#fff", padding: "8px", display: "block", margin: "8px 0", fontSize: "11px", textAlign: "left", overflowX: "auto" }}>
          fetch('/api/text1', {'{'}method: 'POST', headers: {'{'}
          'Content-Type': 'application/json'{'}'}, body: JSON.stringify({'{'}text: 'Hello from [Your Name]!'{'}'}){'}'}
        </code>
        <strong>Step 4:</strong> Press Enter and wait 5 seconds to see your message!
        <br />
        <small style={{ color: "#999" }}>
          Content refreshes automatically every 5 seconds • Use "Reset to Original" button to restore default messages
        </small>
      </div>
    </div>
  );
}