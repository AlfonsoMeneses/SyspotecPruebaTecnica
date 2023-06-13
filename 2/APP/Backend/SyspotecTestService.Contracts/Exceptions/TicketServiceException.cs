
namespace SyspotecTestService.Contracts.Exceptions
{
    public class TicketServiceException: Exception
    {
        public TicketServiceException() { }

        public TicketServiceException(string message) : base(message) { }
    }
}
