import { useContext, useState, useEffect } from 'react'
import { TareaContext } from "../context/TareaProvider";
import Form from 'react-bootstrap/Form';

export default function EditarTarea(){

  const { tareaState, setTareaState, URL } = useContext(TareaContext);
  const { actualizarState, setActualizarState } = useContext(TareaContext);
    //ComboEstados
  const [cmbEstados, setCmbEstados] = useState([]);
  //ComboColaborador
  const [cmbColaboradores, setCmbColaboradores] = useState([]);
  //ComboColaborador
  const [cmbPrioridades, setCmbPrioridades] = useState([]);




  const nombreHandle = (event) => {    
    setTareaState(prevTarea => ({...prevTarea,nombre: event.target.value}));
  }

  const descripcionHandle = (event) => {
    setTareaState(prevTarea => ({...prevTarea,descripcion: event.target.value}));
  }

  const fechaIniHandle = (event) => {
    setTareaState(prevTarea => ({...prevTarea,fechaInicial: event.target.value}));
    
  }

  const fechaFinHandle = (event) => {
    setTareaState(prevTarea => ({...prevTarea,fechaFinal: event.target.value}));
  }

  const colaboradorHandle = (event) => {    
    setTareaState(prevTarea => ({...prevTarea,colaborador: event.target.value}));
  }

  const prioridadHandle = (event) => {
    setTareaState(prevTarea => ({...prevTarea,prioridad: event.target.value}));
  }

  const estadoHandle = (event) => {
    setTareaState(prevTarea => ({...prevTarea,estado: event.target.value}));    
  }

  const handleEditar = async (e) => {

    e.preventDefault();
    
    
    if(tareaState.nombre != "" 
      && tareaState.descripcion != "" 
      && (new Date(tareaState.fechaInicial).getTime() <= new Date(tareaState.fechaFinal).getTime())
      && !(tareaState.estado != "1" && tareaState.colaborador == "1")
    ){
    try {
      const response = await fetch(`${URL}/Tarea`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tareaState)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Tarea editada con éxito');
      } else {
        alert('No se pudo editar la tarea.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setActualizarState(!actualizarState);
    }else{
      if(tareaState.nombre == ""){
        alert("Nombre no puede quedar vacío");
      }
      if(tareaState.descripcion == ""){
        alert("Descripcion no puede quedar vacío");
      }
      if((new Date(tareaState.fechaInicial).getTime() > new Date(tareaState.fechaFinal).getTime())){
        alert("Fecha inicial no puede ser mayor a la fecha final.");
      }
      if((tareaState.estado != "1" && tareaState.colaborador == "1")){
        alert("No puede agregar una tarea en un estado En proceso o finalizada sin asignar un colaborador.");
      }
    }
  };

  const handleEliminar = async (e) => {

    e.preventDefault();
    
    const confirmacionDeUsuario = window.confirm(`¿Está seguro de eliminar la nota # ${tareaState.id}?`);

    if(confirmacionDeUsuario){
      try {
        const response = await fetch(`${URL}/Tarea`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tareaState)
        });
  
        if (response.ok) {
          const result = await response.json();
          alert('Tarea eliminada con éxito');
        } else {
          alert('No se pudo eliminada la tarea.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
      setActualizarState(!actualizarState);
    }

    
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


      
        Object.entries(cmbColaboradores).map(([id, colaborador]) =>
            {
                if(colaborador == tareaState.colaborador){
                    setTareaState(prevTarea => ({...prevTarea,colaborador: id}))
                }
            }
        )        

        Object.entries(cmbEstados).map(([id, estado]) =>
            {
                if(estado == tareaState.estado){
                    setTareaState(prevTarea => ({...prevTarea,estado: id}))
                }
            }
        )  

        Object.entries(cmbPrioridades).map(([id, prioridad]) =>
            {
                if(prioridad == tareaState.prioridad){
                    setTareaState(prevTarea => ({...prevTarea,prioridad: id}))
                }
            }
        )  
      
  }, [tareaState]);

    

    return(
        <>
         <div className="modal fade" id="EditarTareaModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tarea # {tareaState.id}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
                                    <input type="email" className="form-control" id="nombreTarea" value={tareaState.nombre} onChange={nombreHandle}></input>
                                    


                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripcion</label>
                                    <input type="text" className="form-control" id="descripcionTarea" value={tareaState.descripcion} onChange={descripcionHandle}></input>
                                    

                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Inicial</label>
                                            <input type="date" className="form-control" id="fechaInicialTarea" value={tareaState.fechaInicial} onChange={fechaIniHandle}></input>
                                            

                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Final</label>
                                            <input type="date" className="form-control" id="fechaFinalTarea" value={tareaState.fechaFinal} onChange={fechaFinHandle}></input>
                                            

                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Colaborador</label>
                                    <Form.Select aria-label="Default select example" value={tareaState.colaborador} onChange={colaboradorHandle}>                                       
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
                                            <label className="form-label">Prioridad</label>

                                            <Form.Select aria-label="Default select example" value={tareaState.prioridad} onChange={prioridadHandle}>

                                                {
                                                    Object.entries(cmbPrioridades).map(([id, prioridad]) =>
                                                        (<option key={id} value={id}>{prioridad}</option>)
                                                    )
                                                }

                                            </Form.Select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="form-label">Estado</label>

                                            <Form.Select aria-label="Default select example" value={tareaState.estado} onChange={estadoHandle}>

                                                {
                                                    Object.entries(cmbEstados).map(([id, estado]) =>
                                                        (<option key={id} value={id}>{estado}</option>)
                                                    )
                                                }
                                            </Form.Select>

                                        </div>
                                    </div>
                                   
                                   
                                </div>






                            </form>
                        </div>
                        <div className="modal-footer">
                            <button disabled={(tareaState.estado == "2")} type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleEliminar}>Eliminar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleEditar}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}