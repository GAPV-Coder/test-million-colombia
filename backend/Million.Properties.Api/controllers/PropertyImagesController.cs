using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Million.Properties.Api.Application.Interfaces;

namespace Million.Properties.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyImagesController : ControllerBase
    {
        private readonly IPropertyImageService _imageService;

        public PropertyImagesController(IPropertyImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("{propertyId}")]
        [Authorize(Roles = "Owner")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage(string propertyId, IFormFile file, CancellationToken ct)
        {
            if (file == null || file.Length == 0)
            return BadRequest("Debe subir un archivo válido.");

            var result = await _imageService.UploadAsync(propertyId, file, ct);
            return CreatedAtAction(nameof(UploadImage), new { id = result.IdPropertyImage }, result);
        }
    }
}
