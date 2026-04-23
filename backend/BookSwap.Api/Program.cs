using System.Security.Claims;
using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Structure;
using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.User;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

DbSession.ConnectionString = builder.Configuration
    .GetConnectionString("DefaultConnection");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        In = ParameterLocation.Header,
        Description = "Scrie: Bearer {sessionId}"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var db = new BookSwapDbContext(DbSession.GetOptions()))
{
    // Seed admin
    var adminExists = db.Users.Any(u => u.Role == UserRole.Admin);
    if (!adminExists)
    {
        db.Users.Add(new UserEntity
        {
            FirstName    = "Admin",
            LastName     = "Admin",
            Username     = "admin",
            Email        = "admin@test.com",
            Phone        = "",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"),
            Role         = UserRole.Admin,
            CreatedAt    = DateTime.UtcNow,
        });
        db.SaveChanges();
    }

    // Seed date de test
    DbInitializer.Seed(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");

// Auth middleware inline
app.Use(async (context, next) =>
{
    var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
    if (authHeader != null && authHeader.StartsWith("Bearer "))
    {
        var token = authHeader.Substring(7);
        var tokenService = new TokenService();
        var principal = tokenService.ValidateToken(token);

        if (principal != null)
        {
            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(userIdClaim, out var userId))
            {
                using var db = new BookSwapDbContext(DbSession.GetOptions());
                var user = db.Users.Find(userId);
                if (user != null)
                    context.Items["CurrentUser"] = user;
            }
        }
    }

    await next(context);
});

app.MapControllers();

app.Run();