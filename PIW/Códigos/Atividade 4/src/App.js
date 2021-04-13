import './App.css';
import { LinhaDoTempo } from './components/pages/LinhaDoTempo/LinhaDoTempo';
import { NavegadorSuperior } from './components/pages/NavegadorSuperior/NavegadorSuperior';

function App() {
  return (<div className="app">
    <NavegadorSuperior></NavegadorSuperior>
    <LinhaDoTempo></LinhaDoTempo>
  </div>
  );
}

export default App;
