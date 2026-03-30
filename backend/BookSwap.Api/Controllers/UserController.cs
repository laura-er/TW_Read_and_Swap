using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Models.User;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserLogic _userLogic;

    public UserController(BusinessLogic bl)
    {
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

    [HttpGet("list")]
    public IActionResult GetUserList()
    {
        var response = _userLogic.GetUserList();
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
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
        var response = _userLogic.UpdateUser(id, dto);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return Ok(response.Data);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser([FromRoute] int id)
    {
        var response = _userLogic.DeleteUser(id);
        if (!response.IsSuccess)
            return NotFound(response.Message);
        return NoContent();
    }
}

