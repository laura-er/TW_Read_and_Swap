namespace BookSwap.Domain.Models.Review;

public class ReviewDto
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public int BookId { get; set; }
    public int UserId { get; set; }
}