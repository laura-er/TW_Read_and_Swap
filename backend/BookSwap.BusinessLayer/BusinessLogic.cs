using BookSwap.BusinessLayer.Core;
using BookSwap.BusinessLayer.Interfaces;

namespace BookSwap.BusinessLayer;

public class BusinessLogic
{
    public BusinessLogic() { }

    public IUserLogic GetUserLogic()
    {
        return new UserLogic();
    }

    public IBookLogic GetBookLogic()
    {
        return new BookLogic();
    }
}