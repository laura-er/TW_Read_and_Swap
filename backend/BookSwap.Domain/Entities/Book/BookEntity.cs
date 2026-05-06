using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookSwap.Domain.Entities.Favorite;
using BookSwap.Domain.Entities.Review;
using BookSwap.Domain.Entities.Swap;
using BookSwap.Domain.Entities.User;

namespace BookSwap.Domain.Entities.Book
{
    public class BookEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Author { get; set; } = string.Empty;

        [StringLength(50)]
        public string Genre { get; set; } = string.Empty;

        [StringLength(20)]
        public string Condition { get; set; } = string.Empty;

        [StringLength(500)]
        public string CoverUrl { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        public bool IsAvailable { get; set; } = true;

        [DataType(DataType.Date)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int OwnerId { get; set; }
        public UserEntity Owner { get; set; } = null!;

        public ICollection<ReviewEntity> Reviews { get; set; } = new List<ReviewEntity>();
        public ICollection<FavoriteEntity> Favorites { get; set; } = new List<FavoriteEntity>();
        public ICollection<SwapRequestEntity> SwapRequestsAsOffered { get; set; } = new List<SwapRequestEntity>();
        public ICollection<SwapRequestEntity> SwapRequestsAsRequested { get; set; } = new List<SwapRequestEntity>();
    }
}