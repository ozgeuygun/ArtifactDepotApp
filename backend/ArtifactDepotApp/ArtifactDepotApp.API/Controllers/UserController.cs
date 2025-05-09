using ArtifactDepotApp.API.Dto;
using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.EntityLayer.Concrete;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ArtifactDepotApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IValidator<User> _validator;

        public UserController(IUserService userService, IValidator<User> validator)
        {
            _userService = userService;
            _validator = validator;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User user)
        {

            if (user == null)
                return BadRequest();

            var u = (await _userService.TGetAll(x => x.Username == user.Username)).FirstOrDefault();

            if (u == null)
                return NotFound(new { Message = "User Not Found!" });

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(u, u.Password, user.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return BadRequest(new { Message = "Invalid Password!" });
            }
             u.Token = CreateJwt(u);
            var newAccessToken = u.Token;
            var newRefreshToken =await  CreateRefreshToken();
            u.RefreshToken = newRefreshToken;
            u.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
            await _userService.TSaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }
      
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            if (user == null)
                return BadRequest();
            var validationResult = await _validator.ValidateAsync(user);

            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors.Select(x => x.ErrorMessage));
            }

            if (await _userService.IsUsernameTakenAsync(user.Username))
                return BadRequest(new { Message = "Kullanıcı adı zaten mevcut." });

            if (await _userService.IsEmailTakenAsync(user.Email))
                return BadRequest(new { Message = "E-posta zaten mevcut." });
           
            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, user.Password);           
            user.Role = "User";
            user.Token = "";
            await _userService.TAddAsync(user);
            await _userService.TSaveChangesAsync();
            return Ok(new
            {
                Message = "register success"
            });
        }
             
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult> GetAllUser()
        {
            var user = await _userService.TGetAll();
            return Ok(user);
        }
        private string CreateJwt(User userJwt)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("YourSuperSecretKeyThatIs256BitsLong");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, userJwt.Role),           
               new Claim(ClaimTypes.Name,$"{userJwt.Username}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private async Task<string> CreateRefreshToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var refreshToken = Convert.ToBase64String(tokenBytes);

            var tokenInUser = await  _userService.TAnyAsync(a => a.RefreshToken == refreshToken);
            if (tokenInUser)
            {
                return await  CreateRefreshToken();
            }
            return refreshToken;
        }

        private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("YourSuperSecretKeyThatIs256BitsLong");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("This is Invalid Token");
            return principal;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Invalid Vlient Request");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipleFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = (await _userService.TGetAll(x => x.Username == username)).FirstOrDefault();
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid Request");
            var newAccessToken = CreateJwt(user);
            var newRefreshToken = await CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            await _userService.TSaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
            });
        }
    }
}



    


