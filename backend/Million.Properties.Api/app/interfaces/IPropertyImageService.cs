using Million.Properties.Api.Application.DTOs;
using Microsoft.AspNetCore.Http;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IPropertyImageService
    {
        Task<List<PropertyImageDto>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default);
        Task<PropertyImageDto> CreateAsync(IFormFile file, string propertyId, CancellationToken ct = default);
        Task<PropertyImageDto> UploadAsync(string propertyId, IFormFile file, CancellationToken ct = default);
        Task DisableImageAsync(string id, CancellationToken ct = default);
    }
}
