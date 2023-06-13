using System.ComponentModel.DataAnnotations;

namespace SyspotecTestService.API.Request.Ticket
{
    public class TicketToCreateRequest
    {
        [Required]
        public string? Descripcion { get; set; }
        [Required]
        public string? Prioridad { get; set; }
    }
}
