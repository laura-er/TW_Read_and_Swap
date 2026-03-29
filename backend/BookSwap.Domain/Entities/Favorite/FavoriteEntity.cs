using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.User;

namespace BookSwap.Domain.Entities.Favorite;

public class FavoriteEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    public UserEntity User { get; set; } = null!;

    public int BookId { get; set; }
    public BookEntity Book { get; set; } = null!;
}