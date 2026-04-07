using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Favorite;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/favorites")]
public class FavoriteController : ControllerBase
{
    private readonly IFavoriteLogic _favoriteLogic;

    public FavoriteController()
    {
        var bl = new BusinessLogic();
        _favoriteLogic = bl.GetFavoriteLogic();
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetByUser([FromRoute] int userId)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        if (currentUser.Id != userId && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");

        var response = _favoriteLogic.GetFavoritesByUser(userId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpPost]
    public IActionResult Add([FromBody] FavoriteCreateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        dto.UserId = currentUser.Id;

        var response = _favoriteLogic.AddFavorite(dto);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult Remove([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        var response = _favoriteLogic.RemoveFavorite(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }
}