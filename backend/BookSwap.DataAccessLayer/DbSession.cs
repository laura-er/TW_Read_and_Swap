using Microsoft.EntityFrameworkCore;
using BookSwap.DataAccessLayer.Context;

namespace BookSwap.DataAccessLayer;

public class DbSession
{
    public static string? ConnectionString { get; set; }

    public static DbContextOptions<BookSwapDbContext> GetOptions()
    {
        return new DbContextOptionsBuilder<BookSwapDbContext>()
            .UseNpgsql(ConnectionString)
            .Options;
    }
}