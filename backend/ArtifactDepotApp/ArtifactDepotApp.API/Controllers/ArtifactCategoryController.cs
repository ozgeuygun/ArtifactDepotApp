using ArtifactDepotApp.API.Dto;
using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArtifactDepotApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtifactCategoryController : ControllerBase
    {
        private readonly IArtifactCategoryService _artifactCategoryService;

        public ArtifactCategoryController(IArtifactCategoryService artifactCategoryService)
        {
            _artifactCategoryService = artifactCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCategories()
        {
            var obj = await _artifactCategoryService.TGetAll();
            return Ok(obj);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCategoryById([FromRoute] int id)
        {
            var obj = await _artifactCategoryService.TGetById(id);
            return Ok(obj);
        }

        [HttpPost]
        public async Task<ActionResult> AddCategory([FromBody] ArtifactCategoryDto  model)
        {
            var category = new ArtifactCategory()
            {
                CategoryName = model.CategoryName,              

            };
            await _artifactCategoryService.TAddAsync(category);
            await _artifactCategoryService.TSaveChangesAsync();
            return Ok(model);          
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory([FromRoute] int id, [FromBody] ArtifactCategoryDto model)
        {       
            var category = await _artifactCategoryService.TGetById(id);
            category.CategoryName = model.CategoryName;
            _artifactCategoryService.TUpdate(category);
            await _artifactCategoryService.TSaveChangesAsync();
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory([FromRoute] int id)
        {
            await _artifactCategoryService.TDeleteAsync(id);
            return Ok();
        }
    }
}
