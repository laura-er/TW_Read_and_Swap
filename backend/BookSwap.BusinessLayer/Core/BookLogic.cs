using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Models.Book;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Core;

public class BookLogic : BookActions, IBookLogic
{
    public BookLogic(BookSwapDbContext context) : base(context) { }

    public ServiceResponse GetAllBooks()
        => GetAllBooksAction();

    public ServiceResponse GetBookById(int id)
        => GetBookByIdAction(id);

    public ServiceResponse CreateBook(BookCreateDto dto)
        => CreateBookAction(dto);

    public ServiceResponse UpdateBook(int id, BookUpdateDto dto)
        => UpdateBookAction(id, dto);

    public ServiceResponse DeleteBook(int id)
        => DeleteBookAction(id);
}

