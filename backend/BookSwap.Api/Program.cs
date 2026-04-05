using BookSwap.BusinessLayer;
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

// ── Seed admin implicit 
using (var db = new BookSwapDbContext(DbSession.GetOptions()))
{
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
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");
app.UseMiddleware<BookSwap.Api.Middleware.AuthMiddleware>();
app.MapControllers();

app.Run();