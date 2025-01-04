import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MiniDrawer from "./components/MiniDrawer";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

function CreateArticle() {
  const [titer, setTiter] = useState("");
  const [date, setDate] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null); // Stockage de l'image
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Utilisation de FormData pour inclure l'image dans la requête
    const formData = new FormData();
    formData.append("titer", titer);
    formData.append("date", date);
    formData.append("prix", prix);
    formData.append("image", image);

    axios
      .post("http://localhost:8082/createarticle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res); // Vérifie la réponse dans la console
        navigate("/articles"); // Redirige vers la liste des articles après la soumission
      })
      .catch((err) => {
        console.log(err); // Logue l'erreur en cas de problème
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Stocke l'image sélectionnée
  };

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={30} />
      <MiniDrawer />
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded shadow p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className="text-center mb-4">Ajouter un Article</h2>
            <div className="mb-3">
              <label htmlFor="titer" className="form-label">
                Titre
              </label>
              <input
                type="text"
                id="titer"
                placeholder="Entrez le titre"
                className="form-control"
                onChange={(e) => setTiter(e.target.value)}
                value={titer}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prix" className="form-label">
                Prix
              </label>
              <input
                type="number"
                id="prix"
                placeholder="Entrez le prix"
                className="form-control"
                onChange={(e) => setPrix(e.target.value)}
                value={prix}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
