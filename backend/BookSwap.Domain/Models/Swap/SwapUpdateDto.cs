using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Swap;

public class SwapUpdateDto
{
    [Required]
    [StringLength(20)]
    public string Status { get; set; } = string.Empty;
}