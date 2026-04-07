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

    public IReviewLogic GetReviewLogic()
    {
        return new ReviewLogic();
    }

    public ISwapLogic GetSwapLogic()
    {
        return new SwapLogic();
    }

    public IFavoriteLogic GetFavoriteLogic()
    {
        return new FavoriteLogic();
    }

    public IReportLogic GetReportLogic()
    {
        return new ReportLogic();
    }
}