using AutoMapper;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Services
{
    public class PropertyImageService : IPropertyImageService
    {
        private readonly IPropertyImageRepository _repo;
        private readonly IGridFsService _gridFs; // Servicio para guardar archivos en GridFS
        private readonly IMapper _mapper;

        public PropertyImageService(IPropertyImageRepository repo, IGridFsService gridFs, IMapper mapper)
        {
            _repo = repo;
            _gridFs = gridFs;
            _mapper = mapper;
        }

        public async Task<List<PropertyImageDto>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default)
        {
            var images = await _repo.GetByPropertyIdAsync(propertyId, ct);
            return _mapper.Map<List<PropertyImageDto>>(images);
        }

        public async Task<PropertyImageDto> CreateAsync(IFormFile file, string propertyId, CancellationToken ct = default)
        {
            // Idealmente, valida el tipo y tamaño del archivo en el controlador.
            var fileId = await _gridFs.UploadFileAsync(file, ct); // Devuelve el ID de cadena (ObjectId de GridFS como cadena).
            var entity = new PropertyImage
            {
                IdProperty = propertyId,
                File = fileId,
                Enabled = true
            };
            await _repo.CreateAsync(entity, ct);
            return _mapper.Map<PropertyImageDto>(entity);
        }

        public async Task<PropertyImageDto> UploadAsync(string propertyId, IFormFile file, CancellationToken ct = default)
        {
            return await CreateAsync(file, propertyId, ct);
        }

        public async Task DisableImageAsync(string id, CancellationToken ct = default)
        {
            await _repo.DisableImageAsync(id, ct);
        }
    }
}
