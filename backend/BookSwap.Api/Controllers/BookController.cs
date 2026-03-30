using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Models.Book;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/books")]
public class BookController : ControllerBase
{
    private readonly IBookLogic _bookLogic;

    public BookController(BusinessLogic bl)
    {
        _bookLogic = bl.GetBookLogic();
    }

    [HttpGet]
    public IActionResult GetAllBooks()
    {
        var response = _bookLogic.GetAllBooks();
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

    [HttpPost]
    public IActionResult CreateBook([FromBody] BookCreateDto dto)
    {
        var response = _bookLogic.CreateBook(dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return StatusCode(201, response.Message);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateBook([FromRoute] int id, [FromBody] BookUpdateDto dto)
    {
        var response = _bookLogic.UpdateBook(id, dto);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook([FromRoute] int id)
    {
        var response = _bookLogic.DeleteBook(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return NoContent();
    }
}

