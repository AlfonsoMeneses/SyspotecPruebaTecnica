using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SyspotecTestService.Contracts.Exceptions
{
    public class UserServiceException: Exception
    {
        public UserServiceException() { }

        public UserServiceException(string message) : base(message) { }
    }
}
