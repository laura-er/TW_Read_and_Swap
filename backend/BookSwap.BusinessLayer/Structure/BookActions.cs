using Microsoft.EntityFrameworkCore;
using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Models.Book;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Structure;

public class BookActions
{
    public BookActions() { }

    private static BookDto MapToDto(BookEntity b) => new BookDto
    {
        Id          = b.Id,
        Title       = b.Title,
        Author      = b.Author,
        Genre       = b.Genre,
        Condition   = b.Condition,
        CoverUrl    = b.CoverUrl,
        Description = b.Description,
        IsAvailable = b.IsAvailable,
        OwnerId     = b.OwnerId,
        ReviewCount = b.Reviews.Count,
        Rating      = b.Reviews.Count > 0 ? b.Reviews.Average(r => (double)r.Rating) : (double?)null
    };

    protected ServiceResponse GetAllBooksAction()
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var books = db.Books
            .Include(b => b.Reviews)
            .ToList()
            .Select(MapToDto)
            .ToList();

        return new ServiceResponse { IsSuccess = true, Data = books };
    }

    protected ServiceResponse SearchBooksAction(
        string? search,
        string? genre,
        string? condition,
        bool? isAvailable,
        string? sort,
        string? order)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var query = db.Books.Include(b => b.Reviews).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(b =>
                b.Title.ToLower().Contains(search.ToLower()) ||
                b.Author.ToLower().Contains(search.ToLower()));

        if (!string.IsNullOrWhiteSpace(genre))
            query = query.Where(b => b.Genre.ToLower() == genre.ToLower());

        if (!string.IsNullOrWhiteSpace(condition))
            query = query.Where(b => b.Condition.ToLower() == condition.ToLower());

        if (isAvailable.HasValue)
            query = query.Where(b => b.IsAvailable == isAvailable.Value);

        query = sort?.ToLower() switch
        {
            "title"     => order == "desc" ? query.OrderByDescending(b => b.Title)     : query.OrderBy(b => b.Title),
            "author"    => order == "desc" ? query.OrderByDescending(b => b.Author)    : query.OrderBy(b => b.Author),
            "createdat" => order == "desc" ? query.OrderByDescending(b => b.CreatedAt) : query.OrderBy(b => b.CreatedAt),
            _           => query.OrderByDescending(b => b.CreatedAt)
        };

        var books = query.ToList().Select(MapToDto).ToList();

        return new ServiceResponse { IsSuccess = true, Data = books };
    }

    internal ServiceResponse GetBooksByOwnerAction(int ownerId)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var books = db.Books
            .Include(b => b.Reviews)
            .Where(b => b.OwnerId == ownerId)
            .ToList()
            .Select(MapToDto)
            .ToList();

        return new ServiceResponse { IsSuccess = true, Data = books };
    }

    protected ServiceResponse GetBookByIdAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var book = db.Books
            .Include(b => b.Reviews)
            .FirstOrDefault(b => b.Id == id);

        if (book == null)
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };

        return new ServiceResponse { IsSuccess = true, Data = MapToDto(book) };
    }

    protected ServiceResponse CreateBookAction(BookCreateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var ownerExists = db.Users.Any(u => u.Id == dto.OwnerId);
        if (!ownerExists)
            return new ServiceResponse { IsSuccess = false, Message = "Owner not found" };

        var book = new BookEntity
        {
            Title       = dto.Title,
            Author      = dto.Author,
            Genre       = dto.Genre,
            Condition   = dto.Condition,
            CoverUrl    = dto.CoverUrl,
            Description = dto.Description,
            IsAvailable = true,
            OwnerId     = dto.OwnerId,
            CreatedAt   = DateTime.UtcNow
        };

        try
        {
            db.Books.Add(book);
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Create book failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book created" };
    }

    protected ServiceResponse UpdateBookAction(int id, BookUpdateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var book = db.Books.Find(id);
        if (book == null)
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };

        book.Title       = dto.Title;
        book.Author      = dto.Author;
        book.Genre       = dto.Genre;
        book.Condition   = dto.Condition;
        book.CoverUrl    = dto.CoverUrl;
        book.Description = dto.Description;
        book.IsAvailable = dto.IsAvailable;

        try
        {
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Update book failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book updated" };
    }

    protected ServiceResponse DeleteBookAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var book = db.Books.Find(id);
        if (book == null)
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };

        try
        {
            // Șterge swap-urile asociate cărții
            var swaps = db.SwapRequests
                .Where(s => s.BookOfferedId == id || s.BookRequestedId == id)
                .ToList();
            db.SwapRequests.RemoveRange(swaps);

            // Șterge favoritele asociate cărții
            var favorites = db.Favorites
                .Where(f => f.BookId == id)
                .ToList();
            db.Favorites.RemoveRange(favorites);

            // Șterge review-urile asociate cărții
            var reviews = db.Reviews
                .Where(r => r.BookId == id)
                .ToList();
            db.Reviews.RemoveRange(reviews);

            // Acum șterge cartea
            db.Books.Remove(book);
            db.SaveChanges();
        }
        catch (Exception ex)
        {
            return new ServiceResponse { IsSuccess = false, Message = $"Delete book failed: {ex.Message}" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book deleted" };
    }
}