using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Repositories
{
    public class PropertyImageRepository : IPropertyImageRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<PropertyImage> _collection;

        public PropertyImageRepository(MongoDbContext context)
        {
            _context = context;
            _collection = _context.PropertyImages;
            EnsureIndexesAsync().GetAwaiter().GetResult();
        }

        public async Task EnsureIndexesAsync(CancellationToken ct = default)
        {
            var idx = Builders<PropertyImage>.IndexKeys.Ascending(i => i.IdProperty);
            await _collection.Indexes.CreateOneAsync(new CreateIndexModel<PropertyImage>(idx), cancellationToken: ct);
        }

        public async Task<List<PropertyImage>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default)
        {
            var filter = Builders<PropertyImage>.Filter.Eq(i => i.IdProperty, propertyId) & Builders<PropertyImage>.Filter.Eq(i => i.Enabled, true);
            return await _collection.Find(filter).ToListAsync(ct);
        }

        public async Task CreateAsync(PropertyImage image, CancellationToken ct = default)
        {
            await _collection.InsertOneAsync(image, cancellationToken: ct);
        }

        public async Task DisableImageAsync(string id, CancellationToken ct = default)
        {
            var filter = Builders<PropertyImage>.Filter.Eq(i => i.IdPropertyImage, id);
            var update = Builders<PropertyImage>.Update.Set(i => i.Enabled, false);
            await _collection.UpdateOneAsync(filter, update, cancellationToken: ct);
        }
    }
}
