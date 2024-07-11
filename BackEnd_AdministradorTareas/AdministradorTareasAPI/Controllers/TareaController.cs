using AdministradorTareasData.DataManagers;
using AdministradorTareasData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using System.Collections.Generic;
using System.Globalization;
using System.Net;

namespace AdministradorTareasAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TareaController : Controller
    {

        [HttpGet(Name = "GetTareas")]
        public List<TareaModel> Get()
        {
            TareasManager manager = new TareasManager();

            return manager.GetAllTareas();
        }

        [HttpPost(Name = "CrearTareaPrueba")]
        public IActionResult CrearTareaPrueba([FromBody] TareaModel tarea)
        {
            TareasManager manager = new TareasManager();
            


            List<TareaModel> ListaActualizada = manager.CrearNuevaTarea(tarea.Nombre, tarea.Descripcion, tarea.FechaInicial, tarea.FechaFinal, Convert.ToInt32(tarea.Colaborador), Convert.ToInt32(tarea.Estado), Convert.ToInt32(tarea.Prioridad));

            if (ListaActualizada != null)
            {
                return StatusCode((int)HttpStatusCode.Created, new { success = true }); ;
            }
            else {
                return StatusCode((int)HttpStatusCode.BadRequest, new { success = false, message = "La inserción falló." });
            }            
        }

        [HttpPut(Name = "ActualizarTarea")]
        public IActionResult ActualizarTarea([FromBody] TareaModel tarea)
        {
            TareasManager manager = new TareasManager();



            List<TareaModel> ListaActualizada = manager.ActualizarTarea(tarea.Id,tarea.Nombre, tarea.Descripcion, tarea.FechaInicial, tarea.FechaFinal, Convert.ToInt32(tarea.Colaborador), Convert.ToInt32(tarea.Estado), Convert.ToInt32(tarea.Prioridad));

            if (ListaActualizada != null)
            {
                return StatusCode((int)HttpStatusCode.Created, new { success = true }); ;
            }
            else
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new { success = false, message = "La actualización falló." });
            }
        }

        [HttpDelete(Name = "EliminarTarea")]
        public IActionResult EliminarTarea([FromBody] TareaModel tarea)
        {
            TareasManager manager = new TareasManager();



            List<TareaModel> ListaActualizada = manager.EliminarTarea(tarea.Id);

            if (ListaActualizada != null)
            {
                return StatusCode((int)HttpStatusCode.Created, new { success = true }); ;
            }
            else
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new { success = false, message = "La eliminación falló." });
            }
        }


    }

    [ApiController]
    [Route("[controller]")]
    public class EstadoController : Controller
    {                
        [HttpGet(Name = "GetEstados")]
        public Dictionary<int, string> GetEstados()
        {
            TareasManager manager = new TareasManager();

            return manager.GetEstados();
        }

    }

    [ApiController]
    [Route("[controller]")]
    public class PrioridadController : Controller
    {
        [HttpGet(Name = "GetPrioridad")]
        public Dictionary<int, string> GetPrioridades()
        {
            TareasManager manager = new TareasManager();

            return manager.GetPrioridades();
        }

    }

    [ApiController]
    [Route("[controller]")]
    public class ColaboradorController : Controller
    {
        [HttpGet(Name = "GetColaborador")]
        public Dictionary<int, string> GetColaboradores()
        {
            TareasManager manager = new TareasManager();

            return manager.GetColaboradores();
        }

    }
}
