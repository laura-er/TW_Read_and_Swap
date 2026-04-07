using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Report;

public class ReportResolveDto
{
    [Required]
    [StringLength(20)]
    public string Status { get; set; } = string.Empty;    

    [StringLength(500)]
    public string? ResolveNote { get; set; }

    [StringLength(100)]
    public string? ResolveAction { get; set; }
}