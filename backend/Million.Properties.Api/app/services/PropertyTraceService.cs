using AutoMapper;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Application.Services
{
    public class PropertyTraceService : IPropertyTraceService
    {
        private readonly IPropertyTraceRepository _traceRepo;
        private readonly IMapper _mapper;

        public PropertyTraceService(IPropertyTraceRepository traceRepo, IMapper mapper)
        {
            _traceRepo = traceRepo;
            _mapper = mapper;
        }

        public async Task<List<PropertyTraceDto>> GetByPropertyIdAsync(string propertyId, CancellationToken ct = default)
        {
            var traces = await _traceRepo.GetByPropertyIdAsync(propertyId, ct);
            return _mapper.Map<List<PropertyTraceDto>>(traces);
        }

        public async Task<PropertyTraceDto> CreateAsync(CreatePropertyTraceDto dto, CancellationToken ct = default)
        {
            var entity = _mapper.Map<PropertyTrace>(dto);
            await _traceRepo.CreateAsync(entity, ct);
            return _mapper.Map<PropertyTraceDto>(entity);
        }
    }
}
