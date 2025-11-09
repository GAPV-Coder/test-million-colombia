namespace Million.Properties.Api.Application.DTOs
{
    public class PropertyDto
    {
        public string? IdProperty { get; set; }
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
        public decimal Price { get; set; }
        public string CodeInternal { get; set; } = default!;
        public int Year { get; set; }
        public string Description { get; set; } = default!;
        public string IdOwner { get; set; } = default!;
    }
}
