import { useEffect, useState } from "react";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchContent = () => {
    setLoading(true);
    const baseUrl = "https://raw.githubusercontent.com/priandoyo/react-frontend-workshop/main/public";
    const cacheBuster = `?t=${new Date().getTime()}`;
    
    Promise.all([
      fetch(`${baseUrl}/text1.txt${cacheBuster}`).then(res => res.text()),
      fetch(`${baseUrl}/text2.txt${cacheBuster}`).then(res => res.text())
    ])
    .then(([data1, data2]) => {
      setText1(data1);
      setText2(data2);
      setLastUpdated(new Date());
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching:", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchContent();
    
    // Auto-refresh every 10 seconds to show live updates
    const interval = setInterval(fetchContent, 10000);
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
        <h1 style={{ 
          color: "#333",
          marginBottom: "10px"
        }}>
          🎓 Frontend Workshop v1.2
        </h1>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Live content collaboration demo
        </p>
        {lastUpdated && (
          <p style={{ 
            color: "#999", 
            fontSize: "12px",
            marginTop: "8px"
          }}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
        <button 
          onClick={fetchContent}
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🔄 Refresh Content
        </button>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px",
          color: "#666"
        }}>
          <div style={{ 
            fontSize: "18px",
            marginBottom: "12px"
          }}>
            ⏳ Loading content from GitHub...
          </div>
          <div style={{ fontSize: "14px", color: "#999" }}>
            Fetching latest updates
          </div>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gap: "24px",
          marginBottom: "40px"
        }}>
          {/* User 1's Message */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "white"
          }}>
            <div style={{ 
              fontSize: "12px", 
              fontWeight: "600",
              marginBottom: "8px",
              opacity: 0.9
            }}>
              👤 USER 1
            </div>
            <div style={{ 
              fontSize: "18px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap"
            }}>
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
            <div style={{ 
              fontSize: "12px", 
              fontWeight: "600",
              marginBottom: "8px",
              opacity: 0.9
            }}>
              👤 USER 2
            </div>
            <div style={{ 
              fontSize: "18px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap"
            }}>
              {text2 || "No message yet..."}
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        textAlign: "center",
        marginTop: "60px"
      }}>
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
        Edit <code>text1.txt</code> or <code>text2.txt</code> in GitHub to see live updates!
        <br />
        <small style={{ color: "#999" }}>
          Content refreshes automatically every 10 seconds
        </small>
      </div>
    </div>
  );
}