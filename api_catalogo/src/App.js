import './styles/global.scss'

import {Router, Route, Redirect} from 'react-router-dom'
import history from './history'
import { PageLogin } from './components/pages/PageLogin/PageLogin';
import { PageRegister } from './components/pages/PageRegister/PageRegister';
import { Menu } from './components/commom/Menu/Menu';
import { Home } from './components/pages/Home/Home';
import { Products } from './components/pages/Products/Products';
import { Categories } from './components/pages/Categories/Categories';
import { createContext, useState } from 'react';
import { ProductById } from './components/pages/ProductById/ProductById';
import { CategoryById } from './components/pages/CategoryById/CategoryById';

export const Context = createContext();
export const AuthContext = createContext(null);

function App() {

  const [navActive, setNavActive] = useState("null");
  const [auth, setAuth] = useState({token:localStorage.getItem("token")});
  const [searchByIdActive,setSearchByIdActive] = useState(false);
  //const [searchById,setSearchById] = useState();
  const [elementById, setElementById] = useState({});
  const [idCurrent,setIdCurrent] = useState();

  const setAuthLS = (newAuth) => {
    setAuth(newAuth);
    localStorage.setItem("token",newAuth.token);
  }

  return (
    <AuthContext.Provider value={{auth:auth, setAuth:setAuthLS}}>

      <Context.Provider  value={{navActive:navActive, setNavActive:setNavActive,
        searchByIdActive:searchByIdActive, setSearchByIdActive:setSearchByIdActive,
        elementById:elementById, setElementById:setElementById,
        idCurrent:idCurrent,setIdCurrent:setIdCurrent}}>

        <Router history={history}>

          <Route path="/login">
            <PageLogin></PageLogin>
          </Route>

          <Route path="/register">
            <PageRegister></PageRegister>
          </Route>

          <Route exact path="/">
            {auth.token == null ? <Redirect to="/login"></Redirect> : (
              <>
                <Menu></Menu>
                <Home></Home>
              </>
            )}
          </Route>

          <Route exact path="/products">
            <Menu></Menu>
            <Products></Products>
          </Route>

          <Route path="/products/:id" component={ProductById}/>

          <Route exact path="/categories">
            <Menu></Menu>
            <Categories></Categories>
          </Route>

          <Route path="/categories/:id" component={CategoryById}/>

        </Router>

      </Context.Provider>

    </AuthContext.Provider>
  );
}

export default App;
