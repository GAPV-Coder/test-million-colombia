using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<User> _collection;

        public UserRepository(MongoDbContext context)
        {
            _context = context;
            _collection = _context.Database.GetCollection<User>("Users");
            EnsureIndexesAsync().GetAwaiter().GetResult();
        }

        public async Task EnsureIndexesAsync(CancellationToken ct = default)
        {
            var index = Builders<User>.IndexKeys.Ascending(u => u.Email);
            await _collection.Indexes.CreateOneAsync(new CreateIndexModel<User>(index, new CreateIndexOptions { Unique = true }), cancellationToken: ct);
        }

        public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default)
            => await _collection.Find(u => u.Email == email).FirstOrDefaultAsync(ct);

        public async Task<User?> GetByIdAsync(string id, CancellationToken ct = default)
            => await _collection.Find(u => u.Id == id).FirstOrDefaultAsync(ct);

        public async Task CreateAsync(User user, CancellationToken ct = default)
            => await _collection.InsertOneAsync(user, cancellationToken: ct);
    }
}
