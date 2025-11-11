using NUnit.Framework;
using Moq;
using AutoMapper;
using Million.Properties.Api.Application.Services;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Domain.Entities;
using MongoDB.Driver;

namespace Million.Properties.Api.Tests.Application.Services
{
    [TestFixture]
    public class PropertyServiceTests
    {
        private Mock<IPropertyRepository> _mockPropertyRepo;
        private Mock<IOwnerRepository> _mockOwnerRepo;
        private Mock<IPropertyImageRepository> _mockImageRepo;
        private Mock<IMapper> _mockMapper;
        private PropertyService _propertyService;

        [SetUp]
        public void Setup()
        {
            _mockPropertyRepo = new Mock<IPropertyRepository>();
            _mockOwnerRepo = new Mock<IOwnerRepository>();
            _mockImageRepo = new Mock<IPropertyImageRepository>();
            _mockMapper = new Mock<IMapper>();
            _propertyService = new PropertyService(
                _mockPropertyRepo.Object,
                _mockOwnerRepo.Object,
                _mockImageRepo.Object,
                _mockMapper.Object
            );
        }

        [Test]
        public async Task GetAllAsync_WithFilters_ReturnsPagedProperties()
        {
            // Arrange
            var properties = new List<Property>
            {
                new Property { IdProperty = "1", Name = "Casa Test", Price = 100000000 }
            };
            var propertyDtos = new List<PropertyDto>
            {
                new PropertyDto { IdProperty = "1", Name = "Casa Test", Price = 100000000 }
            };

            _mockPropertyRepo.Setup(repo => repo.GetAllAsync(
                "Test", "Address", 50000000, 200000000, 1, 6, default))
                .ReturnsAsync((properties, 1L));

            _mockMapper.Setup(m => m.Map<List<PropertyDto>>(properties))
                .Returns(propertyDtos);

            _mockImageRepo.Setup(repo => repo.GetByPropertyIdAsync("1", default))
                .ReturnsAsync(new List<PropertyImage>());

            // Act
            var result = await _propertyService.GetAllAsync(
                "Test", "Address", 50000000, 200000000, 1, 6);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Items, Has.Count.EqualTo(1));
            Assert.That(result.Total, Is.EqualTo(1));
        }

        [Test]
        public async Task GetByIdAsync_WithValidId_ReturnsProperty()
        {
            // Arrange
            var property = new Property { IdProperty = "1", Name = "Casa Test" };
            var propertyDto = new PropertyDto { IdProperty = "1", Name = "Casa Test" };

            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("1", default))
                .ReturnsAsync(property);

            _mockMapper.Setup(m => m.Map<PropertyDto>(property))
                .Returns(propertyDto);

            _mockImageRepo.Setup(repo => repo.GetByPropertyIdAsync("1", default))
                .ReturnsAsync(new List<PropertyImage>());

