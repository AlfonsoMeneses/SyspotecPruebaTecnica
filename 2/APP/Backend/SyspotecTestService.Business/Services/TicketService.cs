using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SyspotecTestService.Business.Models;
using SyspotecTestService.Contracts.Exceptions;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.Contracts.Services;
using SyspotecTestService.DataService;
using SyspotecTestService.DataService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Business.Services
{
    public class TicketService : ITicketService
    {
        private SyspotecTestMySQLContext _db;
        private readonly IMapper _mapper;

        public TicketService(SyspotecTestMySQLContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public TicketDto Create(TicketDto ticket)
        {
            if (string.IsNullOrEmpty(ticket.Descripcion) || string.IsNullOrEmpty(ticket.Prioridad))
            {
                throw new TicketServiceException("Faltan datos obligatorios");
            }

            var newTicket = _mapper.Map<Ticket>(ticket);
            newTicket.Numero = GetNewTicketNumber();

            _db.Tickets.Add(newTicket);
            _db.SaveChanges();

            return _mapper.Map<TicketDto>(newTicket);
        }

        public TicketDto AssignTicket(int ticketId, int userId, DateTime assignDate)
        {
            var ticket = GetTicket(ticketId);

            var user = _db.Usuarios.FirstOrDefault(u => u.Id == userId);

            if (user == null)
            {
                throw new TicketServiceException("Usuario no existente");
            }

            var assigValidate = _db.AsignadosUsuarios.FirstOrDefault(au => au.IdTicket == ticketId);

            if (assigValidate != null)
            {
                throw new TicketServiceException("Ticket ya se encuentra asignado a un usuario");
            }

            var assign = new AsignadosUsuario
            {
                Ticket = ticket,
                Usuario = user,
                Estado = GetTicketStatus(TicketStatus.OnProccess),
                Fecha = assignDate
            };


            _db.Add(assign);
            _db.SaveChanges();

            var ticketAssigned = _mapper.Map<TicketDto>(ticket);
            ticketAssigned.AsignadoUsuario = _mapper.Map<AsignadosUsuarioDto>(assign);

            return ticketAssigned;
        }


        #region 

        private int GetNewTicketNumber()
        {
            var lastTicket = _db.Tickets.OrderByDescending(t => t.Numero).FirstOrDefault();

            if (lastTicket != null)
            {
                return lastTicket.Numero + 1;
            }

            return 1;
        }

        private Ticket GetTicket(int id)
        {
            var ticket = _db.Tickets.FirstOrDefault(t => t.Id == id);

            if (ticket == null)
            {
                throw new TicketServiceException("Ticket no existente");
            }

            return ticket;
        }

        private EstadoTicket? GetTicketStatus(string name)
        {
            return _db.EstadoTickets.FirstOrDefault(et => et.Nombre.Equals(name));
        }

        #endregion
    }
}
