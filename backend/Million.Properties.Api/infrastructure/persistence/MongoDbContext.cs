using Microsoft.Extensions.Options;
using Million.Properties.Api.Config;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
        public MongoDbContext(IOptions<MongoSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _database = client.GetDatabase(options.Value.DatabaseName);
        }

        public IMongoCollection<Domain.Entities.Property> Properties =>
            _database.GetCollection<Domain.Entities.Property>("Properties");
    }
}
