using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.BusinessLayer.Abstract
{
    public interface IGenericService<T> where T :class
    {
        Task<List<T>> TGetAll();
        Task<List<T>> TGetAll(Expression<Func<T, bool>> filter);
        Task<T> TGetById(int id);
        Task TAddAsync(T entity);
        void TUpdate(T entity);
        Task TDeleteAsync(int id);
        Task TSaveChangesAsync();
        Task<bool> TAnyAsync(Expression<Func<T, bool>> expression);
    }
}
