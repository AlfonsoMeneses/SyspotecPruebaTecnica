using AutoMapper;
using SyspotecTestService.Contracts.Exceptions;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.Contracts.Services;
using SyspotecTestService.DataService;
using SyspotecTestService.DataService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Business.Services
{
    public class UserService : IUserService
    {
        private SyspotecTestMySQLContext _db;
        private readonly IMapper _mapper;

        public UserService(SyspotecTestMySQLContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public UserDto Create(string name, string document)
        {
            if (String.IsNullOrEmpty(name) || String.IsNullOrEmpty(name))
            {
                throw new UserServiceException("Nombre o documento requerido");
            }

            var userValidate = _db.Usuarios.FirstOrDefault(user => user.Cedula.Equals(document));

            if (userValidate != null)
            {
                throw new UserServiceException("Ya existe un usuario con ese documento");
            }

            var newUser = new Usuario
            {
                Nombre = name,
                Cedula = document
            };

            _db.Usuarios.Add(newUser);
            _db.SaveChanges();

            return _mapper.Map<UserDto>(newUser);

        }

        public UserDto Delete(int userId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<UserDto> GetUsers()
        {
            throw new NotImplementedException();
        }

        public UserDto Update(int userId, UserDto user)
        {
            throw new NotImplementedException();
        }
    }
}
