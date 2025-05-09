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
    public class ExcavationSiteManager : IExcavationSiteService
    {
        private readonly IExcavationSiteDal _excavationSiteDal;

        public ExcavationSiteManager(IExcavationSiteDal excavationSiteDal)
        {
            _excavationSiteDal = excavationSiteDal;
        }
        public async Task TAddAsync(ExcavationSite entity)
        {
            await _excavationSiteDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<ExcavationSite, bool>> expression)
        {
            return await _excavationSiteDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {

            await _excavationSiteDal.DeleteAsync(id);
            await _excavationSiteDal.SaveChangesAsync();
        }
        public async Task<List<ExcavationSite>> TGetAll()
        {
            return await _excavationSiteDal.GetAll();
        }
        public async Task<List<ExcavationSite>> TGetAll(Expression<Func<ExcavationSite, bool>> filter)
        {
            return await _excavationSiteDal.GetAll(filter);
        }
        public async Task<ExcavationSite> TGetById(int id)
        {
            return await _excavationSiteDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _excavationSiteDal.SaveChangesAsync();
        }
        public void TUpdate(ExcavationSite entity)
        {
            _excavationSiteDal.Update(entity);
        }
    }
}
