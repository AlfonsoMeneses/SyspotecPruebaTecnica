﻿using SyspotecTestService.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Services
{
    public interface ITicketService
    {
        IEnumerable<TicketDto> Get(TicketFilters filters);
        TicketDto Create(TicketDto ticket);
        TicketDto AssignTicket(int ticketId, int userId, DateTime assignDate);
        TicketDto ChangeTicketStatus(int ticketId, int statusId);
        TicketDto EditTicket(int ticketId, TicketDto ticketToEdit);
        TicketDto Delete(int ticketId);
        
    }
}
