using ArtifactDepotApp.API.Dto;
using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtifactDepotApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepotDetailController : ControllerBase
    {
        private readonly IDepotDetailService _depotDetailService;

        public DepotDetailController(IDepotDetailService depotDetailService)
        {
            _depotDetailService = depotDetailService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllDepotDetail()
        {
            var depot = await _depotDetailService.TGetAll();
            return Ok(depot);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetDepotDetailById([FromRoute] int id)
        {
            var depotDetail = await _depotDetailService.TGetById(id);
            return Ok(depotDetail);
        }

        [HttpPost]
        public async Task<ActionResult> AddDepotDetail([FromBody] DepotDetailDto model)
        {

            var detail = new DepotDetail()
            {
                ArtifactId = model.ArtifactId,
                DepotId = model.DepotId,
                Shelf = model.Shelf,
                Condition = model.Condition,
                Status=model.Status,
            };
            await _depotDetailService.TAddAsync(detail);
            await _depotDetailService.TSaveChangesAsync();
            return Ok(model);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDepotDetail([FromRoute] int id, [FromBody] DepotDetailDto model)
        {
            var depotDetail = await _depotDetailService.TGetById(id);
            depotDetail.Shelf = model.Shelf;
            depotDetail.Condition = model.Condition;
            depotDetail.Status = model.Status;
            depotDetail.DepotId = model.DepotId;
            depotDetail.ArtifactId = model.ArtifactId;
            _depotDetailService.TUpdate(depotDetail);
            await _depotDetailService.TSaveChangesAsync();
            return Ok(model);      
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepotDetail([FromRoute] int id)
        {
            await _depotDetailService.TDeleteAsync(id);
            return Ok();
        }
    }
}
