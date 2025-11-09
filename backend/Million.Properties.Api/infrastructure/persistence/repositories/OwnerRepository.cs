using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Owner> _collection;

        public OwnerRepository(MongoDbContext context)
        {
            _context = context;
            _collection = _context.Owners;
            EnsureIndexesAsync().GetAwaiter().GetResult();
        }

        public async Task EnsureIndexesAsync(CancellationToken ct = default)
        {
            var index = Builders<Owner>.IndexKeys.Ascending(o => o.Name);
            await _collection.Indexes.CreateOneAsync(new CreateIndexModel<Owner>(index), cancellationToken: ct);
        }

        public async Task<List<Owner>> GetAllAsync(CancellationToken ct = default)
            => await _collection.Find(_ => true).ToListAsync(ct);

        public async Task<Owner?> GetByIdAsync(string id, CancellationToken ct = default)
            => await _collection.Find(o => o.IdOwner == id).FirstOrDefaultAsync(ct);

        public async Task CreateAsync(Owner entity, CancellationToken ct = default)
            => await _collection.InsertOneAsync(entity, cancellationToken: ct);

        public async Task UpdateAsync(string id, Owner entity, CancellationToken ct = default)
            => await _collection.ReplaceOneAsync(o => o.IdOwner == id, entity, cancellationToken: ct);

        public async Task DeleteAsync(string id, CancellationToken ct = default)
            => await _collection.DeleteOneAsync(o => o.IdOwner == id, cancellationToken: ct);
    }
}
