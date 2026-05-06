using System;
using System.ComponentModel.DataAnnotations;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.User;

namespace BookSwap.Domain.Entities.Review
{
    public class ReviewEntity
    {
        [Key]
        public int Id { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [StringLength(1000)]
        public string Comment { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int BookId { get; set; }
        public BookEntity Book { get; set; } = null!;

        public int UserId { get; set; }
        public UserEntity User { get; set; } = null!;
    }
}