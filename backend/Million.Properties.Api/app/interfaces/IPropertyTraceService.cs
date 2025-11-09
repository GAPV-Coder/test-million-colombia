using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IPropertyTraceService
    {
        Task<List<PropertyTraceDto>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default);
        Task<PropertyTraceDto> CreateAsync(CreatePropertyTraceDto dto, CancellationToken ct = default);
    }
}
