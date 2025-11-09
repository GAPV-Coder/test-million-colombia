using AutoMapper;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Application.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepo;
        private readonly IOwnerRepository _ownerRepo;
        private readonly IMapper _mapper;

        public PropertyService(
            IPropertyRepository propertyRepo,
            IOwnerRepository ownerRepo,
            IMapper mapper)
        {
            _propertyRepo = propertyRepo;
            _ownerRepo = ownerRepo;
            _mapper = mapper;
        }

        // GET ALL (con filtros, público)
        public async Task<PagedResponseDto<PropertyDto>> GetAllAsync(
            string? name,
            string? address,
            decimal? minPrice,
            decimal? maxPrice,
            int page = 1,
            int pageSize = 6,
            CancellationToken ct = default)
        {
            var (properties, total) = await _propertyRepo.GetAllAsync(name, address, minPrice, maxPrice, page, pageSize, ct);
            var result = _mapper.Map<List<PropertyDto>>(properties);

            return new PagedResponseDto<PropertyDto>
            {
                Items = result,
                Page = page,
                PageSize = pageSize,
                Total = total
            };
        }

        // GET ALL (sin filtros)
        public async Task<PagedResponseDto<PropertyDto>> GetAllWithoutFiltersAsync(
            int page = 1,
            int pageSize = 6,
            CancellationToken ct = default)
        {
            var (properties, total) = await _propertyRepo.GetAllAsync(null, null, null, null, page, pageSize, ct);
            var result = _mapper.Map<List<PropertyDto>>(properties);

            return new PagedResponseDto<PropertyDto>
            {
                Items = result,
                Page = page,
                PageSize = pageSize,
                Total = total
            };
        }

        // GET BY ID
        public async Task<PropertyDto?> GetByIdAsync(string id, CancellationToken ct = default)
        {
            var property = await _propertyRepo.GetByIdAsync(id, ct);
            return property == null ? null : _mapper.Map<PropertyDto>(property);
        }

        // CREATE (solo autenticado Owner)
        public async Task<PropertyDto> CreateAsync(CreatePropertyDto dto, CancellationToken ct = default)
        {
            var owner = await _ownerRepo.GetByIdAsync(dto.IdOwner, ct);
            if (owner == null)
                throw new InvalidOperationException("Owner no encontrado.");

            var property = _mapper.Map<Property>(dto);
            await _propertyRepo.CreateAsync(property, ct);

            return _mapper.Map<PropertyDto>(property);
        }

        // UPDATE (solo si pertenece al Owner)
        public async Task UpdateAsync(string id, UpdatePropertyDto dto, string ownerId, CancellationToken ct = default)
        {
            var property = await _propertyRepo.GetByIdAsync(id, ct);
            if (property == null)
                throw new KeyNotFoundException("Propiedad no encontrada.");

            if (property.IdOwner != ownerId)
                throw new UnauthorizedAccessException("No tienes permisos para modificar esta propiedad.");

            var updateBuilder = Builders<Property>.Update;
            var updates = new List<UpdateDefinition<Property>>();

            if (dto.Name != null)
                updates.Add(updateBuilder.Set(p => p.Name, dto.Name));
            if (dto.Address != null)
                updates.Add(updateBuilder.Set(p => p.Address, dto.Address));
            if (dto.Price.HasValue)
                updates.Add(updateBuilder.Set(p => p.Price, dto.Price.Value));
            if (dto.CodeInternal != null)
                updates.Add(updateBuilder.Set(p => p.CodeInternal, dto.CodeInternal));
            if (dto.Year.HasValue)
                updates.Add(updateBuilder.Set(p => p.Year, dto.Year.Value));

            if (updates.Any())
            {
                var updateDef = updateBuilder.Combine(updates);
                await _propertyRepo.UpdateAsync(id, updateDef, ct);
            }
        }

        // DELETE (solo si pertenece al Owner)
        public async Task DeleteAsync(string id, string ownerId, CancellationToken ct = default)
        {
            var property = await _propertyRepo.GetByIdAsync(id, ct);
            if (property == null)
                throw new KeyNotFoundException("Propiedad no encontrada.");

            if (property.IdOwner != ownerId)
                throw new UnauthorizedAccessException("No tienes permisos para eliminar esta propiedad.");

            await _propertyRepo.DeleteAsync(id, ct);
        }
    }
}
