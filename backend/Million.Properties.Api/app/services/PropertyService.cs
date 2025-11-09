using AutoMapper;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Infrastructure.Persistence.Repositories;

namespace Million.Properties.Api.Application.Services
{
    public interface IPropertyService
    {
        Task<List<PropertyDto>> GetAllAsync();
        Task<PropertyDto?> GetByIdAsync(string id);
        Task CreateAsync(PropertyDto dto);
    }

    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _repo;
        private readonly IMapper _mapper;

        public PropertyService(IPropertyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<PropertyDto>> GetAllAsync()
        {
            var items = await _repo.GetAllAsync();
            return _mapper.Map<List<PropertyDto>>(items);
        }

        public async Task<PropertyDto?> GetByIdAsync(string id)
        {
            var item = await _repo.GetByIdAsync(id);
            return _mapper.Map<PropertyDto?>(item);
        }

        public async Task CreateAsync(PropertyDto dto)
        {
            var entity = _mapper.Map<Domain.Entities.Property>(dto);
            await _repo.CreateAsync(entity);
        }
    }
}
