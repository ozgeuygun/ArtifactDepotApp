using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.Abstract;
using ArtifactDepotApp.EntityLayer.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.BusinessLayer.Concrete
{
    public class ArtifactManager : IArtifactService
    {
        private readonly IArtifactDal _artifactDal;

        public ArtifactManager(IArtifactDal artifactDal)
        {
            _artifactDal = artifactDal;
        }
        public async Task TAddAsync(Artifact entity)
        {
            await _artifactDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<Artifact, bool>> expression)
        {
            return await _artifactDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {
            await _artifactDal.DeleteAsync(id);
            await _artifactDal.SaveChangesAsync();
        }
        public async Task<List<Artifact>> TGetActiveArtifactsAsync()
        {
            return await _artifactDal.GetAll(x => x.IsDeleted == true);
        }
        public async Task<List<Artifact>> TGetAll()
        {
            return await _artifactDal.GetAll();
        }
        public async Task<List<Artifact>> TGetAll(Expression<Func<Artifact, bool>> filter)
        {
            return await _artifactDal.GetAll(filter);
        }
        public async Task<Artifact> TGetById(int id)
        {
            return await _artifactDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _artifactDal.SaveChangesAsync();
        }
        public void TUpdate(Artifact entity)
        {
            _artifactDal.Update(entity);
        }
    }
}
