using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IOwnerRepository
    {
        Task EnsureIndexesAsync(CancellationToken ct = default);
        Task<List<Owner>> GetAllAsync(CancellationToken ct = default);
        Task<Owner?> GetByIdAsync(string id, CancellationToken ct = default);
        Task CreateAsync(Owner entity, CancellationToken ct = default);
        Task UpdateAsync(string id, Owner entity, CancellationToken ct = default);
        Task DeleteAsync(string id, CancellationToken ct = default);
    }
}
