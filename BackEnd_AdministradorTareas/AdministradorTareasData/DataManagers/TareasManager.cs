using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
//Dependencias
using AdministradorTareasData.Models;
using AdministradorTareasData.TareasDSTableAdapters;

namespace AdministradorTareasData.DataManagers
{
    public class TareasManager
    {
        //Esto es una lista, utiliza el modelo TareaModel        
        List<TareaModel> tareasList = new List<TareaModel>();


        //Constructor
        public TareasManager() { }

        //Este metodo trae todas las tareas de la base de datos a traves del tableAdapter, mapea todas las filas y retorna una lista de TareaModel       
        public List<TareaModel> GetAllTareas()
        {            

            SP_SeleccionarTareasTableAdapter tareaTA = new SP_SeleccionarTareasTableAdapter();
            TareasDS tareasDS = new TareasDS();

            
            tareaTA.Fill(tareasDS.SP_SeleccionarTareas);

            foreach (var tarea in tareaTA.GetData()) {                

                tareasList.Add(new TareaModel(tarea.TareaID,tarea.Nombre,tarea.Descripcion, tarea.FechaInicial, tarea.FechaFinal, tarea.Colaborador,tarea.Prioridad,tarea.Estado));
            }

            


            return tareasList;
        }

        public List<TareaModel> CrearNuevaTarea(string nombre,string descripcion, DateTime fechaIni, DateTime fechaFin, int colaborador, int estado, int prioridad) {

            bool? IsOk = false;

            SP_SeleccionarTareasTableAdapter tareaTA = new SP_SeleccionarTareasTableAdapter();
            tareaTA.SP_CrearNuevaTarea(nombre, descripcion, fechaIni, fechaFin, colaborador, estado, prioridad, ref IsOk);


            if (IsOk == true)
            {
                return GetAllTareas();
            }           

            return null;
        }

        public List<TareaModel> ActualizarTarea(int id,string nombre, string descripcion, DateTime fechaIni, DateTime fechaFin, int colaborador, int estado, int prioridad)
        {

            bool? IsOk = false;

            SP_SeleccionarTareasTableAdapter tareaTA = new SP_SeleccionarTareasTableAdapter();
            tareaTA.SP_ActualizarTarea(id,nombre, descripcion, fechaIni, fechaFin, colaborador, estado, prioridad, ref IsOk);


            if (IsOk == true)
            {
                return GetAllTareas();
            }

            return null;
        }

        public List<TareaModel> EliminarTarea(int id)
        {

            bool? IsOk = false;

            SP_SeleccionarTareasTableAdapter tareaTA = new SP_SeleccionarTareasTableAdapter();
            tareaTA.SP_EliminarTarea(id, ref IsOk);


            if (IsOk == true)
            {
                return GetAllTareas();
            }

            return null;
        }



        public Dictionary<int, string> GetEstados() {

            Dictionary<int, string> estados = new Dictionary<int, string>();

            SP_EstadosTableAdapter estadosTA = new SP_EstadosTableAdapter();
            TareasDS tareasDS = new TareasDS();

            estadosTA.Fill(tareasDS.SP_Estados);

            foreach (var estado in estadosTA.GetData())
            {
                estados.Add(estado.EstadoID, estado.Descripcion);
            }

            return estados;
        }

        public Dictionary<int, string> GetPrioridades()
        {

            Dictionary<int, string> prioridades = new Dictionary<int, string>();

            SP_PrioridadTableAdapter prioridadesTA = new SP_PrioridadTableAdapter();
            TareasDS tareasDS = new TareasDS();

            prioridadesTA.Fill(tareasDS.SP_Prioridad);

            foreach (var prioridad in prioridadesTA.GetData())
            {
                prioridades.Add(prioridad.PrioridadID, prioridad.Descripcion);
            }

            return prioridades;
        }

        public Dictionary<int, string> GetColaboradores()
        {

            Dictionary<int, string> colaboradores = new Dictionary<int, string>();

            SP_ColaboradoresTableAdapter colaboradoresTA = new SP_ColaboradoresTableAdapter();
            TareasDS tareasDS = new TareasDS();

            colaboradoresTA.Fill(tareasDS.SP_Colaboradores);

            foreach (var colaborador in colaboradoresTA.GetData())
            {
                colaboradores.Add(colaborador.ColaboradorID, colaborador.Nombre);
            }

            return colaboradores;
        }


    }
}
