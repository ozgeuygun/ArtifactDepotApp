using ArtifactDepotApp.API.Dto;
using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArtifactDepotApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepotController : ControllerBase
    {
        private readonly IDepotService _depotService;

        public DepotController(IDepotService depotService)
        {
            _depotService = depotService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllDepot()
        {
            var depot = await _depotService.TGetAll();
            return Ok(depot);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetDepotById([FromRoute] int id)
        {
            var depot = await _depotService.TGetById(id);
            return Ok(depot);
        }

        [HttpPost]
        public async Task<ActionResult> AddDepot([FromBody] DepotDto model)
        {
            var depot = new Depot()
            {
                DepotName = model.DepotName,
                DepotLatitude=model.DepotLatitude,
                DepotLongitude=model.DepotLongitude,
                IsActive=model.IsActive,                
            };
            await _depotService.TAddAsync(depot);
            await _depotService.TSaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDepot([FromRoute] int id, [FromBody] DepotDto model)
        {
            var depot = await _depotService.TGetById(id);
            depot.DepotName = model.DepotName;
            depot.DepotLatitude = model.DepotLatitude;
            depot.DepotLongitude = model.DepotLongitude;
            depot.IsActive = model.IsActive;

            _depotService.TUpdate(depot);
            await _depotService.TSaveChangesAsync();
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepot([FromRoute] int id)
        {
            await _depotService.TDeleteAsync(id);
            return Ok();
        }

    
    }
}
