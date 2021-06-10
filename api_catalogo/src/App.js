import './styles/global.scss'

import {Router, Route} from 'react-router-dom'
import history from './history'
import { PageLogin } from './components/pages/PageLogin/PageLogin';
import { PageRegister } from './components/pages/PageRegister/PageRegister';
import { Menu } from './components/commom/Menu/Menu';
import { Home } from './components/pages/Home/Home';
import { Products } from './components/pages/Products/Products';
import { Categories } from './components/pages/Categories/Categories';


function App() {
  return (
    <Router history={history}>
      <Route exact path="/">
        <Menu></Menu>
        <Home></Home>
      </Route>

      <Route path="/login">
        <PageLogin></PageLogin>
      </Route>

      <Route path="/register">
        <PageRegister></PageRegister>
      </Route>

      <Route path="/products">
        <Menu></Menu>
        <Products></Products>
      </Route>

      <Route path="/categories">
        <Menu></Menu>
        <Categories></Categories>
      </Route>

    </Router>
  );
}

export default App;
