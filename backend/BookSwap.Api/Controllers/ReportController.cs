using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Entities.User;
using BookSwap.Domain.Models.Report;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportController : ControllerBase
{
    private readonly IReportLogic _reportLogic;

    public ReportController()
    {
        var bl = new BusinessLogic();
        _reportLogic = bl.GetReportLogic();
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAll()
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _reportLogic.GetAllReports();
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetById([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _reportLogic.GetReportById(id);
        return response.IsSuccess ? Ok(response.Data) : NotFound(response.Message);
    }

    [HttpPut("{id}/resolve")]
    [Authorize(Roles = "Admin")]
    public IActionResult Resolve([FromRoute] int id, [FromBody] ReportResolveDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _reportLogic.ResolveReport(id, dto);
        return response.IsSuccess ? Ok(response.Message) : NotFound(response.Message);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult Delete([FromRoute] int id)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser?.Role != UserRole.Admin)
            return StatusCode(403, "Access denied");
        var response = _reportLogic.DeleteReport(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] ReportCreateDto dto)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null)
            return Unauthorized("Not authenticated");
        var response = _reportLogic.CreateReport(dto, currentUser.Id, currentUser.Username);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }
}