﻿using SyspotecTestService.Contracts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
