namespace BookSwap.Domain.Models.Swap;

public class SwapDto
{
    public int Id { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public int RequesterId { get; set; }
    public int OwnerId { get; set; }
    public int BookOfferedId { get; set; }
    public int BookRequestedId { get; set; }
}