using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.Swap;

namespace BookSwap.BusinessLayer.Core;

public class SwapLogic : SwapActions, ISwapLogic
{
    public ServiceResponse GetAllSwaps() => GetAllSwapsAction();
    public ServiceResponse GetSwapById(int id) => GetSwapByIdAction(id);
    public ServiceResponse GetSwapsByRequester(int requesterId) => GetSwapsByRequesterAction(requesterId);
    public ServiceResponse GetSwapsByOwner(int ownerId) => GetSwapsByOwnerAction(ownerId);
    public ServiceResponse CreateSwap(SwapCreateDto dto) => CreateSwapAction(dto);
    public ServiceResponse UpdateSwapStatus(int id, SwapUpdateDto dto) => UpdateSwapStatusAction(id, dto);
    public ServiceResponse DeleteSwap(int id) => DeleteSwapAction(id);
}