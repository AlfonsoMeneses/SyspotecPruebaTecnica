using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Models
{
    public class AsignadosUsuarioDto
    {
        //public TicketDto Ticket { get; set; } = null!;

        public UsuarioDto Usuario { get; set; } = null!;

        public EstadoTicketDto Estado { get; set; } = null!;

        public DateTime? Fecha { get; set; }
    }
}
