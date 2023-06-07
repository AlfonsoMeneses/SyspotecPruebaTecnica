using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyspotecTestService.API.Request;
using SyspotecTestService.Contracts.Exceptions;
using SyspotecTestService.Contracts.Services;

namespace SyspotecTestService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
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
                    Error = "Internal error, try later"
                };
                return StatusCode(500, res);
            }

        }
    }
}
