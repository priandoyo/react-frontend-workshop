import { useEffect, useState } from "react";

export default function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  useEffect(() => {
    fetch("/text1.txt")
      .then(res => res.text())
      .then(data => setText1(data));

    fetch("/text2.txt")
      .then(res => res.text())
      .then(data => setText2(data));
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
