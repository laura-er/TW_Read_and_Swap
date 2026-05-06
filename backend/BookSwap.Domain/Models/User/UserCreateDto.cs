using System.ComponentModel.DataAnnotations;

namespace BookSwap.Domain.Models.User;

public class UserCreateDto
{
    [Required]
    [StringLength(30, MinimumLength = 2)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(30, MinimumLength = 2)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [StringLength(30, MinimumLength = 2)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;

    [StringLength(12, MinimumLength = 7)]
    public string Phone { get; set; } = string.Empty;

    [StringLength(100)]
    public string City { get; set; } = string.Empty;

    public double? Latitude { get; set; }

    public double? Longitude { get; set; }

    [Required]
    [StringLength(100)]
    public string Password { get; set; } = string.Empty;
}