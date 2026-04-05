using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.Domain.Models.Book;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Core;

public class BookLogic : BookActions, IBookLogic
{
    public BookLogic() : base() { }

    public ServiceResponse GetAllBooks()
        => GetAllBooksAction();

    public ServiceResponse GetBooksByOwner(int ownerId)
        => GetBooksByOwnerAction(ownerId);

    public ServiceResponse GetBookById(int id)
        => GetBookByIdAction(id);

    public ServiceResponse SearchBooks(string? search, string? genre, string? condition, bool? isAvailable, string? sort, string? order)
        => SearchBooksAction(search, genre, condition, isAvailable, sort, order);

    public ServiceResponse CreateBook(BookCreateDto dto)
        => CreateBookAction(dto);

    public ServiceResponse UpdateBook(int id, BookUpdateDto dto)
        => UpdateBookAction(id, dto);

    public ServiceResponse DeleteBook(int id)
        => DeleteBookAction(id);
}

