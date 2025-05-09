using ArtifactDepotApp.API.Dto;
using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtifactDepotApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtifactMaterialController : ControllerBase
    {
        private readonly IArtifactMaterialService _artifactMaterialService;

        public ArtifactMaterialController(IArtifactMaterialService artifactMaterialService)
        {
            _artifactMaterialService = artifactMaterialService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllMaterials()
        {
            var materials = await _artifactMaterialService.TGetAll();
            return Ok(materials);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetMaterialById([FromRoute] int id)
        {
            var material = await _artifactMaterialService.TGetById(id);
            return Ok(material);
        }

        [HttpPost]
        public async Task<ActionResult> AddMaterial([FromBody] ArtifactMaterialDto model)
        {
             var material = new ArtifactMaterial()
            {
                ArtifactMaterialName = model.ArtifactMaterialName,
            };
            await _artifactMaterialService.TAddAsync(material);
            await _artifactMaterialService.TSaveChangesAsync();
            return Ok(model);
        }
      
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateMaterial([FromRoute] int id, [FromBody] ArtifactMaterialDto model)
        {
            var material = await _artifactMaterialService.TGetById(id);
            material.ArtifactMaterialName = model.ArtifactMaterialName;
            _artifactMaterialService.TUpdate(material);
            await _artifactMaterialService.TSaveChangesAsync();
            return Ok(model);          
        }
    
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMaterial([FromRoute] int id)
        {
            await _artifactMaterialService.TDeleteAsync(id);         
            return Ok();
        }

    }
}
