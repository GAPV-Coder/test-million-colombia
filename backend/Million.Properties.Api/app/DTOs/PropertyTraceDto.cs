namespace Million.Properties.Api.Application.DTOs
{
    public class PropertyTraceDto
    {
        public string? IdPropertyTrace { get; set; }
        public string IdProperty { get; set; } = default!;
        public DateTime DateSale { get; set; }
        public string Name { get; set; } = default!;
        public decimal Value { get; set; }
        public decimal Tax { get; set; }
    }
}
