using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IPropertyRepository
    {
        Task EnsureIndexesAsync(CancellationToken ct = default);

        Task<(List<Property> Items, long Total)> GetAllAsync(
            string? nameFilter,
            string? addressFilter,
            decimal? minPrice,
            decimal? maxPrice,
            int page,
            int pageSize,
            CancellationToken ct = default);

        Task<Property?> GetByIdAsync(string id, CancellationToken ct = default);
        Task CreateAsync(Property entity, CancellationToken ct = default);
        Task UpdateAsync(string id, UpdateDefinition<Property> updateDef, CancellationToken ct = default);
        Task DeleteAsync(string id, CancellationToken ct = default);
    }
}
