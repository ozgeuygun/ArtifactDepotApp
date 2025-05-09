using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.EntityFramework;
using ArtifactDepotApp.EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.BusinessLayer.Concrete
{
    public class ArtifactCategoryManager : IArtifactCategoryService
    {
        private readonly IArtifactCategoryDal _artifactCategoryDal;

        public ArtifactCategoryManager(IArtifactCategoryDal artifactCategoryDal)
        {
            _artifactCategoryDal = artifactCategoryDal;
        }
        public async Task TAddAsync(ArtifactCategory entity)
        {
            await _artifactCategoryDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<ArtifactCategory, bool>> expression)
        {
            return await _artifactCategoryDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {
            await _artifactCategoryDal.DeleteAsync(id);
            await _artifactCategoryDal.SaveChangesAsync();
        }
        public async Task<List<ArtifactCategory>> TGetAll()
        {
            return await _artifactCategoryDal.GetAll();
        }
        public async Task<List<ArtifactCategory>> TGetAll(Expression<Func<ArtifactCategory, bool>> filter)
        {
            return await _artifactCategoryDal.GetAll(filter);
        }
        public async Task<ArtifactCategory> TGetById(int id)
        {
            return await _artifactCategoryDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _artifactCategoryDal.SaveChangesAsync();
        }
        public void TUpdate(ArtifactCategory entity)
        {
            _artifactCategoryDal.Update(entity);
        }
    }
}
