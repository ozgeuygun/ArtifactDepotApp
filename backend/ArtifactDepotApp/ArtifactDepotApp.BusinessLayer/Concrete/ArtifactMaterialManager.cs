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
    public class ArtifactMaterialManager : IArtifactMaterialService
    {
        private readonly IArtifactMaterialDal _artifactMaterialDal;

        public ArtifactMaterialManager(IArtifactMaterialDal artifactMaterialDal)
        {
            _artifactMaterialDal = artifactMaterialDal;
        }
        public async Task TAddAsync(ArtifactMaterial entity)
        {
            await _artifactMaterialDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<ArtifactMaterial, bool>> expression)
        {
            return await _artifactMaterialDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {
            await _artifactMaterialDal.DeleteAsync(id);
            await _artifactMaterialDal.SaveChangesAsync();
        }
        public async Task<List<ArtifactMaterial>> TGetAll()
        {
            return await _artifactMaterialDal.GetAll();
        }
        public async Task<List<ArtifactMaterial>> TGetAll(Expression<Func<ArtifactMaterial, bool>> filter)
        {
            return await _artifactMaterialDal.GetAll(filter);
        }
        public async Task<ArtifactMaterial> TGetById(int id)
        {
            return await _artifactMaterialDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _artifactMaterialDal.SaveChangesAsync();
        }
        public void TUpdate(ArtifactMaterial entity)
        {
            _artifactMaterialDal.Update(entity);
        }
    }
}
