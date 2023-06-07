using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Exceptions
{
    public class TicketServiceException: Exception
    {
        public TicketServiceException() { }

        public TicketServiceException(string message) : base(message) { }
    }
}
