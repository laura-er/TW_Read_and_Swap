using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSwap.Domain.Entities.User
{
    public class UserEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(30)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [StringLength(30)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;

        [StringLength(12)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [StringLength(48, MinimumLength = 8)]
        public string PasswordHash { get; set; } = string.Empty;

        public UserRole Role { get; set; } = UserRole.User;

        public string SessionId { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}