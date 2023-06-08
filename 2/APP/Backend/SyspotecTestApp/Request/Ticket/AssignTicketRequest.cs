using System.ComponentModel.DataAnnotations;

namespace SyspotecTestService.API.Request.Ticket
{
    public class AssignTicketRequest
    {
        [Required]
        public int IdUsuario { get; set; }

        [Required]
        public DateTime Fecha { get; set; }
    }
}
