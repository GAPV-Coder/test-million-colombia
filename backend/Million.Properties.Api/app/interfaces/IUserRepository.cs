using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IUserRepository
    {
        Task EnsureIndexesAsync(CancellationToken ct = default);
        Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
        Task<User?> GetByIdAsync(string id, CancellationToken ct = default);
        Task CreateAsync(User user, CancellationToken ct = default);
    }
}
