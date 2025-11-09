using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Million.Properties.Api.Domain.Entities
{
    public class PropertyTrace
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? IdPropertyTrace { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("idProperty")]
        public string IdProperty { get; set; } = default!;

        [BsonElement("dateSale")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime DateSale { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("value")]
        public decimal Value { get; set; }

        [BsonElement("tax")]
        public decimal Tax { get; set; }
    }
}
