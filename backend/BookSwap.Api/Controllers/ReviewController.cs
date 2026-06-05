using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Review;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/reviews")]
[Authorize]
public class ReviewController : ControllerBase
{
    private readonly IReviewLogic _reviewLogic;

    public ReviewController()
    {
        var bl = new BusinessLogic();
        _reviewLogic = bl.GetReviewLogic();
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetAll()
    {
        var response = _reviewLogic.GetAllReviews();
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public IActionResult GetById([FromRoute] int id)
    {
        var response = _reviewLogic.GetReviewById(id);
        return response.IsSuccess ? Ok(response.Data) : NotFound(response.Message);
    }

    [HttpGet("book/{bookId}")]
    [AllowAnonymous]
    public IActionResult GetByBook([FromRoute] int bookId)
    {
        var response = _reviewLogic.GetReviewsByBook(bookId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("user/{userId}")]
    [AllowAnonymous]
    public IActionResult GetByUser([FromRoute] int userId)
    {
        var response = _reviewLogic.GetReviewsByUser(userId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] ReviewCreateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        dto.UserId = currentUser.Id;
        var response = _reviewLogic.CreateReview(dto);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update([FromRoute] int id, [FromBody] ReviewUpdateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        var reviewResponse = _reviewLogic.GetReviewById(id);
        if (!reviewResponse.IsSuccess) return NotFound(reviewResponse.Message);
        var review = reviewResponse.Data as ReviewDto;
        if (review!.UserId != currentUser.Id && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _reviewLogic.UpdateReview(id, dto);
        return response.IsSuccess ? Ok(response.Message) : NotFound(response.Message);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        var reviewResponse = _reviewLogic.GetReviewById(id);
        if (!reviewResponse.IsSuccess) return NotFound(reviewResponse.Message);
        var review = reviewResponse.Data as ReviewDto;
        if (review!.UserId != currentUser.Id && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _reviewLogic.DeleteReview(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }
}
