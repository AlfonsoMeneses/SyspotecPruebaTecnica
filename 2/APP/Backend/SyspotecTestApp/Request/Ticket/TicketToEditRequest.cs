using SyspotecTestService.Contracts.Models;
using System.ComponentModel.DataAnnotations;

namespace SyspotecTestService.API.Request.Ticket
{
    public class TicketToEditRequest
    {
        public string? Descripcion { get; set; }
        public string? Prioridad { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime? Fecha { get; set; }

        public TicketDto GetTicket()
        {
            var ticket = new TicketDto
            {
                Descripcion = this.Descripcion,
                Prioridad = this.Prioridad,
                AsignadosUsuarios = new AsignadosUsuarioDto
                {
                    Fecha = this.Fecha,
                    Usuario = new UsuarioDto
                    {
                        Id = IdUsuario != null ? IdUsuario.Value : 0
                    }
                }
            };


            return ticket;
        }
    }
}
