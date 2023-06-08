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
    public class EstadoTicketMapProfile: Profile
    {
        public EstadoTicketMapProfile()
        {
            CreateMap<EstadoTicket, EstadoTicketDto>();
            CreateMap<EstadoTicketDto, EstadoTicket>();
        }
    }
}
