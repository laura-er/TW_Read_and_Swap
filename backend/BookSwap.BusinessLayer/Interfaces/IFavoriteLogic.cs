using BookSwap.Domain.Models.Favorite;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Interfaces;

public interface IFavoriteLogic
{
    ServiceResponse GetFavoritesByUser(int userId);
    ServiceResponse AddFavorite(FavoriteCreateDto dto);
    ServiceResponse RemoveFavorite(int id);
}