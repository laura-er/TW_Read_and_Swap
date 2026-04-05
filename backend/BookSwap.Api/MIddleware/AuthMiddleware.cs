using System.Security.Claims;
using BookSwap.BusinessLayer.Structure;
using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;

namespace BookSwap.Api.Middleware;

public class AuthMiddleware
{
    private readonly RequestDelegate _next;

    public AuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var token = ExtractToken(context);

        if (!string.IsNullOrEmpty(token))
        {
            var tokenService = new TokenService();
            var principal = tokenService.ValidateToken(token);

            if (principal != null)
            {
                var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var roleClaim = principal.FindFirst(ClaimTypes.Role)?.Value;

                if (int.TryParse(userIdClaim, out var userId))
                {
                    using var db = new BookSwapDbContext(DbSession.GetOptions());
                    var user = db.Users.Find(userId);

                    if (user != null)
                        context.Items["CurrentUser"] = user;
                }
            }
        }

        await _next(context);
    }

    private string? ExtractToken(HttpContext context)
    {
        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

        if (authHeader != null && authHeader.StartsWith("Bearer "))
            return authHeader.Substring(7);

        return null;
    }
}

