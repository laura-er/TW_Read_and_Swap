using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Swap;

public class SwapCreateDto
{
    [Required]
    public int RequesterId { get; set; }

    [Required]
    public int OwnerId { get; set; }

    [Required]
    public int BookOfferedId { get; set; }

    [Required]
    public int BookRequestedId { get; set; }

    [StringLength(500)]
    public string Message { get; set; } = string.Empty;
}