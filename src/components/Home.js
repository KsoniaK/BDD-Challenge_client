import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenue</h1>

      <section style={{ margin: "20px 0" }}>
        <h3>Films</h3>
        <Link to="/films">
          <button>Voir le contenu des Films</button>
        </Link>
      </section>

      <section style={{ margin: "20px 0" }}>
        <h3>Séries</h3>
        <Link to="/series">
          <button>Voir le contenu des Séries</button>
        </Link>
      </section>
    </div>
  );
}
