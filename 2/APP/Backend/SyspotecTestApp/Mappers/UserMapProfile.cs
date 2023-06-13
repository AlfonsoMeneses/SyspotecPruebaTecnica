using AutoMapper;
using SyspotecTestService.API.Request.User;
using SyspotecTestService.Contracts.Models;

namespace SyspotecTestService.API.Mappers
{
    public class UserMapProfile : Profile
    {
        public UserMapProfile()
        {
            CreateMap<UserToEditRequest, UsuarioDto>();
        }
    }
}
