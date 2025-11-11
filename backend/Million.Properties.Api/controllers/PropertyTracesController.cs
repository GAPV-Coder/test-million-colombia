using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Million.Properties.Api.Application.DTOs;
using Million.Properties.Api.Application.Interfaces;

namespace Million.Properties.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyTracesController : ControllerBase
    {
        private readonly IPropertyTraceService _traceService;

        public PropertyTracesController(IPropertyTraceService traceService)
        {
            _traceService = traceService;
        }

        /// <summary>
        /// Obtiene el historial de ventas de una propiedad específica
        /// </summary>
        /// <param name="propertyId">ID de la propiedad</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Lista de transacciones</returns>
        [HttpGet("{propertyId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByPropertyId(string propertyId, CancellationToken ct)
        {
            var traces = await _traceService.GetByPropertyIdAsync(propertyId, ct);
            return Ok(traces);
        }

        /// <summary>
        /// Crea una nueva transacción de venta
        /// </summary>
        /// <param name="dto">Datos de la transacción</param>
        /// <param name="ct">Cancellation token</param>
        /// <returns>Transacción creada</returns>
        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> Create([FromBody] CreatePropertyTraceDto dto, CancellationToken ct)
        {
            var result = await _traceService.CreateAsync(dto, ct);
            return CreatedAtAction(nameof(GetByPropertyId), new { propertyId = result.IdProperty }, result);
        }
    }
}