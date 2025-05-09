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
    public class ExcavationSiteController : ControllerBase
    {
        private readonly IExcavationSiteService _excavationSiteService;

        public ExcavationSiteController(IExcavationSiteService excavationSiteService)
        {
            _excavationSiteService = excavationSiteService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllSites()
        {
            var sites = await _excavationSiteService.TGetAll();
            return Ok(sites);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSiteById([FromRoute] int id)
        {
            var site = await _excavationSiteService.TGetById(id);
            return Ok(site);
        }

        [HttpPost]
        public async Task<ActionResult> AddSite([FromBody] ExcavationSiteDto model)
        {
            var site = new ExcavationSite()
            {

                SiteName = model.SiteName,
                SiteLatitude=model.SiteLatitude,
                SiteLongitude=model.SiteLongitude,
            };   
            await _excavationSiteService.TAddAsync(site);
            await _excavationSiteService.TSaveChangesAsync();
            return Ok(model);
        }
     
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateSite([FromRoute] int id, [FromBody] ExcavationSiteDto model)
        {
            var excavationSite = await _excavationSiteService.TGetById(id);
            excavationSite.SiteName = model.SiteName;
            excavationSite.SiteLatitude = model.SiteLatitude;
            excavationSite.SiteLongitude = model.SiteLongitude;
            _excavationSiteService.TUpdate(excavationSite);
            await _excavationSiteService.TSaveChangesAsync();
            return Ok(model);
        }
   
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSite([FromRoute] int id)
        {
            await _excavationSiteService.TDeleteAsync(id);
            return Ok();
        }
    }
}
