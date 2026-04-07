using BookSwap.Api.Helpers;
using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
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
        var currentUser = HttpContext.GetCurrentUser();
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        // Un user poate vedea doar favoritele lui, adminul pe ale oricui
        if (currentUser.Id != userId && !HttpContext.IsAdmin())
            return StatusCode(403, "Access denied");

        var response = _favoriteLogic.GetFavoritesByUser(userId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpPost]
    public IActionResult Add([FromBody] FavoriteCreateDto dto)
    {
        var currentUser = HttpContext.GetCurrentUser();
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        dto.UserId = currentUser.Id;

        var response = _favoriteLogic.AddFavorite(dto);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult Remove([FromRoute] int id)
    {
        var currentUser = HttpContext.GetCurrentUser();
        if (currentUser == null)
            return Unauthorized("Not authenticated");

        var response = _favoriteLogic.RemoveFavorite(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }
}