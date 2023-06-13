
namespace SyspotecTestService.Contracts.Models
{
    public class AsignadosUsuarioDto
    {
        public UsuarioDto Usuario { get; set; } = null!;

        public EstadoTicketDto Estado { get; set; } = null!;

        public DateTime? Fecha { get; set; }
    }
}
