using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SyspotecTestService.API.Helpers;
using SyspotecTestService.API.Request.Ticket;
using SyspotecTestService.API.Response;
using SyspotecTestService.Contracts.Exceptions;
using SyspotecTestService.Contracts.Models;
using SyspotecTestService.Contracts.Services;

namespace SyspotecTestService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _service;
        private readonly IMapper _mapper;

        private const string INTERNAL_ERROR_MESSAGE = "Error interno, intente mas tarde";
        public TicketController(ITicketService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] TicketFiltersRequest filters)
        {
            try
            {
                var ticketFilter = _mapper.Map<TicketFilters>(filters);

                var lstTicket = _service.Get(ticketFilter);

                var res = PaginationHelper.GetListWithPagination(filters.PageSize, filters.PageNumber, lstTicket);

                return Ok(res);
            }
            catch (TicketServiceException uex)
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
        public IActionResult Create([FromBody] TicketToCreateRequest ticket)
        {
            try
            {
                var newTicket = _mapper.Map<TicketDto>(ticket);

                var res = _service.Create(newTicket);

                return Ok(res);
            }
            catch (TicketServiceException uex)
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

        [HttpPost("{ticketId}")]
        public IActionResult Assign(int ticketId, [FromBody] AssignTicketRequest assignTicket)
        {
            try
            {
                var res = _service.AssignTicket(ticketId,assignTicket.IdUsuario, assignTicket.Fecha);

                return Ok(res);
            }
            catch (TicketServiceException uex)
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
