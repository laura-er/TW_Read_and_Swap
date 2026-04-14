using System.ComponentModel.DataAnnotations;
using BookSwap.Domain.Entities.User;

namespace BookSwap.Domain.Entities.Report;

public class ReportEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(20)]
    public string Type { get; set; } = string.Empty;

    [Required]
    [StringLength(500)]
    public string Reason { get; set; } = string.Empty;

    public ReportStatus Status { get; set; } = ReportStatus.Open;

    public int TargetId { get; set; }

    [StringLength(200)]
    public string TargetName { get; set; } = string.Empty;

    [StringLength(500)]
    public string? ResolveNote { get; set; }

    [StringLength(100)]
    public string? ResolveAction { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int ReportedByUserId { get; set; }
    public UserEntity Reporter { get; set; } = null!;
}