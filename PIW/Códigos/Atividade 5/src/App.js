import {Router, Route } from 'react-router-dom';
import './App.css';
import { PaginaFeed } from './components/pages/PaginaFeed/PaginaFeed';
import { PaginaPostar } from './components/pages/PaginaPostar/PaginaPostar';
import { NavegadorSuperior } from './components/commom/NavegadorSuperior/NavegadorSuperior';
import history from './history';

function App() {
  return (
  <Router history={history}>
    <Route exact path="/">
      <div className="navegador">
        <NavegadorSuperior></NavegadorSuperior>
        <PaginaFeed></PaginaFeed>
      </div>
    </Route>

    <Route path="/PaginaPostar">
      <PaginaPostar></PaginaPostar>
    </Route>
  </Router>
  );
}

export default App;
