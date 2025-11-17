// Series.js
import React, { useEffect, useState } from "react";
import AjouterFilms from "./AjouterFilms";

const API = process.env.REACT_APP_API_URL;
console.log("API URL utilisée :", API);



function Films() {
  const [films, setFilms] = useState([]);

  // Charger la liste des films au montage
  useEffect(() => {
    fetch(`${API}/read/genre/films`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Films reçues :", data);
        setFilms(data);
      })
      .catch((err) => console.error("Erreur fetch films :", err));
  }, []);

  // Fonction pour ajouter un film
  const ajouterFilm = (titre, image, date) => {
    fetch(`${API}/read/genre/films`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre_media: titre,
        image_media: image,
        date_sortie_media: date,
        type_media: "FILM",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Film ajouté :", data);

        // Recharger la liste des films après ajout
        return fetch(`${API}/read/genre/films`);
      })
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Erreur ajout film :", err));
  };

  return (
    <div>
      <h1>Films</h1>

      <h2>Ajouter un film</h2>
      <AjouterFilms onAddFilm={ajouterFilm} />

      {/* Affichage des films */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {films.map((film) => (
          <div key={film.id_media} style={{ margin: "10px" }}>
            <img
              src={
                film.image_media && film.image_media.startsWith("/images")
                  ? `${API}${film.image_media}`
                  : film.image_media || "https://placehold.co/120x180?text=No+Image"
              }
              alt={film.titre_media}
              width="120"
            />
            <h3>{film.titre_media}</h3>
            <p>{film.date_sortie_media}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Films;
