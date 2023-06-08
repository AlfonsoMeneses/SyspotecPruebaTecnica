using AutoMapper;
using SyspotecTestService.API.Request.Ticket;
using SyspotecTestService.API.Request.User;
using SyspotecTestService.Contracts.Models;

namespace SyspotecTestService.API.Mappers
{
    public class TicketMapProfile: Profile
    {
        public TicketMapProfile()
        {
            CreateMap<TicketToCreateRequest, TicketDto>();
        }
    }
}
