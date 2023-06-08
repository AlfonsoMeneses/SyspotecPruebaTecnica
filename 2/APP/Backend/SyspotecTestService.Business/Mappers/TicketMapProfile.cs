using AutoMapper;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.DataService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Business.Mappers
{
    public class TicketMapProfile: Profile
    {
        public TicketMapProfile()
        {
            CreateMap<TicketDto, Ticket>();
            CreateMap<Ticket, TicketDto>();

            CreateMap<AsignadosUsuarioDto, AsignadosUsuario>();
            CreateMap<AsignadosUsuario, AsignadosUsuarioDto>();
        }
    }
}
