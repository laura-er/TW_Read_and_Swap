using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserLogic _userLogic;

    public UserController()
    {
        var bl = new BusinessLogic();
        _userLogic = bl.GetUserLogic();
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserCreateDto dto)
    {
        var response = _userLogic.Register(dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return StatusCode(201, response.Message);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var response = _userLogic.Login(dto);
        if (!response.IsSuccess)
            return Unauthorized(response.Message);
        return Ok(response.Data);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");
        _userLogic.Logout(currentUser.Id);
        return Ok("Logged out");
    }

    [HttpGet("list")]
    public IActionResult GetUserList()
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _userLogic.GetUserList();
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    // Endpoint PUBLIC pentru găsire user după username — folosit de PublicProfilePage
    [HttpGet("by-username/{username}")]
    public IActionResult GetByUsername([FromRoute] string username)
    {
        var response = _userLogic.GetUserByUsername(username);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Data);
    }

    // Endpoint PUBLIC pentru numărul total de useri — folosit de StatsBar
    [HttpGet("count")]
    public IActionResult GetUserCount()
    {
        var response = _userLogic.GetUserList();
        if (!response.IsSuccess)
            return Ok(0);
        var list = response.Data as List<object>;
        return Ok(list?.Count ?? 0);
    }

    [HttpGet("{id}")]
    public IActionResult GetUser([FromRoute] int id)
    {
        var response = _userLogic.GetUserById(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Data);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser([FromRoute] int id, [FromBody] UserUpdateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");
        if (currentUser.Id != id && currentUser.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _userLogic.UpdateUser(id, dto);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _userLogic.DeleteUser(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return NoContent();
    }

    [HttpPut("{id}/role")]
    public IActionResult ChangeRole([FromRoute] int id, [FromBody] ChangeRoleDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _userLogic.ChangeRole(id, dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Message);
    }
}