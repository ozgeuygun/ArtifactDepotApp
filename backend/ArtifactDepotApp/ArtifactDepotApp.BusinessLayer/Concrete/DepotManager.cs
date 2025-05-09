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
    public class DepotManager : IDepotService
    {
        private readonly IDepotDal _depotDal;

        public DepotManager(IDepotDal depotDal)
        {
            _depotDal = depotDal;
        }
        public async Task TAddAsync(Depot entity)
        {
            await _depotDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<Depot, bool>> expression)
        {
            return await _depotDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {
            await _depotDal.DeleteAsync(id);
            await _depotDal.SaveChangesAsync();
        }
        public async Task<List<Depot>> TGetAll()
        {
            return await _depotDal.GetAll();
        }
        public async Task<List<Depot>> TGetAll(Expression<Func<Depot, bool>> filter)
        {
            return await _depotDal.GetAll(filter);
        }
        public async Task<Depot> TGetById(int id)
        {
            return await _depotDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _depotDal.SaveChangesAsync();
        }
        public void TUpdate(Depot entity)
        {
            _depotDal.Update(entity);
        }
    }
}
