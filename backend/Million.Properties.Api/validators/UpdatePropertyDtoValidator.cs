using FluentValidation;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Validators
{
    public class UpdatePropertyDtoValidator : AbstractValidator<UpdatePropertyDto>
    {
        public UpdatePropertyDtoValidator()
        {
            When(x => x.Name != null, () => {
                RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            });

            When(x => x.Address != null, () => {
                RuleFor(x => x.Address).NotEmpty().MaximumLength(300);
            });

            When(x => x.Price != null, () => {
                RuleFor(x => x.Price).GreaterThan(0);
            });

            When(x => x.Description != null, () => {
                RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
            });
        }
    }
}
