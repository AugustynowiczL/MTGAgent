import { useState } from "react";
import axios from "axios";

export default function FullDeckBuilder() {
  const [commander, setCommander] = useState("");
  const [counts, setCounts] = useState({
    creature: 20,
    artifact: 5,
    enchantment: 5,
    instant: 5,
    sorcery: 5,
    land: 20,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCounts({
      ...counts,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        commander,
        creature_number: counts.creature,
        artifact_number: counts.artifact,
        enchantment_number: counts.enchantment,
        instant_number: counts.instant,
        sorcery_number: counts.sorcery,
        land_number: counts.land,
      };

      const res = await axios.post("http://localhost:8000/fullDeck", payload);
      setResults(res.data);
    } catch (err) {
      console.error("API error", err);
      setResults(null);
    } finally {
      setLoading(false);
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
          maxWidth: "700px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#343a40" }}>
          Full Commander Deck Generator
        </h2>

       <div style={{ marginBottom: "30px" }}>
      {/* 🔹 Section: Commander */}
      <h3 style={{ marginBottom: "10px", color: "#343a40" }}>Commander</h3>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Commander Name"
          value={commander}
          onChange={(e) => setCommander(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </div>

      {/* 🔹 Section: Card Counts */}
      <h3 style={{ marginBottom: "10px", color: "#343a40" }}>Number of Cards per Type</h3>
      {Object.entries(counts).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
          <label
            htmlFor={key}
            style={{
              minWidth: "120px",
              textTransform: "capitalize",
              color: "#495057",
            }}
          >
            {key} cards:
          </label>
          <input
            id={key}
            type="number"
            name={key}
            value={value}
            onChange={handleChange}
            style={{
              padding: "10px",
              width: "100px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>
      ))}
      </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Deck"}
        </button>

        {results && (
          <div style={{ marginTop: "40px", color: "#212529" }}>
            {Object.entries(results).map(([category, cards]) => (
              <div key={category} style={{ marginBottom: "20px" }}>
                <h4 style={{ textTransform: "capitalize" }}>
                  {category.replace("Cards", "")}
                </h4>
                <ul style={{ paddingLeft: "20px" }}>
                  {cards.map((card, idx) => (
                    <li key={idx} style={{ padding: "4px 0" }}>
                      {card}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
