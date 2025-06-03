import { Link } from "react-router-dom";

export default function Navbar() {
  const categories = ["creature", "artifact", "enchantment", "instant", "land", "sorcery", "deck"];
  
  return (
    <nav style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}>
      {categories.map((category) => (
        <Link key={category} to={`/${category}`} style={{ marginRight: "15px" }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      ))}
    </nav>
  );
}
