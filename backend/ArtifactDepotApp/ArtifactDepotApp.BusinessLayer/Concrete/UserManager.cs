using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.EntityFramework;
using ArtifactDepotApp.EntityLayer.Concrete;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.BusinessLayer.Concrete
{
    public class UserManager : IUserService
    {
        private readonly IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }
        public async Task<bool> IsEmailTakenAsync(string email)
        {
            return await _userDal.AnyAsync(x => x.Email == email);
        }
        public async Task<bool> IsUsernameTakenAsync(string username)
        {
            return await _userDal.AnyAsync(x => x.Username == username);
        }
        public async Task TAddAsync(User entity)
        {
            await _userDal.AddAsync(entity);
        }
        public async Task<bool> TAnyAsync(Expression<Func<User, bool>> expression)
        {
            return await _userDal.AnyAsync(expression);
        }
        public async Task TDeleteAsync(int id)
        {
            await _userDal.DeleteAsync(id);
            await _userDal.SaveChangesAsync();
        }
        public async Task<List<User>> TGetAll()
        {
            return await _userDal.GetAll();
        }
        public async Task<List<User>> TGetAll(Expression<Func<User, bool>> filter)
        {
            return await _userDal.GetAll(filter);
        }
        public async Task<User> TGetById(int id)
        {
            return await _userDal.GetById(id);
        }
        public async Task TSaveChangesAsync()
        {
            await _userDal.SaveChangesAsync();
        }
        public void TUpdate(User entity)
        {
            _userDal.Update(entity);
        }
    }
}
