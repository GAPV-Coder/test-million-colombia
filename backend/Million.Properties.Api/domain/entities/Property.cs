using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Properties.Api.Domain.Entities
{
    public class Property
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? IdProperty { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("address")]
        public string Address { get; set; } = default!;

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("codeInternal")]
        public string CodeInternal { get; set; } = default!;

        [BsonElement("year")]
        public int Year { get; set; }

        [BsonElement("description")]
        public string Description { get; set; } = default!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("idOwner")]
        public string IdOwner { get; set; } = default!;
    }
}
