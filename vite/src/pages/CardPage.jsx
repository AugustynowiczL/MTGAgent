import { useState, useEffect } from "react";
import axios from "axios";

export default function CardPage({ cardType }) {
  const [commander, setCommander] = useState("");
  const [count, setCount] = useState(10);
  const [results, setResults] = useState([]);

  // Clear results when cardType changes (i.e., user changes page)
  useEffect(() => {
    setResults([]);
    setCommander("");  // optionally clear inputs too
    setCount(10);
  }, [cardType]);

  const handleSubmit = async () => {
    try {
      //setResults(["Generating", "Please", "Wait"]);
      const response = await axios.post(`http://localhost:8000/${cardType}Cards`, {
        commander,
        card_number: count,
      });
      const key = `${cardType}Cards`;
      setResults(response.data.Cards || []);
      console.log(results);
    } catch (err) {
      console.error("Error fetching cards", err);
      setResults([]);
    }
  };

return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "100vh",
      padding: "40px",
      backgroundColor: "#f8f9fa",
      fontFamily: "Segoe UI, sans-serif",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#343a40" }}>
        {cardType.charAt(0).toUpperCase() + cardType.slice(1)} Cards
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Commander Name"
          value={commander}
          onChange={(e) => setCommander(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            width: "calc(60%)",
          }}
        />
        <input
          type="number"
          placeholder="Number of Cards"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{
            padding: "10px",
            width: "calc(30%)",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Generate
      </button>

      <ul style={{ marginTop: "30px", paddingLeft: "20px", color: "#212529" }}>
        {results && results.length === 0 && <li style={{ color: "#666" }}>No cards yet</li>}
        {results.map((card, idx) => (
          <li key={idx} style={{ padding: "4px 0" }}>
            {card}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
