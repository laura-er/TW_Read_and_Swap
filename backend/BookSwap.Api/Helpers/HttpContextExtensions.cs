using BookSwap.Domain.Entities.User;

namespace BookSwap.Api.Helpers;

public static class HttpContextExtensions
{
    public static UserEntity? GetCurrentUser(this HttpContext context)
    {
        return context.Items["CurrentUser"] as UserEntity;
    }

    public static bool IsAuthenticated(this HttpContext context)
    {
        return context.GetCurrentUser() != null;
    }

    public static bool IsAdmin(this HttpContext context)
    {
        return context.GetCurrentUser()?.Role == UserRole.Admin;
    }
}