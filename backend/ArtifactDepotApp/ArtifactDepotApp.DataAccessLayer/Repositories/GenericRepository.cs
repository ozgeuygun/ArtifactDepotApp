using ArtifactDepotApp.DataAccessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.DataAccessLayer.Repositories
{
    public class GenericRepository<T> : IGenericDal<T> where T : class
    {
        private readonly ArtifactContext _artifactContext;

        public GenericRepository(ArtifactContext artifactContext)
        {
            _artifactContext = artifactContext;
        }
        public async Task AddAsync(T entity)
        {
            await _artifactContext.Set<T>().AddAsync(entity);
       
        }
        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return await _artifactContext.Set<T>().AnyAsync(expression);
        }
        public async Task DeleteAsync(int id)
        {
            var entity =await _artifactContext.Set<T>().FindAsync(id);
            _artifactContext.Set<T>().Remove(entity);
     
        }
        public async Task<List<T>> GetAll()
        {
            return await _artifactContext.Set<T>().ToListAsync();
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> filter)
        {
            return await _artifactContext.Set<T>().Where(filter).ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await _artifactContext.Set<T>().FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _artifactContext.SaveChangesAsync();
        }
        public void Update(T entity)
        {
            _artifactContext.Set<T>().Update(entity);
        }
    }
}
