using ArtifactDepotApp.API.Dto;
using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.BusinessLayer.Caching;
using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtifactDepotApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtifactController : ControllerBase
    {
        private readonly IArtifactService _artifactService;
        private readonly ICacheService _cacheService;
        public ArtifactController(IArtifactService artifactService, ICacheService cacheService)
        {
            _artifactService = artifactService;
            _cacheService = cacheService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllArtifact()
        {
            var artifacts = await _artifactService.TGetAll();
            return Ok(artifacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetArtifactById([FromRoute] int id)
        {
            var art = await _artifactService.TGetById(id);
            return Ok(art);
        }

        [HttpPost]
        public async Task<ActionResult> AddArtifact([FromBody] ArtifactDto model)
        {
            var artifact = new Artifact()
            {                  
                ArtifactMaterialId = model.ArtifactMaterialId,
                ArtifactCategoryId = model.ArtifactCategoryId,
                ExcavationSiteId = model.ExcavationSiteId,
                ArtifactName = model.ArtifactName,
                Width = model.Width,
                Height = model.Height,
                ArtifactLatitude = model.ArtifactLatitude,
                ArtifactLongitude = model.ArtifactLongitude,
                IsDeleted = model.IsDeleted,
            };
            await _artifactService.TAddAsync(artifact);
            await _artifactService.TSaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateArtifact([FromRoute] int id, [FromBody] ArtifactDto model)
        {
            var artifact = await _artifactService.TGetById(id);
            artifact.ArtifactName = model.ArtifactName;
            artifact.Width = model.Width;
            artifact.Height = model.Height;
            artifact.ArtifactLatitude = model.ArtifactLatitude;
            artifact.ArtifactLongitude = model.ArtifactLongitude;
            artifact.IsDeleted = model.IsDeleted;
            artifact.ArtifactCategoryId = model.ArtifactCategoryId;
            artifact.ArtifactMaterialId = model.ArtifactMaterialId;
            artifact.ExcavationSiteId = model.ExcavationSiteId;
            _artifactService.TUpdate(artifact);
            await _artifactService.TSaveChangesAsync();
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArtifact([FromRoute] int id)
        {
            await _artifactService.TDeleteAsync(id);
            return Ok();
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet("active")]
        public async Task<ActionResult<List<Artifact>>> GetActiveArtifacts()
        {
            const string cacheKey = "activeArtifacts";

            var cachedData = await _cacheService.GetDataAsync<List<Artifact>>(cacheKey);
            if (cachedData != null)
            {
                return Ok(cachedData);
            }

            var artifacts = await _artifactService.TGetActiveArtifactsAsync();
            if (artifacts == null || artifacts.Count == 0)
            {
                return NotFound("No active artifacts found.");
            }

            await _cacheService.SetDataAsync(cacheKey, artifacts, TimeSpan.FromMinutes(10));
            return Ok(artifacts);
        }

    }
}
