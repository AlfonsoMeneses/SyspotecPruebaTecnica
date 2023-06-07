using System.ComponentModel.DataAnnotations;

namespace SyspotecTestService.API.Request
{
    public class UserToEditRequest
    {
        public string? Nombre { get; set; } 

        public string? Cedula { get; set; }
    }
}
