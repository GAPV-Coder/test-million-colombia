namespace Million.Properties.Api.Application.DTOs
{
    public class PagedResponseDto<T>
    {
        public List<T> Items { get; set; } = new();
        public int Page { get; set; }
        public int PageSize { get; set; }
        public long Total { get; set; }
    }
}
