
namespace SyspotecTestService.Contracts.Exceptions
{
    public class UserServiceException: Exception
    {
        public UserServiceException() { }

        public UserServiceException(string message) : base(message) { }
    }
}
