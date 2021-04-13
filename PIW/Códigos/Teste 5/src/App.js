import {Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { PaginaFeed } from './components/pages/PaginaFeed/PaginaFeed';
import { PaginaPostar } from './components/pages/PaginaPostar/PaginaPostar';
import { NavegadorSuperior } from './components/commom/NavegadorSuperior/NavegadorSuperior';
import history from './history';
import { PaginaCadastro } from './components/pages/PaginaCadastro/PaginaCadastro';
import { PaginaLogin } from './components/pages/PaginaLogin/PaginaLogin';
import {createContext, useState} from 'react';

export const AuthContext = createContext(null);
function App() {

  const [auth, setAuth] = useState({token:localStorage.getItem("token"),nome:localStorage.getItem("nome")});

  const setAuthLS = (newAuth) => {
    setAuth(newAuth);
    localStorage.setItem("token",newAuth.token);
    localStorage.setItem("nome",newAuth.nome);
  }
  
  return (
    <AuthContext.Provider value={{auth:auth, setAuth:setAuthLS}}>
      
      <Router history={history}>
        
        <Route exact path="/">
          {auth.token == null? <Redirect to="/login"></Redirect> : 
            <div className="navegador">
              <NavegadorSuperior></NavegadorSuperior>
              <PaginaFeed></PaginaFeed>
            </div>
          }
        </Route>

        <Route path="/PaginaPostar">
          <PaginaPostar></PaginaPostar>
        </Route>

        <Route path="/cadastro">
          <PaginaCadastro></PaginaCadastro>
        </Route>

        <Route path="/login">
          <PaginaLogin></PaginaLogin>
        </Route>
      
      </Router>
    
    </AuthContext.Provider>
  );
}

export default App;
