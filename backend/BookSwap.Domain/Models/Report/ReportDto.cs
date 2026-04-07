namespace BookSwap.Domain.Models.Report;

public class ReportDto
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string ReportedBy { get; set; } = string.Empty;
    public int TargetId { get; set; }
    public string TargetName { get; set; } = string.Empty;
    public string? ResolveNote { get; set; }
    public string? ResolveAction { get; set; }
    public DateTime CreatedAt { get; set; }
}