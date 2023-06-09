using SyspotecTestService.Contracts.Models;

namespace SyspotecTestService.API.Response
{
    public class DataPaginationResponse
    {
        public Pagination Pagination { get; set; } = null!;
        public IEnumerable<Object> Data{ get; set; }

        public DataPaginationResponse(Pagination pagination, IEnumerable<Object> data)
        {
            Pagination = pagination;
            Data = data;
        }
    }
}
