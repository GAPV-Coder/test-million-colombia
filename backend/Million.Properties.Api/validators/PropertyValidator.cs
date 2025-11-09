using FluentValidation;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Validators
{
    public class PropertyValidator : AbstractValidator<PropertyDto>
    {
        public PropertyValidator()
        {
            RuleFor(x => x.IdOwner).NotEmpty();
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Address).NotEmpty().MaximumLength(300);
            RuleFor(x => x.Price).GreaterThan(0);
        }
    }
}
