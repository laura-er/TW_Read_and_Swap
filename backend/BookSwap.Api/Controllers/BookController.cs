using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Book;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/books")]
[Authorize]
public class BookController : ControllerBase
{
    private readonly IBookLogic _bookLogic;

    public BookController()
    {
        var bl = new BusinessLogic();
        _bookLogic = bl.GetBookLogic();
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetAllBooks()
    {
        var response = _bookLogic.GetAllBooks();
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    [HttpGet("search")]
    [AllowAnonymous]
    public IActionResult SearchBooks(
        [FromQuery] string? search,
        [FromQuery] string? genre,
        [FromQuery] string? condition,
        [FromQuery] bool? isAvailable,
        [FromQuery] string? sort,
        [FromQuery] string? order)
    {
        var response = _bookLogic.SearchBooks(search, genre, condition, isAvailable, sort, order);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    [HttpGet("owner/{ownerId}")]
    [AllowAnonymous]
    public IActionResult GetBooksByOwner([FromRoute] int ownerId)
    {
        var response = _bookLogic.GetBooksByOwner(ownerId);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public IActionResult GetBook([FromRoute] int id)
    {
        var response = _bookLogic.GetBookById(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Data);
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateBook([FromBody] BookCreateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        dto.OwnerId = currentUser.Id;

        var response = _bookLogic.CreateBook(dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return StatusCode(201, response.Message);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateBook([FromRoute] int id, [FromBody] BookUpdateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        if (currentUser.Role == UserRole.Admin)
        {
            var response = _bookLogic.UpdateBook(id, dto);
            return response.IsSuccess ? Ok(response.Message) : NotFound(response.Message);
        }

        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var book = db.Books.Find(id);
        if (book == null)
            return NotFound("Book not found");
        if (book.OwnerId != currentUser.Id)
            return StatusCode(403, "Access denied");

        var updateResponse = _bookLogic.UpdateBook(id, dto);
        return updateResponse.IsSuccess ? Ok(updateResponse.Message) : NotFound(updateResponse.Message);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteBook([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        if (currentUser.Role == UserRole.Admin)
        {
            var response = _bookLogic.DeleteBook(id);
            return response.IsSuccess ? NoContent() : NotFound(response.Message);
        }

        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var book = db.Books.Find(id);
        if (book == null)
            return NotFound("Book not found");
        if (book.OwnerId != currentUser.Id)
            return StatusCode(403, "Access denied");

        var deleteResponse = _bookLogic.DeleteBook(id);
        return deleteResponse.IsSuccess ? NoContent() : NotFound(deleteResponse.Message);
    }
}