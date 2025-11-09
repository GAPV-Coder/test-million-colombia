using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Million.Properties.Api.Domain.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("email")]
        public string Email { get; set; } = default!;

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; } = default!;

        [BsonElement("fullName")]
        public string FullName { get; set; } = default!;

        [BsonElement("photo")]
        public string? Photo { get; set; }

        [BsonElement("role")]
        public string Role { get; set; } = "Owner";
    }
}
