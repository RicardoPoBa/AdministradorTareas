import './App.css'
import EditarTarea from './components/EditarTarea';
import FiltroTarea from './components/FiltroTarea';

import NuevaTarea from './components/NuevaTarea';
import TablaTareas from './components/TablaTareas';
import { TareaProvider } from './context/TareaProvider';

function App() {


  return (
    <>
      <div className="row">

        <div className="col-1">

        </div>


        <div className="col-10">



          <h1>Administrador de Tareas</h1>

          

          




          {/* <button type="button" className="btn btn-info btnFiltro">Filtro</button> */}

          <hr></hr>

          <TareaProvider>
            <NuevaTarea></NuevaTarea>
            <hr></hr>
            <FiltroTarea></FiltroTarea>
            <hr></hr>
            <TablaTareas></TablaTareas>
            <EditarTarea></EditarTarea>
          </TareaProvider>






        </div>

        <div className="col-1"></div>
      </div>
    </>
  )
}

export default App
