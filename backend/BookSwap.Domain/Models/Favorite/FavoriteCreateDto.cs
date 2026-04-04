using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Favorite;

public class FavoriteCreateDto
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int BookId { get; set; }
}