import { useEffect, useState } from "react";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    // Add timestamp to bypass cache
    const cacheBuster = `?t=${new Date().getTime()}`;
    
    fetch(`/text1.txt${cacheBuster}`)
      .then(res => res.text())
      .then(data => setText1(data));

    fetch(`/text2.txt${cacheBuster}`)
      .then(res => res.text())
      .then(data => setText2(data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Hello World Frontend Workshop: Chaching issues fixed</h2>
      <h3>Chaching issues fixed with happiness</h3>
      <h2>Text From Files</h2>
      <p>{text1}</p>
      <p>{text2}</p>
      <h2>Sample Image</h2>
      <img src="/puncak.jpg" width="300" />
    </div>
  );
}