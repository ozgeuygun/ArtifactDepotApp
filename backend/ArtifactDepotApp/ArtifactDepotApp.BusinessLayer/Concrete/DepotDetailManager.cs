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
    public class DepotDetailManager : IDepotDetailService
    {
        private readonly IDepotDetailDal _depotDetailDal;

        public DepotDetailManager(IDepotDetailDal depotDetailDal)
        {
            _depotDetailDal = depotDetailDal;
        }
        public async Task TAddAsync(DepotDetail entity)
        {
            await _depotDetailDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<DepotDetail, bool>> expression)
        {
            return await _depotDetailDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {
            await _depotDetailDal.DeleteAsync(id);
            await _depotDetailDal.SaveChangesAsync();
        }
        public async Task<List<DepotDetail>> TGetAll()
        {
            return await _depotDetailDal.GetAll();
        }
        public async Task<List<DepotDetail>> TGetAll(Expression<Func<DepotDetail, bool>> filter)
        {
            return await _depotDetailDal.GetAll(filter);
        }
        public async Task<DepotDetail> TGetById(int id)
        {
            return await _depotDetailDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _depotDetailDal.SaveChangesAsync();
        }
        public void TUpdate(DepotDetail entity)
        {
            _depotDetailDal.Update(entity);
        }
    }
}
