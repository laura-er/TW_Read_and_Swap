using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.Domain.Models.Favorite;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Core;

public class FavoriteLogic : FavoriteActions, IFavoriteLogic
{
    public ServiceResponse GetFavoritesByUser(int userId) => GetFavoritesByUserAction(userId);
    public ServiceResponse AddFavorite(FavoriteCreateDto dto) => AddFavoriteAction(dto);
    public ServiceResponse RemoveFavorite(int id) => RemoveFavoriteAction(id);
}