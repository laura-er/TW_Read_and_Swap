using BookSwap.Api.Helpers;
using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Models.Review;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/reviews")]
public class ReviewController : ControllerBase
{
    private readonly IReviewLogic _reviewLogic;

    public ReviewController()
    {
        var bl = new BusinessLogic();
        _reviewLogic = bl.GetReviewLogic();
    }

    // ── PUBLIC ──────────────────────────────────────────
    [HttpGet]
    public IActionResult GetAll()
    {
        var response = _reviewLogic.GetAllReviews();
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        var response = _reviewLogic.GetReviewById(id);
        return response.IsSuccess ? Ok(response.Data) : NotFound(response.Message);
    }

    [HttpGet("book/{bookId}")]
    public IActionResult GetByBook([FromRoute] int bookId)
    {
        var response = _reviewLogic.GetReviewsByBook(bookId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetByUser([FromRoute] int userId)
    {
        var response = _reviewLogic.GetReviewsByUser(userId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    // ── AUTENTIFICAT ─────────────────────────────────────
    [HttpPost]
    public IActionResult Create([FromBody] ReviewCreateDto dto)
    {
        var currentUser = HttpContext.GetCurrentUser();
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        dto.UserId = currentUser.Id;

        var response = _reviewLogic.CreateReview(dto);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromRoute] int id, [FromBody] ReviewUpdateDto dto)
    {
        var currentUser = HttpContext.GetCurrentUser();
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        var reviewResponse = _reviewLogic.GetReviewById(id);
        if (!reviewResponse.IsSuccess)
            return NotFound(reviewResponse.Message);

        var review = reviewResponse.Data as ReviewDto;
        if (review!.UserId != currentUser.Id && !HttpContext.IsAdmin())
            return StatusCode(403, "Access denied");

        var response = _reviewLogic.UpdateReview(id, dto);
        return response.IsSuccess ? Ok(response.Message) : NotFound(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete([FromRoute] int id)
    {
        var currentUser = HttpContext.GetCurrentUser();
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        var reviewResponse = _reviewLogic.GetReviewById(id);
        if (!reviewResponse.IsSuccess)
            return NotFound(reviewResponse.Message);

        var review = reviewResponse.Data as ReviewDto;
        if (review!.UserId != currentUser.Id && !HttpContext.IsAdmin())
            return StatusCode(403, "Access denied");

        var response = _reviewLogic.DeleteReview(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }
}