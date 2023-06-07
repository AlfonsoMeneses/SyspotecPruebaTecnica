using System;
using System.Collections.Generic;

namespace SyspotecTestService.DataService.Entities;

public partial class EstadoTicket
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<AsignadosUsuario> AsignadosUsuarios { get; set; } = new List<AsignadosUsuario>();
}
