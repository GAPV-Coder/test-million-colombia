namespace Million.Properties.Api.Application.DTOs
{
    public class PropertyDto
    {
        public string? Id { get; set; }
        public string IdOwner { get; set; } = default!;
        public string Nombre { get; set; } = default!;
        public string Direccion { get; set; } = default!;
        public decimal Precio { get; set; }
        public string Imagen { get; set; } = default!;
    }
}
