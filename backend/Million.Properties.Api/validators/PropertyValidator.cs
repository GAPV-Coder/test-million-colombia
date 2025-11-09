using FluentValidation;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Validators
{
    public class PropertyValidator : AbstractValidator<PropertyDto>
    {
        public PropertyValidator()
        {
            RuleFor(x => x.IdOwner).NotEmpty();
            RuleFor(x => x.Nombre).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Direccion).NotEmpty().MaximumLength(300);
            RuleFor(x => x.Precio).GreaterThan(0);
            RuleFor(x => x.Imagen).NotEmpty();
        }
    }
}
