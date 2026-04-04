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
            using var db = new BookSwapDbContext(DbSession.GetOptions());
            var user = db.Users.FirstOrDefault(u => u.SessionId == token);

            if (user != null)
                context.Items["CurrentUser"] = user;
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

