using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Swap;
using BookSwap.Domain.Models.Service;
using BookSwap.Domain.Models.Swap;

namespace BookSwap.BusinessLayer.Structure;

public class SwapActions
{
    protected ServiceResponse GetAllSwapsAction()
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var swaps = db.SwapRequests.Select(s => new SwapDto
        {
            Id = s.Id,
            Status = s.Status.ToString().ToLower(),
            Message = s.Message,
            RequesterId = s.RequesterId,
            OwnerId = s.OwnerId,
            BookOfferedId = s.BookOfferedId,
            BookRequestedId = s.BookRequestedId
        }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = swaps };
    }

    protected ServiceResponse GetSwapByIdAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var s = db.SwapRequests.Find(id);
        if (s == null)
            return new ServiceResponse { IsSuccess = false, Message = "Swap not found" };
        return new ServiceResponse { IsSuccess = true, Data = new SwapDto
        {
            Id = s.Id,
            Status = s.Status.ToString().ToLower(),
            Message = s.Message,
            RequesterId = s.RequesterId,
            OwnerId = s.OwnerId,
            BookOfferedId = s.BookOfferedId,
            BookRequestedId = s.BookRequestedId
        }};
    }

    protected ServiceResponse GetSwapsByRequesterAction(int requesterId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var swaps = db.SwapRequests.Where(s => s.RequesterId == requesterId)
            .Select(s => new SwapDto
            {
                Id = s.Id,
                Status = s.Status.ToString().ToLower(),
                Message = s.Message,
                RequesterId = s.RequesterId,
                OwnerId = s.OwnerId,
                BookOfferedId = s.BookOfferedId,
                BookRequestedId = s.BookRequestedId
            }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = swaps };
    }

    protected ServiceResponse GetSwapsByOwnerAction(int ownerId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var swaps = db.SwapRequests.Where(s => s.OwnerId == ownerId)
            .Select(s => new SwapDto
            {
                Id = s.Id,
                Status = s.Status.ToString().ToLower(),
                Message = s.Message,
                RequesterId = s.RequesterId,
                OwnerId = s.OwnerId,
                BookOfferedId = s.BookOfferedId,
                BookRequestedId = s.BookRequestedId
            }).ToList();
        return new ServiceResponse { IsSuccess = true, Data = swaps };
    }

    protected ServiceResponse CreateSwapAction(SwapCreateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        if (!db.Users.Any(u => u.Id == dto.RequesterId))
            return new ServiceResponse { IsSuccess = false, Message = "Requester not found" };
        if (!db.Users.Any(u => u.Id == dto.OwnerId))
            return new ServiceResponse { IsSuccess = false, Message = "Owner not found" };
        if (!db.Books.Any(b => b.Id == dto.BookOfferedId))
            return new ServiceResponse { IsSuccess = false, Message = "BookOffered not found" };
        if (!db.Books.Any(b => b.Id == dto.BookRequestedId))
            return new ServiceResponse { IsSuccess = false, Message = "BookRequested not found" };

        // Verificare duplicate
        var duplicate = db.SwapRequests.Any(s =>
            s.RequesterId == dto.RequesterId &&
            s.BookRequestedId == dto.BookRequestedId &&
            (s.Status == SwapStatus.Pending || s.Status == SwapStatus.Accepted));

        if (duplicate)
            return new ServiceResponse { IsSuccess = false, Message = "You already have an active swap request for this book" };

        var swap = new SwapRequestEntity
        {
            Status = SwapStatus.Pending,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            RequesterId = dto.RequesterId,
            OwnerId = dto.OwnerId,
            BookOfferedId = dto.BookOfferedId,
            BookRequestedId = dto.BookRequestedId
        };

        try { db.SwapRequests.Add(swap); db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Create swap failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Swap created" };
    }

    protected ServiceResponse UpdateSwapStatusAction(int id, SwapUpdateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var swap = db.SwapRequests.Find(id);
        if (swap == null)
            return new ServiceResponse { IsSuccess = false, Message = "Swap not found" };

        if (!Enum.TryParse<SwapStatus>(dto.Status, ignoreCase: true, out var newStatus))
            return new ServiceResponse { IsSuccess = false, Message = "Invalid status. Use: Pending, Accepted, Rejected, Cancelled" };

        swap.Status = newStatus;
        swap.UpdatedAt = DateTime.UtcNow;

        // Când swap-ul e acceptat, marchează ambele cărți ca indisponibile
        if (newStatus == SwapStatus.Accepted)
        {
            var bookOffered = db.Books.Find(swap.BookOfferedId);
            var bookRequested = db.Books.Find(swap.BookRequestedId);
            if (bookOffered != null) bookOffered.IsAvailable = false;
            if (bookRequested != null) bookRequested.IsAvailable = false;
        }

        // Când swap-ul e respins sau anulat, re-activează ambele cărți
        if (newStatus == SwapStatus.Rejected || newStatus == SwapStatus.Cancelled)
        {
            var bookOffered = db.Books.Find(swap.BookOfferedId);
            var bookRequested = db.Books.Find(swap.BookRequestedId);
            if (bookOffered != null) bookOffered.IsAvailable = true;
            if (bookRequested != null) bookRequested.IsAvailable = true;
        }

        try { db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Update swap failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Swap updated" };
    }

    protected ServiceResponse DeleteSwapAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var swap = db.SwapRequests.Find(id);
        if (swap == null)
            return new ServiceResponse { IsSuccess = false, Message = "Swap not found" };

        try { db.SwapRequests.Remove(swap); db.SaveChanges(); }
        catch (Exception) { return new ServiceResponse { IsSuccess = false, Message = "Delete swap failed" }; }

        return new ServiceResponse { IsSuccess = true, Message = "Swap deleted" };
    }
}