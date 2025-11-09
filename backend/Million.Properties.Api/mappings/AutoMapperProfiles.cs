using AutoMapper;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Domain.Entities;

namespace Million.Properties.Api.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Property, PropertyDto>().ReverseMap();
        }
    }
}
