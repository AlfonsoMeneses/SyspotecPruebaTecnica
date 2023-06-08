using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Models
{
    public class UsuarioDto
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = null!;

        public string Cedula { get; set; } = null!;
    }
}
