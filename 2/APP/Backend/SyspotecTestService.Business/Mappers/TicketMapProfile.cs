using AutoMapper;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.DataService.Entities;

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
