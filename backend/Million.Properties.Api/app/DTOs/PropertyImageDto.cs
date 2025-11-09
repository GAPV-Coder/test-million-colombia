namespace Million.Properties.Api.Application.DTOs
{
    public class PropertyImageDto
    {
        public string? IdPropertyImage { get; set; }
        public string IdProperty { get; set; } = default!;
        public string File { get; set; } = default!;
        public bool Enabled { get; set; } = true;
    }
}
