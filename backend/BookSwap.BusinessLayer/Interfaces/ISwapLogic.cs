using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.Swap;

namespace BookSwap.BusinessLayer.Interfaces;

public interface ISwapLogic
{
    ServiceResponse GetAllSwaps();
    ServiceResponse GetSwapById(int id);
    ServiceResponse GetSwapsByRequester(int requesterId);
    ServiceResponse GetSwapsByOwner(int ownerId);
    ServiceResponse CreateSwap(SwapCreateDto dto);
    ServiceResponse UpdateSwapStatus(int id, SwapUpdateDto dto);
    ServiceResponse DeleteSwap(int id);
}