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
        
        /// <summary>
        /// Creación o registro de usuarios
        /// </summary>
        /// <param name="name">Nombre del usuario</param>
        /// <param name="document">Documento del usuario</param>
        /// <returns></returns>
        /// <exception cref="UserServiceException"></exception>
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
            List<UserDto> lstUsers = new List<UserDto>();

            var lst = _db.Usuarios;

            foreach ( var user in lst)
            {
                var userDto = _mapper.Map<UserDto>(user);
                lstUsers.Add(userDto);
            }

            return lstUsers;
        }

        public UserDto Edit(int userId, UserDto user)
        {
            var userToUpdate = _db.Usuarios.FirstOrDefault(user => user.Id == userId);

            if (userToUpdate == null)
            {
                throw new UserServiceException("Usuario inexistente");
            }

            var hasDataToEdit = false;

            if (!string.IsNullOrEmpty(user.Nombre) && !user.Nombre.Equals(userToUpdate.Nombre) )
            {
                userToUpdate.Nombre = user.Nombre;
                hasDataToEdit = true;
            }

            if (!string.IsNullOrEmpty(user.Cedula) && !user.Cedula.Equals(userToUpdate.Cedula))
            {
                userToUpdate.Cedula = user.Cedula;
                hasDataToEdit = true;
            }

            if (hasDataToEdit)
            {
                _db.Usuarios.Update(userToUpdate);
                _db.SaveChanges();
            }

            return _mapper.Map<UserDto>(userToUpdate);
        }
    }
}
