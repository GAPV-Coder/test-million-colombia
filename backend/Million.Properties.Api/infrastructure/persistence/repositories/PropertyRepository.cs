using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;
using Million.Properties.Api.Infrastructure.Persistence;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Property> _collection;

        public PropertyRepository(MongoDbContext context)
        {
            _context = context;
            _collection = _context.Properties;
            EnsureIndexesAsync().GetAwaiter().GetResult();
        }

        public async Task EnsureIndexesAsync(CancellationToken ct = default)
        {
            var indexKeys = Builders<Property>.IndexKeys
                .Ascending(p => p.Name)
                .Ascending(p => p.Address)
                .Ascending(p => p.Price);
            await _collection.Indexes.CreateOneAsync(new CreateIndexModel<Property>(indexKeys), cancellationToken: ct);
        }

        public async Task<(List<Property> Items, long Total)> GetAllAsync(
            string? nameFilter,
            string? addressFilter,
            decimal? minPrice,
            decimal? maxPrice,
            int page,
            int pageSize,
            CancellationToken ct = default)
        {
            var filterBuilder = Builders<Property>.Filter;
            var filters = new List<FilterDefinition<Property>>();

            if (!string.IsNullOrWhiteSpace(nameFilter))
                filters.Add(filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(nameFilter, "i")));

            if (!string.IsNullOrWhiteSpace(addressFilter))
                filters.Add(filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(addressFilter, "i")));

            if (minPrice.HasValue)
                filters.Add(filterBuilder.Gte(p => p.Price, minPrice.Value));

            if (maxPrice.HasValue)
                filters.Add(filterBuilder.Lte(p => p.Price, maxPrice.Value));

            var filter = filters.Count > 0 ? filterBuilder.And(filters) : filterBuilder.Empty;

            var skip = (page - 1) * pageSize;
            var total = await _collection.CountDocumentsAsync(filter, cancellationToken: ct);
            var items = await _collection
                .Find(filter)
                .Skip(skip)
                .Limit(pageSize)
                .SortBy(p => p.Name)
                .ToListAsync(ct);

            return (items, total);
        }

        public async Task<Property?> GetByIdAsync(string id, CancellationToken ct = default)
            => await _collection.Find(p => p.IdProperty == id).FirstOrDefaultAsync(ct);

        public async Task CreateAsync(Property entity, CancellationToken ct = default)
            => await _collection.InsertOneAsync(entity, cancellationToken: ct);

        public async Task UpdateAsync(string id, UpdateDefinition<Property> updateDef, CancellationToken ct = default)
            => await _collection.UpdateOneAsync(p => p.IdProperty == id, updateDef, cancellationToken: ct);

        public async Task DeleteAsync(string id, CancellationToken ct = default)
            => await _collection.DeleteOneAsync(p => p.IdProperty == id, cancellationToken: ct);
    }
}
