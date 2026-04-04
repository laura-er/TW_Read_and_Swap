using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Favorite;
using BookSwap.Domain.Models.Favorite;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Structure;

public class FavoriteActions
{
    protected ServiceResponse GetFavoritesByUserAction(int userId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var favs = db.Favorites.Where(f => f.UserId == userId)
            .Select(f => new FavoriteDto
            {
                Id = f.Id, UserId = f.UserId, BookId = f.BookId
            }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = favs };
    }

    protected ServiceResponse AddFavoriteAction(FavoriteCreateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        if (!db.Users.Any(u => u.Id == dto.UserId))
            return new ServiceResponse { IsSuccess = false, Message = "User not found" };
        if (!db.Books.Any(b => b.Id == dto.BookId))
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };

        var exists = db.Favorites.Any(f => f.UserId == dto.UserId && f.BookId == dto.BookId);
        if (exists)
            return new ServiceResponse { IsSuccess = false, Message = "Already in favorites" };

        var favorite = new FavoriteEntity
        {
            UserId = dto.UserId,
            BookId = dto.BookId,
            CreatedAt = DateTime.UtcNow
        };

        try { db.Favorites.Add(favorite); db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Add favorite failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Added to favorites" };
    }

    protected ServiceResponse RemoveFavoriteAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var fav = db.Favorites.Find(id);
        if (fav == null)
            return new ServiceResponse { IsSuccess = false, Message = "Favorite not found" };

        try { db.Favorites.Remove(fav); db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Remove favorite failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Removed from favorites" };
    }
}