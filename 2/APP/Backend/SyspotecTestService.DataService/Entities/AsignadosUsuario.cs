using System;
using System.Collections.Generic;

namespace SyspotecTestService.DataService.Entities;

public partial class AsignadosUsuario
{
    public int IdUsuario { get; set; }

    public int IdTicket { get; set; }

    public DateTime Fecha { get; set; }

    public int? IdEstado { get; set; }

    public virtual EstadoTicket? Estado { get; set; }

    public virtual Ticket Ticket { get; set; } = null!;

    public virtual Usuario Usuario { get; set; } = null!;
}
