using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Review;

public class ReviewCreateDto
{
    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    [StringLength(1000)]
    public string Comment { get; set; } = string.Empty;

    [Required]
    public int BookId { get; set; }

    [Required]
    public int UserId { get; set; }
}