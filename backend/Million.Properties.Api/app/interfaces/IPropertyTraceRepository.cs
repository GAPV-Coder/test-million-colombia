using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IPropertyTraceRepository
    {
        Task EnsureIndexesAsync(CancellationToken ct = default);
        Task<List<PropertyTrace>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default);
        Task CreateAsync(PropertyTrace trace, CancellationToken ct = default);
    }
}
