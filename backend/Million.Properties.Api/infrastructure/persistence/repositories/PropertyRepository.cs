using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Infrastructure.Persistence.Repositories
{
    public interface IPropertyRepository
    {
        Task<List<Property>> GetAllAsync();
        Task<Property?> GetByIdAsync(string id);
        Task CreateAsync(Property property);
    }

    public class PropertyRepository : IPropertyRepository
    {
        private readonly MongoDbContext _context;

        public PropertyRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<List<Property>> GetAllAsync() =>
            await _context.Properties.Find(_ => true).ToListAsync();

        public async Task<Property?> GetByIdAsync(string id) =>
            await _context.Properties.Find(p => p.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Property property) =>
            await _context.Properties.InsertOneAsync(property);
    }
}
