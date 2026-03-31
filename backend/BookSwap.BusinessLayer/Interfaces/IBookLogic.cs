using BookSwap.Domain.Models.Book;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Interfaces;

public interface IBookLogic
{
    ServiceResponse GetAllBooks();
    ServiceResponse GetBooksByOwner(int ownerId);
    ServiceResponse GetBookById(int id);
    ServiceResponse CreateBook(BookCreateDto dto);
    ServiceResponse UpdateBook(int id, BookUpdateDto dto);
    ServiceResponse DeleteBook(int id);
  
}
