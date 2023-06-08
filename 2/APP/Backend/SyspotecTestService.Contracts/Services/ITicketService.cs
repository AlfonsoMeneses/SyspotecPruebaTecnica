using SyspotecTestService.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Services
{
    public interface ITicketService
    {
        TicketDto Create(TicketDto ticket);

        TicketDto AssignTicket(int ticketId, int userId, DateTime assignDate);
    }
}
