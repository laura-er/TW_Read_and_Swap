using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.Favorite;
using BookSwap.Domain.Entities.Report;
using BookSwap.Domain.Entities.Review;
using BookSwap.Domain.Entities.Swap;

namespace BookSwap.Domain.Entities.User
{
    public class UserEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(30)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(30)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;

        [StringLength(12)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [StringLength(60)]
        public string PasswordHash { get; set; } = string.Empty;

        public UserRole Role { get; set; } = UserRole.User;

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<BookEntity> Books { get; set; } = new List<BookEntity>();
        public ICollection<ReviewEntity> Reviews { get; set; } = new List<ReviewEntity>();
        public ICollection<FavoriteEntity> Favorites { get; set; } = new List<FavoriteEntity>();
        public ICollection<ReportEntity> Reports { get; set; } = new List<ReportEntity>();
        public ICollection<SwapRequestEntity> SwapRequestsAsRequester { get; set; } = new List<SwapRequestEntity>();
        public ICollection<SwapRequestEntity> SwapRequestsAsOwner { get; set; } = new List<SwapRequestEntity>();
    }
}