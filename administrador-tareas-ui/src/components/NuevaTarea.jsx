import { useEffect,useState,useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { TareaContext } from "../context/TareaProvider";

export default function NuevaTarea() {  

  const { actualizarState, setActualizarState, URL } = useContext(TareaContext);

  //ComboEstados
  const [cmbEstados, setCmbEstados] = useState([]);
  //ComboColaborador
  const [cmbColaboradores, setCmbColaboradores] = useState([]);
  //ComboColaborador
  const [cmbPrioridades, setCmbPrioridades] = useState([]);


  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaIni, setFechaIni] = useState("2024-01-01");
  const [fechaFin, setFechaFin] = useState("2024-01-01");
  const [colaborador, setColaborador] = useState("1");
  const [prioridad, setPrioridad] = useState("1");
  const [estado, setEstado] = useState("1");

  const [limpiar, setLimpiar] = useState(false);
  


  const nombreHandle = (event) => {
    setNombre(event.target.value);
  }

  const descripcionHandle = (event) => {
    setDescripcion(event.target.value);
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

  const handleGuardar = async (e) => {

    e.preventDefault();

    // Crear el objeto de datos a enviar
    const TareaData = {
      nombre: nombre,
      descripcion: descripcion,
      fechaInicial: new Date(fechaIni).toISOString(),
      fechaFinal: new Date(fechaFin).toISOString(),
      colaborador: colaborador,
      prioridad: prioridad,
      estado: estado
    };


    
    console.log(TareaData.estado)
    console.log(TareaData.colaborador)



    if(TareaData.nombre != "" 
      && TareaData.descripcion != "" 
      && (new Date(TareaData.fechaInicial).getTime() <= new Date(TareaData.fechaFinal).getTime())
      && !(TareaData.estado != "1" && TareaData.colaborador == "1")
    ){
      try {
        const response = await fetch(`${URL}/Tarea`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(TareaData)
        });
  
        if (response.ok) {
          const result = await response.json();
          alert('Tarea agregada con éxito');
        } else {
          alert('No se pudo añadir la tarea.');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setActualizarState(!actualizarState);

      

    }else{
      if(TareaData.nombre == ""){
        alert("Nombre no puede quedar vacío");
      }
      if(TareaData.descripcion == ""){
        alert("Descripcion no puede quedar vacío");
      }
      if((new Date(TareaData.fechaInicial).getTime() > new Date(TareaData.fechaFinal).getTime())){
        alert("Fecha inicial no puede ser mayor a la fecha final.");
      }
      if((TareaData.estado != "1" && TareaData.colaborador == "1")){
        alert("No puede agregar una tarea en un estado En proceso o finalizada sin asignar un colaborador.");
      }
    }

    

    setLimpiar(!limpiar);

    
  };


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



      setNombre("");
      setDescripcion("");
      setFechaIni("2024-01-01");
      setFechaFin("2024-01-01");
      setColaborador("1");
      setPrioridad("1");
      setEstado("1");






  }, [limpiar]);


  return (
    <div>

      <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#NuevaTareaModal">
        + Nueva tarea
      </button>


      <div className="modal fade" id="NuevaTareaModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Tarea nueva</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
                  <input type="email" className="form-control" id="nombreTarea" value={nombre} onChange={nombreHandle}></input>

                </div>
                <div className="mb-3">
                  <label className="form-label">Descripcion</label>
                  <input type="text" className="form-control" id="descripcionTarea" value={descripcion} onChange={descripcionHandle}></input>

                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Fecha Inicial</label>
                      <input type="date" className="form-control" id="fechaInicialTarea" value={fechaIni} onChange={fechaIniHandle}></input>

                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Fecha Final</label>
                      <input type="date" className="form-control" id="fechaFinalTarea" value={fechaFin} onChange={fechaFinHandle}></input>

                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Colaborador</label>
                  <Form.Select aria-label="Default select example" value={colaborador} onChange={colaboradorHandle}>                              
                        {
                            Object.entries(cmbColaboradores).map(([id, colaborador]) =>                           
                              (<option key={id} value={id}>{colaborador}</option>)
                          )
                        }
                  </Form.Select>



                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Estado</label>

                      <Form.Select aria-label="Default select example" value={estado} onChange={estadoHandle}>                            
                        {
                            Object.entries(cmbEstados).map(([id, estado]) =>                           
                              (<option key={id} value={id}>{estado}</option>)
                          )
                        }                       
                      </Form.Select>

                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Prioridad</label>

                      <Form.Select aria-label="Default select example" value={prioridad} onChange={prioridadHandle}>                            
                        {
                            Object.entries(cmbPrioridades).map(([id, prioridad]) =>                           
                              (<option key={id} value={id}>{prioridad}</option>)
                          )
                        }

                      </Form.Select>
                    </div>
                  </div>
                </div>






              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={handleGuardar} data-bs-dismiss="modal">Guardar</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}