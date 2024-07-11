import { useContext } from 'react'
import { TareaContext } from "../context/TareaProvider";

export default function FilaTarea({ idInformation, nombre, descripcion, fechaInicial, fechaFinal, colaborador, prioridad, estado }) {

    const { tareaState, setTareaState } = useContext(TareaContext);

    function cambiarFormatoFecha(fechaDiaMesAnio) {        
        const [dia, mes, anio] = fechaDiaMesAnio.split('-');        
        const fechaFormateada = `${anio}-${mes}-${dia}`;      
        return fechaFormateada;
      }

    var PRIORIDAD_CLASE = "";
    var ESTADO_CLASE = "";
    var ESTADO_ICONO = "";
    var COLOR_ICONO = "";


    if (estado == "Finalizada") {
        ESTADO_ICONO = "check_circle";
        COLOR_ICONO = { color: 'green' };
        ESTADO_CLASE = "table-success"
    }

    if (estado != "Finalizada") {
        if (prioridad == 'Alta') {
            PRIORIDAD_CLASE = "table-danger";
        }
        if (prioridad == 'Media') {
            PRIORIDAD_CLASE = "table-warning";
        }
        if (prioridad == 'Baja') {
            PRIORIDAD_CLASE = "table-primary";
        }
    }

    if (estado == "Pendiente") {
        ESTADO_ICONO = "timer";
        COLOR_ICONO = { color: 'grey' };
    }


    function actualizarInformacionTarea(){
        var tareaInformacion = {
            id: idInformation,
            nombre: nombre,
            descripcion: descripcion,
            fechaInicial: cambiarFormatoFecha(fechaInicial),
            fechaFinal: cambiarFormatoFecha(fechaFinal),
            colaborador: colaborador,
            prioridad: prioridad,
            estado: estado 
        }

        setTareaState(tareaInformacion);
    }





    return (



        <>
            <tr className={ESTADO_CLASE} data-bs-toggle="modal" data-bs-target="#EditarTareaModal" onClick={actualizarInformacionTarea}>
                <th scope="row">{idInformation}</th>
                <td>{nombre}</td>
                <td>{descripcion}</td>
                <td>{fechaInicial}</td>
                <td>{fechaFinal}</td>
                <td>{colaborador}</td>
                <td className={PRIORIDAD_CLASE}>{prioridad}</td>
                <td className="tdIcon">{estado}<span className="material-symbols-outlined"
                    style={{ COLOR_ICONO }}>{ESTADO_ICONO}</span></td>
            </tr>
            
                                   
        </>
    )

}