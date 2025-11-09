using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IPropertyService
    {
        Task<PagedResponseDto<PropertyDto>> GetAllAsync(
            string? name,
            string? address,
            decimal? minPrice,
            decimal? maxPrice,
            int page = 1,
            int pageSize = 6,
            CancellationToken ct = default);

        Task<PagedResponseDto<PropertyDto>> GetAllWithoutFiltersAsync(
            int page = 1,
            int pageSize = 6,
            CancellationToken ct = default);

        Task<PropertyDto?> GetByIdAsync(string id, CancellationToken ct = default);
        Task<PropertyDto> CreateAsync(CreatePropertyDto dto, CancellationToken ct = default);
        Task UpdateAsync(string id, UpdatePropertyDto dto, string ownerId, CancellationToken ct = default);
        Task DeleteAsync(string id, string ownerId, CancellationToken ct = default);
    }
}
