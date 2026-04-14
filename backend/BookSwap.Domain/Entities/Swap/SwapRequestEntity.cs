using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.User;

namespace BookSwap.Domain.Entities.Swap;

public class SwapRequestEntity
{
    public int Id { get; set; }
    public SwapStatus Status { get; set; } = SwapStatus.Pending;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public int RequesterId { get; set; }
    public UserEntity Requester { get; set; } = null!;

    public int OwnerId { get; set; }
    public UserEntity Owner { get; set; } = null!;

    public int BookOfferedId { get; set; }
    public BookEntity BookOffered { get; set; } = null!;

    public int BookRequestedId { get; set; }
    public BookEntity BookRequested { get; set; } = null!;
}
