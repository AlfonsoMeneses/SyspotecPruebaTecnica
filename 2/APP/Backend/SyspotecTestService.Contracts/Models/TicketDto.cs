using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Models
{
    public class TicketDto
    {
        public int Id { get; set; }

        public string? Descripcion { get; set; }

        public int Numero { get; set; }

        public string? Prioridad { get; set; }

        public AsignadosUsuarioDto? AsignadosUsuarios { get; set; }
    }
}
