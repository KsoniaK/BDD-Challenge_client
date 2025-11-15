// Series.js
import React, { useEffect, useState } from "react";
import AjouterSeries from "./AjouterSeries";

function Series() {
  const [series, setSeries] = useState([]);

  // Charger la liste des séries au montage
  useEffect(() => {
    fetch("https://bdd-challenge-server.onrender.com/medias/series")
      .then((res) => res.json())
      .then((data) => {
        // console.log("Séries reçues :", data);
        setSeries(data);
      })
      .catch((err) => console.error("Erreur fetch séries :", err));
  }, []);

  // Fonction pour ajouter une série
  const ajouterSerie = (titre, image, date) => {
    fetch("https://bdd-challenge-server.onrender.com/medias/series", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre_media: titre,
        image_media: image,
        date_sortie_media: date,
        type_media: "SERIE",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Série ajoutée :", data);

        // Recharger la liste des séries après ajout
        return fetch("https://bdd-challenge-server.onrender.com/medias/series");
      })
      .then((res) => res.json())
      .then((data) => setSeries(data))
      .catch((err) => console.error("Erreur ajout série :", err));
  };

  return (
    <div>
      <h1>Séries</h1>

      <h2>Ajouter une série</h2>
      <AjouterSeries onAddSerie={ajouterSerie} />

      {/* Affichage des séries */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {series.map((serie) => (
          <div key={serie.id_media} style={{ margin: "10px" }}>
            <img
              src={
                serie.image_media.startsWith("/images")
                  ? "https://bdd-challenge-server.onrender.com" + serie.image_media
                  : serie.image_media
              }
              alt={serie.titre_media}
              width="120"
            />
            <h3>{serie.titre_media}</h3>
            <p>{serie.date_sortie_media}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Series;
