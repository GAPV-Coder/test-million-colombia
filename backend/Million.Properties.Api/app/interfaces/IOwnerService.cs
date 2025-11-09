using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IOwnerService
    {
        Task<List<OwnerDto>> GetAllAsync(CancellationToken ct = default);
        Task<OwnerDto?> GetByIdAsync(string id, CancellationToken ct = default);
        Task<OwnerDto> CreateAsync(OwnerDto dto, CancellationToken ct = default);
        Task UpdateAsync(string id, OwnerDto dto, CancellationToken ct = default);
        Task DeleteAsync(string id, CancellationToken ct = default);
    }
}
