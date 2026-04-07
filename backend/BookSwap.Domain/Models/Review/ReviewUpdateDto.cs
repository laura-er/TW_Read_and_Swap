using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Review;

public class ReviewUpdateDto
{
    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    [StringLength(1000)]
    public string Comment { get; set; } = string.Empty;
}