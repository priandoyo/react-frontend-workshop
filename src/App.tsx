import { useEffect, useState } from "react";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    // Fetch directly from GitHub raw content
    const baseUrl = "https://raw.githubusercontent.com/priandoyo/react-frontend-workshop/main/public";
    const cacheBuster = `?t=${new Date().getTime()}`;
    
    fetch(`${baseUrl}/text1.txt${cacheBuster}`)
      .then(res => res.text())
      .then(data => setText1(data))
      .catch(err => console.error("Error fetching text1:", err));

    fetch(`${baseUrl}/text2.txt${cacheBuster}`)
      .then(res => res.text())
      .then(data => setText2(data))
      .catch(err => console.error("Error fetching text2:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Hello World Frontend Workshop</h1>

      <h2>Text From Files</h2>
      <p>{text1}</p>
      <p>{text2}</p>
      <h2>Sample Image</h2>
      <img src="/puncak.jpg" width="300" />
    </div>
  );
}