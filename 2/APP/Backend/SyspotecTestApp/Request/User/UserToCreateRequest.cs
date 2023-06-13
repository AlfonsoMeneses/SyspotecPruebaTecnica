using System.ComponentModel.DataAnnotations;

namespace SyspotecTestService.API.Request.User
{
    public class UserToCreateRequest
    {
        [Required]
        public string Nombre { get; set; } = null!;

        [Required]
        public string Cedula { get; set; } = null!;
    }
}
