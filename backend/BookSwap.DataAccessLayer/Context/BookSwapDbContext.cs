using Microsoft.EntityFrameworkCore;
using BookSwap.Domain.Entities.User;

namespace BookSwap.DataAccessLayer.Context;

public sealed class BookSwapDbContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }

    public BookSwapDbContext(DbContextOptions<BookSwapDbContext> options) : base(options) { }
}
