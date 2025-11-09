using FluentValidation;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Validators
{
    public class CreatePropertyTraceDtoValidator : AbstractValidator<CreatePropertyTraceDto>
    {
        public CreatePropertyTraceDtoValidator()
        {
            RuleFor(x => x.IdProperty).NotEmpty();
            RuleFor(x => x.DateSale).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Value).GreaterThan(0);
            RuleFor(x => x.Tax).GreaterThanOrEqualTo(0);
        }
    }
}
