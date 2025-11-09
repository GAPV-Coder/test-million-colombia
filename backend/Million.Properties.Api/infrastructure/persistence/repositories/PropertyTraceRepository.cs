using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Repositories
{
    public class PropertyTraceRepository : IPropertyTraceRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<PropertyTrace> _collection;

        public PropertyTraceRepository(MongoDbContext context)
        {
            _context = context;
            _collection = _context.PropertyTraces;
            EnsureIndexesAsync().GetAwaiter().GetResult();
        }

        public async Task EnsureIndexesAsync(CancellationToken ct = default)
        {
            var idx = Builders<PropertyTrace>.IndexKeys.Ascending(p => p.IdProperty).Ascending(p => p.DateSale);
            await _collection.Indexes.CreateOneAsync(new CreateIndexModel<PropertyTrace>(idx), cancellationToken: ct);
        }

        public async Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default)
        {
            var filter = Builders<PropertyTrace>.Filter.Eq(t => t.IdProperty, propertyId);
            return await _collection.Find(filter).SortByDescending(t => t.DateSale).ToListAsync(ct);
        }

        public async Task CreateAsync(PropertyTrace trace, CancellationToken ct = default)
        {
            await _collection.InsertOneAsync(trace, cancellationToken: ct);
        }
    }
}