            // Act
            var result = await _propertyService.GetByIdAsync("1");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.IdProperty, Is.EqualTo("1"));
        }

        [Test]
        public async Task GetByIdAsync_WithInvalidId_ReturnsNull()
        {
            // Arrange
            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("999", default))
                .ReturnsAsync((Property?)null);

            // Act
            var result = await _propertyService.GetByIdAsync("999");

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task CreateAsync_WithValidData_CreatesProperty()
        {
            // Arrange
            var createDto = new CreatePropertyDto
            {
                Name = "Nueva Casa",
                Address = "Calle 123",
                Price = 150000000,
                IdOwner = "owner1"
            };
            var owner = new Owner { IdOwner = "owner1" };
            var property = new Property { IdProperty = "1" };
            var propertyDto = new PropertyDto { IdProperty = "1" };

            _mockOwnerRepo.Setup(repo => repo.GetByIdAsync("owner1", default))
                .ReturnsAsync(owner);

            _mockMapper.Setup(m => m.Map<Property>(createDto))
                .Returns(property);

            _mockPropertyRepo.Setup(repo => repo.CreateAsync(property, default))
                .Returns(Task.CompletedTask);

            _mockMapper.Setup(m => m.Map<PropertyDto>(property))
                .Returns(propertyDto);

            _mockImageRepo.Setup(repo => repo.GetByPropertyIdAsync("1", default))
                .ReturnsAsync(new List<PropertyImage>());

            // Act
            var result = await _propertyService.CreateAsync(createDto);

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.IdProperty, Is.EqualTo("1"));
            _mockPropertyRepo.Verify(repo => repo.CreateAsync(property, default), Times.Once);
        }

        [Test]
        public void CreateAsync_WithInvalidOwner_ThrowsException()
        {
            // Arrange
            var createDto = new CreatePropertyDto { IdOwner = "invalid" };

            _mockOwnerRepo.Setup(repo => repo.GetByIdAsync("invalid", default))
                .ReturnsAsync((Owner?)null);

            // Act & Assert
            Assert.ThrowsAsync<InvalidOperationException>(() =>
                _propertyService.CreateAsync(createDto));
        }

        [Test]
        public async Task UpdateAsync_WithValidData_UpdatesProperty()
        {
            // Arrange
            var updateDto = new UpdatePropertyDto { Name = "Nombre Actualizado" };
            var existingProperty = new Property { IdProperty = "1", IdOwner = "owner1" };

            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("1", default))
                .ReturnsAsync(existingProperty);

            _mockPropertyRepo.Setup(repo => repo.UpdateAsync("1", It.IsAny<UpdateDefinition<Property>>(), default))
                .Returns(Task.CompletedTask);

            // Act
            await _propertyService.UpdateAsync("1", updateDto, "owner1");

            // Assert
            _mockPropertyRepo.Verify(repo => repo.UpdateAsync("1", It.IsAny<UpdateDefinition<Property>>(), default), Times.Once);
        }

        [Test]
        public void UpdateAsync_WithNonExistentProperty_ThrowsException()
        {
            // Arrange
            var updateDto = new UpdatePropertyDto { Name = "Nombre Actualizado" };

            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("999", default))
                .ReturnsAsync((Property?)null);

            // Act & Assert
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _propertyService.UpdateAsync("999", updateDto, "owner1"));
        }

        [Test]
        public void UpdateAsync_WithUnauthorizedOwner_ThrowsException()
        {
            // Arrange
            var updateDto = new UpdatePropertyDto { Name = "Nombre Actualizado" };
            var existingProperty = new Property { IdProperty = "1", IdOwner = "owner1" };

            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("1", default))
                .ReturnsAsync(existingProperty);

            // Act & Assert
            Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
                _propertyService.UpdateAsync("1", updateDto, "different_owner"));
        }

        [Test]
        public async Task DeleteAsync_WithValidData_DeletesProperty()
        {
            // Arrange
            var existingProperty = new Property { IdProperty = "1", IdOwner = "owner1" };

            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("1", default))
                .ReturnsAsync(existingProperty);

            _mockPropertyRepo.Setup(repo => repo.DeleteAsync("1", default))
                .Returns(Task.CompletedTask);

            // Act
            await _propertyService.DeleteAsync("1", "owner1");

            // Assert
            _mockPropertyRepo.Verify(repo => repo.DeleteAsync("1", default), Times.Once);
        }

        [Test]
        public void DeleteAsync_WithUnauthorizedOwner_ThrowsException()
        {
            // Arrange
            var existingProperty = new Property { IdProperty = "1", IdOwner = "owner1" };

            _mockPropertyRepo.Setup(repo => repo.GetByIdAsync("1", default))
                .ReturnsAsync(existingProperty);

            // Act & Assert
            Assert.ThrowsAsync<UnauthorizedAccessException>(() =>
                _propertyService.DeleteAsync("1", "different_owner"));
        }
    }
}