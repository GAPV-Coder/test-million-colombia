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
            CreateMap<CreatePropertyDto, Property>();
            CreateMap<UpdatePropertyDto, Property>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            CreateMap<PropertyImage, PropertyImageDto>().ReverseMap();
            CreateMap<PropertyTrace, PropertyTraceDto>().ReverseMap();

            CreateMap<Owner, OwnerDto>().ReverseMap();

            CreateMap<RegisterUserDto, Domain.Entities.User>(); // Si agrega una entidad de usuario
            CreateMap<Domain.Entities.User, UserDto>();
            CreateMap<Domain.Entities.User, AuthResponseDto>().ForMember(dest => dest.User, opt => opt.MapFrom(src => src));
        }
    }
}

