using FluentValidation;
using FluentValidation.AspNetCore;
using MongoDB.Driver;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Million.Properties.Api.Application.Interfaces;
using Million.Properties.Api.Application.Services;
using Million.Properties.Api.Config;
using Million.Properties.Api.Infrastructure.FileStorage;
using Million.Properties.Api.Infrastructure.Persistence;
using Million.Properties.Api.Infrastructure.Persistence.Repositories;
using Million.Properties.Api.Mappings;
using Million.Properties.Api.Validators;
using Million.Properties.Api.Infrastructure.Persistence.Seed;
using Million.Properties.Api.Swagger;
using Serilog;
using System.Text;
using DotNetEnv;

Env.Load(); // cargar variables del archivo .env

var builder = WebApplication.CreateBuilder(args);

// Logging
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .WriteTo.Console()
    .CreateLogger();

builder.Host.UseSerilog();

// Config
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
            builder.Services.Configure<MongoSettings>(options =>
            {
                options.ConnectionString = Environment.GetEnvironmentVariable("MONGO_URI") ?? builder.Configuration.GetConnectionString("MongoDb") ?? "mongodb://localhost:27017";
                options.DatabaseName = builder.Configuration.GetSection("MongoSettings:DatabaseName").Get<string>() ?? "MillionDb";
            });

// Mongo
builder.Services.AddSingleton<MongoDbContext>();

// Repos
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IPropertyTraceRepository, PropertyTraceRepository>();
builder.Services.AddScoped<IPropertyImageRepository, PropertyImageRepository>();
builder.Services.AddScoped<IOwnerRepository, OwnerRepository>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IPropertyTraceService, PropertyTraceService>();
builder.Services.AddScoped<IPropertyImageService, PropertyImageService>();
builder.Services.AddScoped<IOwnerService, OwnerService>();
builder.Services.AddSingleton<IGridFsService, GridFsService>();

// Automapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

// Validators
builder.Services.AddControllers();
builder.Services.AddValidatorsFromAssemblyContaining<CreatePropertyDtoValidator>();

// Auth JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
if (jwtSettings == null)
    throw new InvalidOperationException("JwtSettings configuration is missing.");
var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Million.Properties.Api",
        Version = "v1",
        Description = "API REST para gestión de propiedades, propietarios e historial de ventas."
    });

    // Soporte para subida de archivos con [FromForm] e IFormFile
    c.OperationFilter<FileUploadOperationFilter>();

    // Soporte JWT para probar endpoints protegidos
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Introduce tu token JWT aquí. Ejemplo: Bearer {token}"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Million.Properties.Api v1");
        c.RoutePrefix = "swagger";
    });
}

// Test de conexión a MongoDB
var mongoConn = Environment.GetEnvironmentVariable("MONGO_URI");
Console.WriteLine($"🔗 MongoDB URI detectado: {mongoConn}");

try
{
    var client = new MongoDB.Driver.MongoClient(mongoConn);
    using var cursor = await client.ListDatabaseNamesAsync();
    var dbNames = cursor.ToList();
    Console.WriteLine($"✅ Conectado a MongoDB Atlas. Bases de datos disponibles: {string.Join(", ", dbNames)}");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Error al conectar a MongoDB: {ex.Message}");
}



// Seeder
using (var scope = app.Services.CreateScope())
{
    var seeder = new DataSeeder(scope.ServiceProvider.GetRequiredService<MongoDbContext>());
    await seeder.SeedAsync();
}

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
