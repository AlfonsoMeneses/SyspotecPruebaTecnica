﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SyspotecTestService.Business.Models;
using SyspotecTestService.Contracts.Exceptions;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.Contracts.Services;
using SyspotecTestService.DataService;
using SyspotecTestService.DataService.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
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

            var user = GetUserById(userId);

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
            // ticketAssigned.AsignadosUsuarios = _mapper.Map<AsignadosUsuarioDto>(assign);

            return ticketAssigned;
        }

        public TicketDto ChangeTicketStatus(int ticketId, int statusId)
        {
            var ticket = GetTicket(ticketId);
            var status = GetTicketStatusById(statusId);

            var assign = _db.AsignadosUsuarios.Include("Usuario")
                                               .Include("Estado")
                                               .FirstOrDefault(a => a.IdTicket == ticketId);

            if (assign == null)
            {
                throw new TicketServiceException("Ticket no se encuentra asignado a un usuario, por lo que no se puede cambiar el estado");
            }

            assign.Estado = status;

            _db.AsignadosUsuarios.Update(assign);

            _db.SaveChanges();

            var ticketEdited = _mapper.Map<TicketDto>(ticket);
            //ticketEdited.AsignadosUsuarios = _mapper.Map<AsignadosUsuarioDto>(assign);

            return ticketEdited;
        }

        public TicketDto Delete(int ticketId)
        {
            var ticket = GetTicket(ticketId);

            var asignado = _db.AsignadosUsuarios.FirstOrDefault(au => au.IdTicket == ticketId);

            if (asignado != null)
            {
                _db.AsignadosUsuarios.Remove(asignado);
            }

            _db.Tickets.Remove(ticket);

            _db.SaveChanges();

            return _mapper.Map<TicketDto>(ticket);

        }

        public IEnumerable<TicketDto> Get(TicketFilters filters)
        {

            var lstTickets = (from tickets in _db.Tickets
                              join asignado in _db.AsignadosUsuarios on tickets.Id equals asignado.IdTicket into au
                              from a in au.DefaultIfEmpty()
                              join user in _db.Usuarios on a.IdUsuario equals user.Id into ua
                              from u in ua.DefaultIfEmpty()
                              join status in _db.EstadoTickets on a.IdEstado equals status.Id into sa
                              from s in sa.DefaultIfEmpty()
                              where (filters.UserName == null || u.Nombre.Contains(filters.UserName)) &&
                                    (filters.Status == null || s.Id == filters.Status.Value) &&
                                    (filters.Number == null || tickets.Numero == filters.Number) &&
                                    (filters.Priority == null || tickets.Prioridad!.Equals(filters.Priority)) &&
                                    (filters.Description == null || tickets.Descripcion!.Contains(filters.Description)) &&
                                    (filters.From == null || a.Fecha >= filters.From) &&
                                    (filters.To == null || a.Fecha <= filters.To) &&
                                    (filters.IsAssigned == null || (a == null && !filters.IsAssigned.Value) || (a != null && filters.IsAssigned.Value))
                              select new TicketDto
                              {
                                  Id = tickets.Id,
                                  Descripcion = tickets.Descripcion,
                                  Numero = tickets.Numero,
                                  Prioridad = tickets.Prioridad,
                                  AsignadosUsuarios = a == null ? null : new AsignadosUsuarioDto
                                  {
                                      Fecha = a.Fecha,
                                      Estado = new EstadoTicketDto
                                      {
                                          Id = s.Id,
                                          Nombre = s.Nombre
                                      },
                                      Usuario = new UsuarioDto
                                      {
                                          Id = u.Id,
                                          Nombre = u.Nombre,
                                          Cedula = u.Cedula
                                      }
                                  }
                              }).ToList();


            return lstTickets;
        }

        public TicketDto EditTicket(int ticketId, TicketDto ticketToEdit)
        {
            var ticket = GetTicket(ticketId);

            if (ticketToEdit == null)
            {
                return _mapper.Map<TicketDto>(ticket);
            }

            if (!string.IsNullOrEmpty(ticketToEdit.Prioridad) && !ticketToEdit.Prioridad.Equals(ticket.Prioridad))
            {
                ticket.Prioridad = ticketToEdit.Prioridad;
            }

            if (!string.IsNullOrEmpty(ticketToEdit.Descripcion) && !ticketToEdit.Descripcion.Equals(ticket.Descripcion))
            {
                ticket.Descripcion = ticketToEdit.Descripcion;
            }

            var wasUserChange = false;
            if (ticketToEdit.AsignadosUsuarios != null && ticket.AsignadosUsuarios != null)
            {

                if (ticketToEdit.AsignadosUsuarios.Usuario.Id != ticket.AsignadosUsuarios.IdUsuario)
                {
                    var user = GetUserById(ticketToEdit.AsignadosUsuarios.Usuario.Id);

                    if (user != null)
                    {
                        ticket.AsignadosUsuarios.Usuario = user;
                        wasUserChange = true;
                    }
                    
                }

                if (ticketToEdit.AsignadosUsuarios.Fecha != null && ticket.AsignadosUsuarios.Fecha != ticketToEdit.AsignadosUsuarios.Fecha)
                {
                    ticket.AsignadosUsuarios.Fecha = ticketToEdit.AsignadosUsuarios.Fecha.Value;
                }

            }

            _db.Tickets.Update(ticket);
            _db.SaveChanges();

            if (ticket.AsignadosUsuarios != null)
            {
                var statusId = ticket.AsignadosUsuarios.IdEstado!.Value;
                ticket.AsignadosUsuarios.Estado = GetTicketStatusById(statusId);

                if (!wasUserChange)
                {
                    ticket.AsignadosUsuarios.Usuario = GetUserById(ticket.AsignadosUsuarios.IdUsuario);
                }
            }
            

            return _mapper.Map<TicketDto>(ticket);

        }

        #region Interno

        private Usuario GetUserById(int id)
        {
            var user = _db.Usuarios.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                throw new TicketServiceException("Usuario no existente");
            }

            return user;
        }

        private int GetNewTicketNumber()
        {
            var lastTicket = _db.Tickets.OrderByDescending(t => t.Numero).FirstOrDefault();

            if (lastTicket != null)
            {
                return lastTicket.Numero + 1;
            }

            return 1;
        }

        private Ticket GetTicket(int id, bool withAssignment)
        {
            if (withAssignment)
            {
                return GetTicket(id);
            }

            var ticket = _db.Tickets.FirstOrDefault(t => t.Id == id);

            if (ticket == null)
            {
                throw new TicketServiceException("Ticket no existente");
            }

            return ticket;
        }

        private Ticket GetTicket(int id)
        {
            var ticket = _db.Tickets.Include("AsignadosUsuarios").FirstOrDefault(t => t.Id == id);

            if (ticket == null)
            {
                throw new TicketServiceException("Ticket no existente");
            }

            return ticket;
        }

        private EstadoTicket? GetTicketStatus(string name)
        {
            var status = _db.EstadoTickets.FirstOrDefault(et => et.Nombre.Equals(name));

            if (status == null)
            {
                throw new TicketServiceException("Estado no existente");
            }

            return status;
        }

        private EstadoTicket? GetTicketStatusById(int id)
        {
            var status = _db.EstadoTickets.FirstOrDefault(et => et.Id == id);

            if (status == null)
            {
                throw new TicketServiceException("Estado no existente");
            }

            return status;
        }

        #endregion Interno
    }
}
