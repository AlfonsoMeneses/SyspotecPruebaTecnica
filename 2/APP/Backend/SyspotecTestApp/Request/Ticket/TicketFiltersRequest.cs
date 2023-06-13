namespace SyspotecTestService.API.Request.Ticket
{
    public class TicketFiltersRequest
    {
        public string? UserName { get; set; }
        public string? Description { get; set; }
        public bool? IsAssigned { get; set; }
        public int? Number { get; set; }
        public string? Priority { get; set; }
        public int? Status { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
