using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Million.Properties.Api.Controllers;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Application.DTOs;

namespace Million.Properties.Api.Tests.Controllers
{
    [TestFixture]
    public class PropertiesControllerTests
    {
        private Mock<IPropertyService> _mockPropertyService;
        private PropertiesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockPropertyService = new Mock<IPropertyService>();
            _controller = new PropertiesController(_mockPropertyService.Object);
        }

        [Test]
        public async Task GetAll_WithFilters_ReturnsOkResult()
        {
            // Arrange
            var pagedResponse = new PagedResponseDto<PropertyDto>
            {
                Items = new List<PropertyDto>(),
                Total = 0,
                Page = 1,
                PageSize = 20
            };

            _mockPropertyService.Setup(service => service.GetAllAsync(
                null, null, null, null, 1, 20, default))
                .ReturnsAsync(pagedResponse);

            // Act
            var result = await _controller.GetAll(null, null, null, null, 1, 20);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(pagedResponse));
        }

        [Test]
        public async Task GetById_WithValidId_ReturnsOkResult()
        {
            // Arrange
            var property = new PropertyDto { IdProperty = "1", Name = "Casa Test" };
            _mockPropertyService.Setup(service => service.GetByIdAsync("1", default))
                .ReturnsAsync(property);

            // Act
            var result = await _controller.GetById("1", default);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(property));
        }

        [Test]
        public async Task GetById_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            _mockPropertyService.Setup(service => service.GetByIdAsync("999", default))
                .ReturnsAsync((PropertyDto?)null);

            // Act
            var result = await _controller.GetById("999", default);

            // Assert
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async Task Create_WithValidData_ReturnsCreatedResult()
        {
            // Arrange
            var createDto = new CreatePropertyDto { Name = "Nueva Casa" };
            var createdProperty = new PropertyDto { IdProperty = "1", Name = "Nueva Casa" };

            _mockPropertyService.Setup(service => service.CreateAsync(createDto, default))
                .ReturnsAsync(createdProperty);

            // Setup user claims
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "user1"),
                new Claim(ClaimTypes.Role, "Owner")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            // Act
            var result = await _controller.Create(createDto, default);

            // Assert
            Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
            var createdResult = result as CreatedAtActionResult;
            Assert.That(createdResult.ActionName, Is.EqualTo(nameof(PropertiesController.GetById)));
            Assert.That(createdResult.RouteValues["id"], Is.EqualTo("1"));
            Assert.That(createdResult.Value, Is.EqualTo(createdProperty));
        }

        [Test]
        public async Task Update_WithValidData_ReturnsNoContent()
        {
            // Arrange
            var updateDto = new UpdatePropertyDto { Name = "Nombre Actualizado" };

            // Setup user claims
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "owner1"),
                new Claim(ClaimTypes.Role, "Owner")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            _mockPropertyService.Setup(service => service.UpdateAsync(
                "1", updateDto, "owner1", default))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Update("1", updateDto, default);

            // Assert
            Assert.That(result, Is.InstanceOf<NoContentResult>());
        }

        [Test]
        public async Task Delete_WithValidData_ReturnsNoContent()
        {
            // Arrange
            // Setup user claims
            var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "owner1"),
                new Claim(ClaimTypes.Role, "Owner")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };

            _mockPropertyService.Setup(service => service.DeleteAsync(
                "1", "owner1", default))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.Delete("1", default);

            // Assert
            Assert.That(result, Is.InstanceOf<NoContentResult>());
        }

        [Test]
        public async Task GetAllWithoutFilters_ReturnsOkResult()
        {
            // Arrange
            var pagedResponse = new PagedResponseDto<PropertyDto>
            {
                Items = new List<PropertyDto>(),
                Total = 0,
                Page = 1,
                PageSize = 100
            };

            _mockPropertyService.Setup(service => service.GetAllWithoutFiltersAsync(1, 100, default))
                .ReturnsAsync(pagedResponse);

            // Act
            var result = await _controller.GetAllWithoutFilters(1, 100);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            var okResult = result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(pagedResponse));
        }
    }
}