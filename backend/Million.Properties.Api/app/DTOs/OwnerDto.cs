namespace Million.Properties.Api.Application.DTOs
{
    public class OwnerDto
    {
        public string? IdOwner { get; set; }
        public string Name { get; set; } = default!;
        public string Address { get; set; } = default!;
        public string? Photo { get; set; }
        public DateTime Birthday { get; set; }
    }
}
