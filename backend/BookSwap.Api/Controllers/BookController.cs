using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Book;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/books")]
public class BookController : ControllerBase
{
    private readonly IBookLogic _bookLogic;

    public BookController()
    {
        var bl = new BusinessLogic();
        _bookLogic = bl.GetBookLogic();
    }

    // ── PUBLIC ──────────────────────────────────────────
    [HttpGet]
    public IActionResult GetAllBooks()
    {
        var response = _bookLogic.GetAllBooks();
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    [HttpGet("search")]
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
    public IActionResult GetBooksByOwner([FromRoute] int ownerId)
    {
        var response = _bookLogic.GetBooksByOwner(ownerId);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    [HttpGet("{id}")]
    public IActionResult GetBook([FromRoute] int id)
    {
        var response = _bookLogic.GetBookById(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Data);
    }

    // ── AUTENTIFICAT ─────────────────────────────────────
    [HttpPost]
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
    public IActionResult UpdateBook([FromRoute] int id, [FromBody] BookUpdateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        var bookResponse = _bookLogic.GetBookById(id);
        if (!bookResponse.IsSuccess)
            return NotFound(bookResponse.Message);

        var book = bookResponse.Data as BookDto;
        if (book!.OwnerId != currentUser.Id && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");

        var response = _bookLogic.UpdateBook(id, dto);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        var bookResponse = _bookLogic.GetBookById(id);
        if (!bookResponse.IsSuccess)
            return NotFound(bookResponse.Message);

        var book = bookResponse.Data as BookDto;
        if (book!.OwnerId != currentUser.Id && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");

        var response = _bookLogic.DeleteBook(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return NoContent();
    }
}