using AutoMapper;
using SyspotecTestService.API.Request;
using SyspotecTestService.Contracts.Models;

namespace SyspotecTestService.API.Mappers
{
    public class UserMapProfile: Profile
    {
        public UserMapProfile()
        {
            CreateMap<UserToEditRequest, UserDto>();
        }
    }
}
