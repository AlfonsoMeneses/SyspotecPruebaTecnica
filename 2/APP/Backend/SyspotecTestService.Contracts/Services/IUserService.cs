using SyspotecTestService.Contracts.Models;

namespace SyspotecTestService.Contracts.Services
{
    public interface IUserService
    {
        IEnumerable<UsuarioDto> GetUsers();
        UsuarioDto Create(string name, string document);
        UsuarioDto Edit(int userId, UsuarioDto user);
        UsuarioDto Delete(int userId);
    }
}
