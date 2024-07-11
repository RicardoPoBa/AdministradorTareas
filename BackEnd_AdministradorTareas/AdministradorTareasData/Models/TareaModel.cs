using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdministradorTareasData.Models
{
    public class TareaModel
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
       
        public DateTime FechaInicial { get; set; }
        
        public DateTime FechaFinal { get; set; }

        public string Colaborador { get; set; }

        public string Prioridad { get; set; }

        public string Estado { get; set; }


        public TareaModel(int id, string nombre, string descripcion, DateTime fechaInicial, DateTime fechaFinal, string colaborador, string prioridad, string estado)
        {
            this.Id = id;
            this.Nombre = nombre;
            this.Descripcion = descripcion;
            this.FechaInicial = fechaInicial;
            this.FechaFinal = fechaFinal;
            this.Colaborador = colaborador;
            this.Prioridad = prioridad;
            this.Estado = estado;
        }
    }
}
