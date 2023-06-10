using AutoMapper;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.DataService.Entities;

namespace SyspotecTestService.Business.Mappers
{
    public class EstadoTicketMapProfile: Profile
    {
        public EstadoTicketMapProfile()
        {
            CreateMap<EstadoTicket, EstadoTicketDto>();
            CreateMap<EstadoTicketDto, EstadoTicket>();
        }
    }
}
