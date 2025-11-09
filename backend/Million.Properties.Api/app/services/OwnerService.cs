using AutoMapper;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Services
{
    public class OwnerService : IOwnerService
    {
        private readonly IOwnerRepository _ownerRepo;
        private readonly IMapper _mapper;

        public OwnerService(IOwnerRepository ownerRepo, IMapper mapper)
        {
            _ownerRepo = ownerRepo;
            _mapper = mapper;
        }

        public async Task<List<OwnerDto>> GetAllAsync(CancellationToken ct = default)
        {
            var owners = await _ownerRepo.GetAllAsync(ct);
            return _mapper.Map<List<OwnerDto>>(owners);
        }

        public async Task<OwnerDto?> GetByIdAsync(string id, CancellationToken ct = default)
        {
            var owner = await _ownerRepo.GetByIdAsync(id, ct);
            return owner == null ? null : _mapper.Map<OwnerDto>(owner);
        }

        public async Task<OwnerDto> CreateAsync(OwnerDto dto, CancellationToken ct = default)
        {
            var entity = _mapper.Map<Owner>(dto);
            await _ownerRepo.CreateAsync(entity, ct);
            return _mapper.Map<OwnerDto>(entity);
        }

        public async Task UpdateAsync(string id, OwnerDto dto, CancellationToken ct = default)
        {
            var entity = _mapper.Map<Owner>(dto);
            entity.IdOwner = id;
            await _ownerRepo.UpdateAsync(id, entity, ct);
        }

        public async Task DeleteAsync(string id, CancellationToken ct = default)
        {
            await _ownerRepo.DeleteAsync(id, ct);
        }
    }
}
