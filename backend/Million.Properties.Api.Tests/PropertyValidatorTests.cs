using NUnit.Framework;
using FluentValidation.TestHelper;
using Million.Properties.Api.Validators;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Tests.Validators
{
    [TestFixture]
    public class CreatePropertyDtoValidatorTests
    {
        private CreatePropertyDtoValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new CreatePropertyDtoValidator();
        }

        [Test]
        public void Should_HaveError_When_NameIsEmpty()
        {
            // Arrange
            var model = new CreatePropertyDto { Name = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }

        [Test]
        public void Should_HaveError_When_NameExceedsMaxLength()
        {
            // Arrange
            var model = new CreatePropertyDto { Name = new string('a', 201) };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }

        [Test]
        public void Should_HaveError_When_AddressIsEmpty()
        {
            // Arrange
            var model = new CreatePropertyDto { Address = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Address);
        }

        [Test]
        public void Should_HaveError_When_PriceIsZero()
        {
            // Arrange
            var model = new CreatePropertyDto { Price = 0 };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Price);
        }

        [Test]
        public void Should_HaveError_When_PriceIsNegative()
        {
            // Arrange
            var model = new CreatePropertyDto { Price = -100 };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Price);
        }

        [Test]
        public void Should_HaveError_When_CodeInternalIsEmpty()
        {
            // Arrange
            var model = new CreatePropertyDto { CodeInternal = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.CodeInternal);
        }

        [Test]
        public void Should_HaveError_When_YearIsTooOld()
        {
            // Arrange
            var model = new CreatePropertyDto { Year = 1799 };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Year);
        }

        [Test]
        public void Should_HaveError_When_YearIsInFuture()
        {
            // Arrange
            var model = new CreatePropertyDto { Year = DateTime.UtcNow.Year + 2 };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Year);
        }

        [Test]
        public void Should_HaveError_When_DescriptionIsEmpty()
        {
            // Arrange
            var model = new CreatePropertyDto { Description = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Description);
        }

        [Test]
        public void Should_HaveError_When_IdOwnerIsEmpty()
        {
            // Arrange
            var model = new CreatePropertyDto { IdOwner = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.IdOwner);
        }

        [Test]
        public void Should_NotHaveError_When_AllFieldsAreValid()
        {
            // Arrange
            var model = new CreatePropertyDto
            {
                Name = "Casa Test",
                Address = "Calle 123",
                Price = 100000000,
                CodeInternal = "PROP-001",
                Year = 2020,
                Description = "Descripción válida",
                IdOwner = "owner123"
            };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldNotHaveAnyValidationErrors();
        }
    }

    [TestFixture]
    public class UpdatePropertyDtoValidatorTests
    {
        private UpdatePropertyDtoValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new UpdatePropertyDtoValidator();
        }

        [Test]
        public void Should_HaveError_When_NameIsEmpty()
        {
            // Arrange
            var model = new UpdatePropertyDto { Name = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }

        [Test]
        public void Should_NotHaveError_When_NameIsNull()
        {
            // Arrange
            var model = new UpdatePropertyDto { Name = null };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldNotHaveValidationErrorFor(x => x.Name);
        }

        [Test]
        public void Should_HaveError_When_PriceIsZero()
        {
            // Arrange
            var model = new UpdatePropertyDto { Price = 0 };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Price);
        }

        [Test]
        public void Should_NotHaveError_When_AllFieldsAreNull()
        {
            // Arrange
            var model = new UpdatePropertyDto();

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldNotHaveAnyValidationErrors();
        }
    }

    [TestFixture]
    public class LoginDtoValidatorTests
    {
        private LoginDtoValidator _validator;

        [SetUp]
        public void Setup()
        {
            _validator = new LoginDtoValidator();
        }

        [Test]
        public void Should_HaveError_When_EmailIsEmpty()
        {
            // Arrange
            var model = new LoginDto { Email = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Email);
        }

        [Test]
        public void Should_HaveError_When_EmailIsInvalid()
        {
            // Arrange
            var model = new LoginDto { Email = "invalid-email" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Email);
        }

        [Test]
        public void Should_HaveError_When_PasswordIsEmpty()
        {
            // Arrange
            var model = new LoginDto { Password = "" };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Password);
        }

        [Test]
        public void Should_NotHaveError_When_AllFieldsAreValid()
        {
            // Arrange
            var model = new LoginDto
            {
                Email = "test@example.com",
                Password = "password123"
            };

            // Act
            var result = _validator.TestValidate(model);

            // Assert
            result.ShouldNotHaveAnyValidationErrors();
        }
    }
}