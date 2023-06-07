using SyspotecTestService.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Services
{
    public interface IUserService
    {
        IEnumerable<UserDto> GetUsers();
        UserDto Create(string name, string document);
        UserDto Update(int userId, UserDto user);
        UserDto Delete(int userId);
    }
}
