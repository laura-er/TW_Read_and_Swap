using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Swap;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/swaps")]
[Authorize]
public class SwapController : ControllerBase
{
    private readonly ISwapLogic _swapLogic;

    public SwapController()
    {
        var bl = new BusinessLogic();
        _swapLogic = bl.GetSwapLogic();
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAll()
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        if (currentUser.Role != UserRole.Admin) return StatusCode(403, "Access denied");
        var response = _swapLogic.GetAllSwaps();
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        var response = _swapLogic.GetSwapById(id);
        if (!response.IsSuccess) return NotFound(response.Message);
        var swap = response.Data as SwapDto;
        if (currentUser.Role != UserRole.Admin &&
            currentUser.Id != swap!.RequesterId &&
            currentUser.Id != swap!.OwnerId)
            return StatusCode(403, "Access denied");
        return Ok(response.Data);
    }

    [HttpGet("requester/{requesterId}")]
    [Authorize]
    public IActionResult GetByRequester([FromRoute] int requesterId)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        if (currentUser.Id != requesterId && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _swapLogic.GetSwapsByRequester(requesterId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("owner/{ownerId}")]
    [Authorize]
    public IActionResult GetByOwner([FromRoute] int ownerId)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        if (currentUser.Id != ownerId && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _swapLogic.GetSwapsByOwner(ownerId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] SwapCreateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        dto.RequesterId = currentUser.Id;
        var response = _swapLogic.CreateSwap(dto);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }

    [HttpPut("{id}/status")]
    [Authorize]
    public IActionResult UpdateStatus([FromRoute] int id, [FromBody] SwapUpdateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        var swapResponse = _swapLogic.GetSwapById(id);
        if (!swapResponse.IsSuccess) return NotFound(swapResponse.Message);
        var swap = swapResponse.Data as SwapDto;
        if (currentUser.Role != UserRole.Admin &&
            currentUser.Id != swap!.OwnerId &&
            currentUser.Id != swap!.RequesterId)
            return StatusCode(403, "Access denied");
        var response = _swapLogic.UpdateSwapStatus(id, dto);
        return response.IsSuccess ? Ok(response.Message) : NotFound(response.Message);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        var swapResponse = _swapLogic.GetSwapById(id);
        if (!swapResponse.IsSuccess) return NotFound(swapResponse.Message);
        var swap = swapResponse.Data as SwapDto;
        if (currentUser.Role != UserRole.Admin && currentUser.Id != swap!.RequesterId)
            return StatusCode(403, "Access denied");
        var response = _swapLogic.DeleteSwap(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }
}
