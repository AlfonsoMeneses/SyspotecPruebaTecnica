using System;
using System.Collections.Generic;

namespace SyspotecTestService.DataService.Entities;

public partial class Ticket
{
    public int Id { get; set; }

    public string? Descripcion { get; set; }

    public int Numero { get; set; }

    public string? Prioridad { get; set; }

    public virtual ICollection<AsignadosUsuario> AsignadosUsuarios { get; set; } = new List<AsignadosUsuario>();
}
