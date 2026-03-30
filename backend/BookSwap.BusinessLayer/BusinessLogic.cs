using BookSwap.BusinessLayer.Core;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.DataAccessLayer.Context;

namespace BookSwap.BusinessLayer;

public class BusinessLogic
{
    private readonly BookSwapDbContext _context;

    public BusinessLogic(BookSwapDbContext context)
    {
        _context = context;
    }

    public IUserLogic GetUserLogic()
    {
        return new UserLogic(_context);
    }

    public IBookLogic GetBookLogic()
    {
        return new BookLogic(_context);
    }
}

