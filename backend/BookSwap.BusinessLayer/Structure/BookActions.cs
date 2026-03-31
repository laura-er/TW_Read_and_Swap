using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Models.Book;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Structure;

public class BookActions
{
    public BookActions() { }

    protected ServiceResponse GetAllBooksAction()
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var books = db.Books
            .Select(b => new BookDto
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Genre = b.Genre,
                Condition = b.Condition,
                CoverUrl = b.CoverUrl,
                Description = b.Description,
                IsAvailable = b.IsAvailable,
                OwnerId = b.OwnerId
            }).ToList();

        return new ServiceResponse { IsSuccess = true, Data = books };
    }

    protected ServiceResponse GetBookByIdAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var book = db.Books.Find(id);
        if (book == null)
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };

        var dto = new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Genre = book.Genre,
            Condition = book.Condition,
            CoverUrl = book.CoverUrl,
            Description = book.Description,
            IsAvailable = book.IsAvailable,
            OwnerId = book.OwnerId
        };

        return new ServiceResponse { IsSuccess = true, Data = dto };
    }

    protected ServiceResponse CreateBookAction(BookCreateDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var ownerExists = db.Users.Any(u => u.Id == dto.OwnerId);
        if (!ownerExists)
            return new ServiceResponse { IsSuccess = false, Message = "Owner not found" };

        var book = new BookEntity
        {
            Title = dto.Title,
            Author = dto.Author,
            Genre = dto.Genre,
            Condition = dto.Condition,
            CoverUrl = dto.CoverUrl,
            Description = dto.Description,
            IsAvailable = true,
            OwnerId = dto.OwnerId,
            CreatedAt = DateTime.UtcNow
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

        book.Title = dto.Title;
        book.Author = dto.Author;
        book.Genre = dto.Genre;
        book.Condition = dto.Condition;
        book.CoverUrl = dto.CoverUrl;
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
            db.Books.Remove(book);
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Delete book failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book deleted" };
    }
}