using Microsoft.AspNetCore.Http;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Infrastructure.Persistence;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace Million.Properties.Api.Infrastructure.FileStorage
{
    public class GridFsService : IGridFsService
    {
        private readonly IGridFSBucket _bucket;

        public GridFsService(MongoDbContext context)
        {
            _bucket = new GridFSBucket(context.Database);
        }

        public async Task<string> UploadFileAsync(IFormFile file, CancellationToken ct = default)
        {
            using var stream = file.OpenReadStream();
            var id = await _bucket.UploadFromStreamAsync(file.FileName, stream, cancellationToken: ct);
            return id.ToString();
        }

        public async Task<byte[]> DownloadFileAsync(string id, CancellationToken ct = default)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            return await _bucket.DownloadAsBytesAsync(objectId, cancellationToken: ct);
        }

        public async Task DeleteFileAsync(string id, CancellationToken ct = default)
        {
            var objectId = new MongoDB.Bson.ObjectId(id);
            await _bucket.DeleteAsync(objectId, cancellationToken: ct);
        }
    }
}
