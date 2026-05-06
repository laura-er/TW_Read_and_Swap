using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Book;

public class BookUpdateDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Author { get; set; } = string.Empty;

    [StringLength(50)]
    public string Genre { get; set; } = string.Empty;

    [StringLength(20)]
    public string Condition { get; set; } = string.Empty;

    [StringLength(500)]
    public string CoverUrl { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    public bool IsAvailable { get; set; }
}