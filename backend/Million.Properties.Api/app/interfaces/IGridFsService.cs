using Microsoft.AspNetCore.Http;

namespace Million.Properties.Api.Application.Interfaces
{
    public interface IGridFsService
    {
        Task<string> UploadFileAsync(IFormFile file, CancellationToken ct = default);
        Task<byte[]> DownloadFileAsync(string id, CancellationToken ct = default);
        Task DeleteFileAsync(string id, CancellationToken ct = default);
    }
}
