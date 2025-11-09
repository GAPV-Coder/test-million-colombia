using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IPropertyImageRepository
    {
        Task EnsureIndexesAsync(CancellationToken ct = default);
        Task<List<PropertyImage>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default);
        Task CreateAsync(PropertyImage image, CancellationToken ct = default);
        Task DisableImageAsync(string id, CancellationToken ct = default);
    }
}
