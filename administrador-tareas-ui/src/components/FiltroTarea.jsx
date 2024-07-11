import { useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import { TareaContext } from "../context/TareaProvider";
export default function FiltroTarea() {

  const { filtro, setFiltro , filtrarPor, setFiltrarPor, URL} = useContext(TareaContext);

  //ComboEstados
  const [cmbEstados, setCmbEstados] = useState([]);
  //ComboColaborador
  const [cmbColaboradores, setCmbColaboradores] = useState([]);
  //ComboColaborador
  const [cmbPrioridades, setCmbPrioridades] = useState([]);

  const [fechaIni, setFechaIni] = useState("2024-01-01");
  const [fechaFin, setFechaFin] = useState("2024-01-01");
  const [colaborador, setColaborador] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [estado, setEstado] = useState("");

  
  
  function usaFiltro(bUsaFiltro){        
    setFiltro(bUsaFiltro);    
  }

  function filtrar(){
    if(filtro == true){
      setFiltrarPor({ filtroFechaIni: fechaIni,
                      filtroFechaFin: fechaFin,
                      filtroPrioridad: prioridad,
                      filtroColaborador: colaborador,
                      filtroEstado: estado});
    }else{
      setFiltrarPor({});
    }
  }



  const fechaIniHandle = (event) => {    
    setFechaIni(event.target.value);    
  }

  const fechaFinHandle = (event) => {  
    setFechaFin(event.target.value);
  }

  const colaboradorHandle = (event) => {
    setColaborador(event.target.value);
  }

  const prioridadHandle = (event) => {  
    setPrioridad(event.target.value);
    
  }

  const estadoHandle = (event) => {    
    setEstado(event.target.value);
    
  }

  useEffect(() => filtrar(),[fechaIni,fechaFin,colaborador,prioridad,estado,filtro])

  useEffect(() => {

    //Combo Estado
    fetch(`${URL}/Estado`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCmbEstados(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Combo Colaborador
    fetch(`${URL}/Colaborador`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCmbColaboradores(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //Combo Prioridades
    fetch(`${URL}/Prioridad`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCmbPrioridades(data);
      })
      .catch((error) => {
        console.log(error);
      });




  }, []);




  return (
    <>
      <div className='row'>

        <div className="col-2">
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Usar Filtro</label>
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={() => usaFiltro(!filtro)}></input>            
          </div>
        </div>        

      </div>




      <hr></hr>

      <div className="row">
        <div className="col-2">
          <div className="mb-3">
            <label className="form-label">Fecha Inicial</label>
            <input disabled={true} type="date" className="form-control" id="fechaInicialTarea" value={fechaIni.value} onChange={fechaIniHandle}></input>

          </div>
        </div>
        <div className="col-2">
          <div className="mb-3">
            <label className="form-label">Fecha Final</label>
            <input disabled={true} type="date" className="form-control" id="fechaFinalTarea" value={fechaFin.value} onChange={fechaFinHandle}></input>

          </div>
        </div>





        <div className="col-2">
          <div className="mb-3">
            <label className="form-label">Prioridad</label>

            <Form.Select disabled={!filtro} aria-label="Default select example" value={prioridad.value} onChange={prioridadHandle}>
                <option key={-1} value={""}>...</option>
              {
               
                Object.entries(cmbPrioridades).map(([id, prioridad]) =>
                  (<option key={prioridad} value={prioridad}>{prioridad}</option>)
                )
              }

            </Form.Select>
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Estado</label>

            <Form.Select disabled={!filtro} aria-label="Default select example" value={estado.value} onChange={estadoHandle}>
            <option key={-1} value={""}>...</option>
              {
                Object.entries(cmbEstados).map(([id, estado]) =>
                  (<option key={estado} value={estado}>{estado}</option>)
                )
              }
            </Form.Select>

          </div>
        </div>
        <div className="col-3">
          <div className="mb-3">
            <label className="form-label">Colaborador</label>
            <Form.Select disabled={!filtro} aria-label="Default select example" value={colaborador.value} onChange={colaboradorHandle}>
            <option key={-1} value={""}>...</option>
              {
                Object.entries(cmbColaboradores).map(([id, colaborador]) =>
                  (<option key={colaborador} value={colaborador}>{colaborador}</option>)
                )
              }
            </Form.Select>



          </div>
        </div>
      </div>







    </>
  )

}