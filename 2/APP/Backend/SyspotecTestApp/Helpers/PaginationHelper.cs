using SyspotecTestService.API.Response;
using SyspotecTestService.DataService.Entities;
using System.Collections;

namespace SyspotecTestService.API.Helpers
{
    public class PaginationHelper
    {
        public static DataPaginationResponse GetListWithPagination(int pageSize, int pageNumber, IEnumerable<Object> list)
        {

            if (pageNumber == 0)
            {
                pageNumber = 1;
            }

            if (pageSize == 0)
            {
                pageSize = 10;
            }
            var pageCount = list.Count() / pageSize;

            pageCount += (list.Count() % pageSize) > 0 ? 1 : 0;

            var pagination = new Pagination
            {
                PageSize = pageSize,
                PageNumber = pageNumber,
                PageCount = pageCount
            };

            var lstData = list.Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToList();

            var dataPagiation = new DataPaginationResponse(pagination,lstData);

            return dataPagiation;
        }
    }
}
