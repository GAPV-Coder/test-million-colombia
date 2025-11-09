using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Million.Properties.Api.Domain.Entities
{
    public class Owner
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? IdOwner { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("address")]
        public string Address { get; set; } = default!;

        [BsonElement("photo")]
        public string? Photo { get; set; }

        [BsonElement("birthday")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime Birthday { get; set; }
    }
}
