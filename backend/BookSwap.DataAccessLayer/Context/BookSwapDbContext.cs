using Microsoft.EntityFrameworkCore;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Entities.Swap;
namespace BookSwap.DataAccessLayer.Context;

public sealed class BookSwapDbContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<BookEntity> Books { get; set; }
    public DbSet<SwapRequestEntity> SwapRequests { get; set; }
    public BookSwapDbContext(DbContextOptions<BookSwapDbContext> options) : base(options) { }
}
