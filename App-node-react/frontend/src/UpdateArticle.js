import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

function UpdateArticle() {
  const [titer, setTitre] = useState('');
  const [date, setDate] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Récupérer les informations de l'article au chargement du composant
  useEffect(() => {
    axios.get(`http://localhost:8082/articles/${id}`)
      .then(res => {
        const article = res.data[0];
        setTitre(article.titre);
        setDate(article.date.split('T')[0]);
        setPrix(article.prix);
        setImage(article.image); // Gérer l'image existante
      })
      .catch(err => console.log(err));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault(); // empêche le rechargement de la page

    const formData = new FormData();
    formData.append('titer', titer);
    formData.append('date', date);
    formData.append('prix', prix);
    if (image) {
      formData.append('image', image); // Inclure l'image si elle est modifiée
    }

    axios.put(`http://localhost:8082/updatearticle/${id}`, formData)
      .then(res => {
        console.log(res); // vérifier la réponse dans la console
        navigate('/articles'); // rediriger vers la page des articles après la soumission
      })
      .catch(err => {
        console.log(err); // loguer l'erreur si quelque chose ne va pas
      });
  }

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={30} />
      <MiniDrawer />
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Update Article</h2>
            <div className="mb-2">
              <label htmlFor="titre">Titre</label>
              <input
                type="text"
                id="titre"
                placeholder="Enter Titre"
                className="form-control"
                onChange={e => setTitre(e.target.value)}
                value={titer}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-control"
                onChange={e => setDate(e.target.value)}
                value={date}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="prix">Prix</label>
              <input
                type="text"
                id="prix"
                placeholder="Enter Prix"
                className="form-control"
                onChange={e => setPrix(e.target.value)}
                value={prix}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image">Image (optionnelle)</label>
              <input
                type="file"
                id="image"
                className="form-control"
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-success">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateArticle;
