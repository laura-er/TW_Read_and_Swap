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

    public ISwapLogic GetSwapLogic()
    {
        return new SwapLogic();
    }

    public IReviewLogic GetReviewLogic()
    {
        return new ReviewLogic();
    }

    public IFavoriteLogic GetFavoriteLogic()
    {
        return new FavoriteLogic();
    }
}