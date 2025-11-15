import React, { useEffect, useState } from "react";

function Films() {
  const [films, setFilms] = useState([]);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetch("https://bdd-challenge-server.onrender.com/medias/films")
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Erreur fetch films :", err));
  }, []);

  const ajouterFilm = () => {
    fetch("https://bdd-challenge-server.onrender.com/medias/films", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre_media: titre,
        image_media: image,
        date_sortie_media: date,
      }),
    })
      .then((res) => res.json())
      .then((film) => {
        setFilms((prev) => [...prev, film]);
        setTitre("");
        setImage("");
        setDate("");
      })
      .catch((err) => console.error("Erreur ajout film :", err));
  };

  return (
    <div>
      <h1>Films</h1>

      <h3>Ajouter un film</h3>
      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Année"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={ajouterFilm}>Ajouter</button>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {films.map((film, i) => (
            <div key={film.id_media || film.id || i} style={{ margin: "10px" }}>
            <img
              src={
                film.image_media.startsWith("/images")
                  ? "https://bdd-challenge-server.onrender.com" + film.image_media
                  : film.image_media
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
