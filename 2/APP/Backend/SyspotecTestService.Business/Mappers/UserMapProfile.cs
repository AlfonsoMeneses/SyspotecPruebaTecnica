using AutoMapper;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.DataService.Entities;

namespace SyspotecTestService.Business.Mappers
{
    public class UserMapProfile: Profile
    {
        public UserMapProfile()
        {
            CreateMap<UsuarioDto, Usuario>();
            CreateMap<Usuario, UsuarioDto>();
        }
    }
}
