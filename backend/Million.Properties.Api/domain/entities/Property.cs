using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Properties.Api.Domain.Entities
{
    public class Property
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string IdOwner { get; set; } = default!;
        public string Nombre { get; set; } = default!;
        public string Direccion { get; set; } = default!;
        public decimal Precio { get; set; }
        public string Imagen { get; set; } = default!;
    }
}
