using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Book;
using BookSwap.Domain.Models.Book;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Structure;

public class BookActions
{
    private readonly BookSwapDbContext _context;

    public BookActions(BookSwapDbContext context)
    {
        _context = context;
    }

    protected ServiceResponse GetAllBooksAction()
    {
        var books = _context.Books
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
        var book = _context.Books.Find(id);
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
            _context.Books.Add(book);
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Create book failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book created" };
    }

    protected ServiceResponse UpdateBookAction(int id, BookUpdateDto dto)
    {
        var book = _context.Books.Find(id);
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
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Update book failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book updated" };
    }

    protected ServiceResponse DeleteBookAction(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null)
            return new ServiceResponse { IsSuccess = false, Message = "Book not found" };

        try
        {
            _context.Books.Remove(book);
            _context.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Delete book failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Book deleted" };
    }
}
