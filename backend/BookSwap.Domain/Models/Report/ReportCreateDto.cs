using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.Report;

public class ReportCreateDto
{
    [Required]
    [StringLength(20)]
    public string Type { get; set; } = string.Empty;

    [Required]
    [StringLength(500)]
    public string Reason { get; set; } = string.Empty;

    [Required]
    public int TargetId { get; set; }

    [Required]
    [StringLength(200)]
    public string TargetName { get; set; } = string.Empty;
}