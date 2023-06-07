using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyspotecTestService.API.Request;
using SyspotecTestService.Contracts.Exceptions;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.Contracts.Services;

namespace SyspotecTestService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly IMapper _mapper;

        private const string INTERNAL_ERROR_MESSAGE = "Error interno, intente mas tarde";

        public UserController(IUserService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var res = _service.GetUsers();
                return Ok(res);
            }
            catch (UserServiceException uex)
            {
                var res = new
                {
                    Error = uex.Message
                };
                return BadRequest(res);
            }
            catch (Exception)
            {
                var res = new
                {
                    Error = INTERNAL_ERROR_MESSAGE
                };
                return StatusCode(500, res);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] UserToCreateRequest newUser)
        {
            try
            {
                var res = _service.Create(newUser.Nombre, newUser.Cedula);
                return Ok(res);
            }
            catch (UserServiceException uex)
            {
                var res = new
                {
                    Error = uex.Message
                };
                return BadRequest(res);
            }
            catch (Exception)
            {
                var res = new
                {
                    Error = INTERNAL_ERROR_MESSAGE
                };
                return StatusCode(500, res);
            }
        }

        [HttpPut("{userId}")]
        public IActionResult Edit(int userId,[FromBody] UserToEditRequest editUser)
        {
            try
            {
                var res = _service.Edit(userId, _mapper.Map<UserDto>(editUser));
                return Ok(res);
            }
            catch (UserServiceException uex)
            {
                var res = new
                {
                    Error = uex.Message
                };
                return BadRequest(res);
            }
            catch (Exception)
            {
                var res = new
                {
                    Error = INTERNAL_ERROR_MESSAGE
                };
                return StatusCode(500, res);
            }
        }

        [HttpDelete("{userId}")]
        public IActionResult Delete(int userId)
        {
            try
            {
                var res = _service.Delete(userId);
                return Ok(res);
            }
            catch (UserServiceException uex)
            {
                var res = new
                {
                    Error = uex.Message
                };
                return BadRequest(res);
            }
            catch (Exception)
            {
                var res = new
                {
                    Error = INTERNAL_ERROR_MESSAGE
                };
                return StatusCode(500, res);
            }
        }
    }
}
