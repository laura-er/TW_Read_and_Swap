namespace BookSwap.Domain.Models.Favorite;

public class FavoriteDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int BookId { get; set; }
}