import react, { useEffect, useState,useContext } from 'react'
import { db } from '../API/db.js'
import FilaTarea from './FilaTarea';
import { TareaContext } from "../context/TareaProvider";

export default function TablaTareas() {

    const { actualizarState, setActualizarState, filtrarPor, URL } = useContext(TareaContext);

    const [data, setData] = useState([]);
    const [datosConFiltroAplicado, setDatosConFiltroAplicado] = useState([]);


    function cambiarFormatoFecha(fechaFormatoISO) {
        const fecha = new Date(fechaFormatoISO);
                
        const dia = fecha.getDate().toString().padStart(2, '0'); 
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
              
        const fechaNuevoFormato = `${dia}-${mes}-${anio}`;
      
        return fechaNuevoFormato;
    }

    function cambiarFormatoFechaDiaMesAnio(fechaDiaMesAnio) {        
      const [anio, mes, dia] = fechaDiaMesAnio.split('-');        
      const fechaFormateada = `${dia}-${mes}-${anio}`;      
      return fechaFormateada;
    }

    useEffect(() => {        


      fetch(`${URL}/Tarea`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);        
        })
        .catch((error) => {
          console.log(error);
        });  
                              
      
  
      }, [actualizarState]);
      
    useEffect(() => {
      var dataFiltrada = [];
      if(filtrarPor != {}){
         dataFiltrada = data.filter(tarea => {       

          // console.log(cambiarFormatoFecha(tarea.fechaInicial));
          // console.log(cambiarFormatoFechaDiaMesAnio(filtrarPor.filtroFechaIni));


          
          return(
            // (cambiarFormatoFecha(tarea.fechaInicial) == filtrarPor.filtroFechaIni) &&
            // (cambiarFormatoFecha(tarea.fechaFinal) == filtrarPor.filtroFechaFin) &&
            (("" == filtrarPor.filtroPrioridad) || (tarea.prioridad == filtrarPor.filtroPrioridad)) && 
            (("" == filtrarPor.filtroEstado) || (tarea.estado == filtrarPor.filtroEstado)) && 
            (("" == filtrarPor.filtroColaborador)  ||  (tarea.colaborador == filtrarPor.filtroColaborador))
                       
                             
          )
          
          
             
        })      
        
           
        setDatosConFiltroAplicado(dataFiltrada)
      }

      
        
        

    },[filtrarPor])

    


    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fecha Inicial</th>
                        <th scope="col">Fecha Final</th>
                        <th scope="col">Colaborador</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Estado</th>                        
                    </tr>
                </thead>
                <tbody>

                    {

                        (datosConFiltroAplicado.length > 0) ? 
                        datosConFiltroAplicado.map(
                          (tarea) => (<FilaTarea key={tarea.id} idInformation={tarea.id} nombre={tarea.nombre} descripcion={tarea.descripcion} fechaInicial={cambiarFormatoFecha(tarea.fechaInicial)} fechaFinal={cambiarFormatoFecha(tarea.fechaFinal)} colaborador={tarea.colaborador} prioridad={tarea.prioridad} estado={tarea.estado}/>)
                        ) :                        
                        data.map(
                            (tarea) => (<FilaTarea key={tarea.id} idInformation={tarea.id} nombre={tarea.nombre} descripcion={tarea.descripcion} fechaInicial={cambiarFormatoFecha(tarea.fechaInicial)} fechaFinal={cambiarFormatoFecha(tarea.fechaFinal)} colaborador={tarea.colaborador} prioridad={tarea.prioridad} estado={tarea.estado}/>)
                        )
                    }                    

                </tbody>
            </table>
        </>
    )

}