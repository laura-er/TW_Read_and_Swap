using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BookSwap.DataAccessLayer.Context;

public class BookSwapDbContextFactory : IDesignTimeDbContextFactory<BookSwapDbContext>
{
    public BookSwapDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<BookSwapDbContext>();
        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5432;Database=bookswap;Username=postgres;Password=postgres"
        );
        return new BookSwapDbContext(optionsBuilder.Options);
    }
}

