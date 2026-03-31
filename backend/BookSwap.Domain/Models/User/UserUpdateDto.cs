namespace BookSwap.Domain.Models.User;

public class UserUpdateDto
{
    public string FirstName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}
