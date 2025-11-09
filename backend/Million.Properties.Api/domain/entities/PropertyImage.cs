using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Properties.Api.Domain.Entities
{
    public class PropertyImage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? IdPropertyImage { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("idProperty")]
        public string IdProperty { get; set; } = default!;

        [BsonElement("file")]
        public string File { get; set; } = default!;

        [BsonElement("enabled")]
        public bool Enabled { get; set; } = true;
    }
}
