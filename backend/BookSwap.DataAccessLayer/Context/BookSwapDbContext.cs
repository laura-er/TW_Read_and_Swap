using Microsoft.EntityFrameworkCore;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.Swap;
using BookSwap.Domain.Entities.Review;
using BookSwap.Domain.Entities.Favorite;
using BookSwap.Domain.Entities.Report;

namespace BookSwap.DataAccessLayer.Context;

public sealed class BookSwapDbContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<BookEntity> Books { get; set; }
    public DbSet<SwapRequestEntity> SwapRequests { get; set; }
    public DbSet<ReviewEntity> Reviews { get; set; }
    public DbSet<FavoriteEntity> Favorites { get; set; }
    public DbSet<ReportEntity> Reports { get; set; }

    public BookSwapDbContext(DbContextOptions<BookSwapDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BookEntity>()
            .HasOne(b => b.Owner)
            .WithMany(u => u.Books)
            .HasForeignKey(b => b.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ReviewEntity>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ReviewEntity>()
            .HasOne(r => r.Book)
            .WithMany(b => b.Reviews)
            .HasForeignKey(r => r.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FavoriteEntity>()
            .HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<FavoriteEntity>()
            .HasOne(f => f.Book)
            .WithMany(b => b.Favorites)
            .HasForeignKey(f => f.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ReportEntity>()
            .HasOne(r => r.Reporter)
            .WithMany(u => u.Reports)
            .HasForeignKey(r => r.ReportedByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<SwapRequestEntity>()
            .HasOne(s => s.Requester)
            .WithMany(u => u.SwapRequestsAsRequester)
            .HasForeignKey(s => s.RequesterId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<SwapRequestEntity>()
            .HasOne(s => s.Owner)
            .WithMany(u => u.SwapRequestsAsOwner)
            .HasForeignKey(s => s.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<SwapRequestEntity>()
            .HasOne(s => s.BookOffered)
            .WithMany(b => b.SwapRequestsAsOffered)
            .HasForeignKey(s => s.BookOfferedId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<SwapRequestEntity>()
            .HasOne(s => s.BookRequested)
            .WithMany(b => b.SwapRequestsAsRequested)
            .HasForeignKey(s => s.BookRequestedId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<SwapRequestEntity>()
            .Property(s => s.Status)
            .HasConversion<int>();

        modelBuilder.Entity<ReportEntity>()
            .Property(r => r.Status)
            .HasConversion<int>();

        modelBuilder.Entity<UserEntity>()
            .Property(u => u.Role)
            .HasConversion<int>();
    }
}