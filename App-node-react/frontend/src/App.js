import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Fournisseur from './Fournisseur';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateFournisseur from './CreateFournisseur';
import UpdateFournisseur from './UpdateFournisseur';
import Home from './Home';
// Ajout des nouveaux composants
import Article from './Article';
import CreateArticle from './CreateArticle';
import UpdateArticle from './UpdateArticle';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/fournisseur" element={<Fournisseur />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateFournisseur />} />
          <Route path="/update/:id" element={<UpdateFournisseur />} />
          {/* Nouvelles routes pour Article */}
          <Route path="/articles" element={<Article />} />
          <Route path="/createarticle" element={<CreateArticle />} />
          <Route path="/updatearticle/:id" element={<UpdateArticle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;