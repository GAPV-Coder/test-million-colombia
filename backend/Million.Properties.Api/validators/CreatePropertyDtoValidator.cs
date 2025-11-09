using FluentValidation;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Validators
{
    public class CreatePropertyDtoValidator : AbstractValidator<CreatePropertyDto>
    {
        public CreatePropertyDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Address).NotEmpty().MaximumLength(300);
            RuleFor(x => x.Price).GreaterThan(0);
            RuleFor(x => x.CodeInternal).NotEmpty();
            RuleFor(x => x.Year).InclusiveBetween(1800, DateTime.UtcNow.Year + 1);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
            RuleFor(x => x.IdOwner).NotEmpty();
        }
    }
}
