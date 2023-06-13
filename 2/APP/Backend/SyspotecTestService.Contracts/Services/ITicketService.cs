using SyspotecTestService.Contracts.Models;

namespace SyspotecTestService.Contracts.Services
{
    public interface ITicketService
    {
        IEnumerable<TicketDto> Get(TicketFilters filters);
        TicketDto Create(TicketDto ticket);
        TicketDto AssignTicket(int ticketId, int userId);
        TicketDto ChangeTicketStatus(int ticketId, int statusId);
        TicketDto EditTicket(int ticketId, TicketDto ticketToEdit);
        TicketDto Delete(int ticketId);

        IEnumerable<EstadoTicketDto> GetTicketStatus();
        
    }
}
