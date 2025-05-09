using ArtifactDepotApp.BusinessLayer.Abstract;
using ArtifactDepotApp.BusinessLayer.Caching;
using ArtifactDepotApp.BusinessLayer.Concrete;
using ArtifactDepotApp.BusinessLayer.Validation;
using ArtifactDepotApp.DataAccessLayer.Abstract;
using ArtifactDepotApp.DataAccessLayer.Context;
using ArtifactDepotApp.DataAccessLayer.EntityFramework;
using ArtifactDepotApp.EntityLayer.Concrete;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ArtifactContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis"); // appsettings.json'dan alacaðýz
    options.InstanceName = "YourAppInstance"; 
});

builder.Services.AddScoped<ICacheService, RedisCacheService>();

builder.Services.AddDbContext<ArtifactContext>();

builder.Services.AddScoped<IExcavationSiteDal, EfExcavationSiteDal>();
builder.Services.AddScoped<IExcavationSiteService, ExcavationSiteManager>();

builder.Services.AddScoped<IArtifactDal, EfArtifactDal>();
builder.Services.AddScoped<IArtifactService, ArtifactManager>();

builder.Services.AddScoped<IArtifactMaterialDal, EfArtifactMaterialDal>();
builder.Services.AddScoped<IArtifactMaterialService, ArtifactMaterialManager>();

builder.Services.AddScoped<IArtifactCategoryDal, EfArtifactCategoryDal>();
builder.Services.AddScoped<IArtifactCategoryService, ArtifactCategoryManager>();

builder.Services.AddScoped<IDepotDal, EfDepotDal>();
builder.Services.AddScoped<IDepotService, DepotManager>();

builder.Services.AddScoped<IDepotDetailDal, EfDepotDetailDal>();
builder.Services.AddScoped<IDepotDetailService, DepotDetailManager>();

builder.Services.AddScoped<IUserDal, EfUserDal>();
builder.Services.AddScoped<IUserService, UserManager>();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IValidator<User>, UserValidator>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicyAdd", builder =>
    builder.WithOrigins("http://localhost:4200", "http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

});

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKeyThatIs256BitsLong")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseCors("MyPolicyAdd");
app.Run();
