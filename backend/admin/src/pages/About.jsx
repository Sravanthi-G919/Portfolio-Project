import { useEffect, useState } from "react";
import { getAbout, updateAbout } from "../services/api";

function About() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    const data = await getAbout();
    setContent(data.content || "");
  };

  const handleSave = async () => {
    await updateAbout(content);
    setMessage("About information updated successfully.");
  };

  return (
    <div>
      <h2>About</h2>

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows="8"
        cols="60"
        placeholder="Enter your About information"
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save About
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default About;