using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;
using System.Security.Claims;

namespace Million.Properties.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        // Público: lista con filtros
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] string? name, [FromQuery] string? address,
            [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice,
            [FromQuery] int page = 1, [FromQuery] int pageSize = 20, CancellationToken ct = default)
        {
            var result = await _propertyService.GetAllAsync(name, address, minPrice, maxPrice, page, pageSize, ct);
            return Ok(result);
        }

        // Público: detalle
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(string id, CancellationToken ct)
        {
            var property = await _propertyService.GetByIdAsync(id, ct);
            return property != null ? Ok(property) : NotFound();
        }

        // Protegido: crear
        [Authorize(Roles = "Owner")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePropertyDto dto, CancellationToken ct)
        {
            var result = await _propertyService.CreateAsync(dto, ct);
            return CreatedAtAction(nameof(GetById), new { id = result.IdProperty }, result);
        }

        // Protegido: actualizar
        [Authorize(Roles = "Owner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdatePropertyDto dto, CancellationToken ct)
        {
            var ownerId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "";
            await _propertyService.UpdateAsync(id, dto, ownerId, ct);
            return NoContent();
        }

        // Protegido: eliminar
        [Authorize(Roles = "Owner")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, CancellationToken ct)
        {
            var ownerId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "";
            await _propertyService.DeleteAsync(id, ownerId, ct);
            return NoContent();
        }
        
        // Público: obtener todas las propiedades sin filtros
        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllWithoutFilters([FromQuery] int page = 1, [FromQuery] int pageSize = 100, CancellationToken ct = default)
        {
            var result = await _propertyService.GetAllWithoutFiltersAsync(page, pageSize, ct);
            return Ok(result);
        }

    }
}
