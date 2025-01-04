import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';

function UpdateFournisseur() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [age, setAge] = useState('');
  const [CIN, setCIN] = useState('');
  const [Email, setEmail] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // empêche le rechargement de la page
    axios.put('http://localhost:8082/update'+id, {nom, prenom, age, CIN, Email })
      .then(res => {
        console.log(res); // vérifier la réponse dans la console
        navigate('/'); // rediriger vers la page d'accueil après la soumission
      })
      .catch(err => {
        console.log(err); // loguer l'erreur si quelque chose ne va pas
      });
  }

  return (
    <div className="bgcolor">
         <Navbar />
         <Box heigth={30} />
        <MiniDrawer />
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2>Update Fournisseur</h2>
            <div className="mb-2">
              <label htmlFor="Nom">Nom</label>
              <input
                type="text"
                id="Nom"
                placeholder="Enter Nom"
                className="form-control"
                onChange={e => setNom(e.target.value)}
                value={nom}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="prenom">Prenom</label>
              <input
                type="text"
                id="Prenom"
                placeholder="Enter Prenom"
                className="form-control"
                onChange={e => setPrenom(e.target.value)}
                value={prenom}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="CIN">CIN</label>
              <input
                type="text"
                id="CIN"
                placeholder="Enter CIN"
                className="form-control"
                onChange={e => setCIN(e.target.value)}
                value={CIN}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="Age">Age</label>
              <input
                type="text"
                id="age"
                placeholder="Enter Age"
                className="form-control"
                onChange={e => setAge(e.target.value)}
                value={age}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                value={Email}
              />
            </div>
            <button type="submit" className="btn btn-success">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateFournisseur;
