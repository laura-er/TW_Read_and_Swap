using BookSwap.BusinessLayer;
using BookSwap.BusinessLayer.Interfaces;
using BookSwap.Domain.Models.Swap;
using Microsoft.AspNetCore.Mvc;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/swaps")]
public class SwapController : ControllerBase
{
    private readonly ISwapLogic _swapLogic;

    public SwapController()
    {
        var bl = new BusinessLogic();
        _swapLogic = bl.GetSwapLogic();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var response = _swapLogic.GetAllSwaps();
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        var response = _swapLogic.GetSwapById(id);
        return response.IsSuccess ? Ok(response.Data) : NotFound(response.Message);
    }

    [HttpGet("requester/{requesterId}")]
    public IActionResult GetByRequester([FromRoute] int requesterId)
    {
        var response = _swapLogic.GetSwapsByRequester(requesterId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpGet("owner/{ownerId}")]
    public IActionResult GetByOwner([FromRoute] int ownerId)
    {
        var response = _swapLogic.GetSwapsByOwner(ownerId);
        return response.IsSuccess ? Ok(response.Data) : BadRequest(response.Message);
    }

    [HttpPost]
    public IActionResult Create([FromBody] SwapCreateDto dto)
    {
        var response = _swapLogic.CreateSwap(dto);
        return response.IsSuccess ? StatusCode(201, response.Message) : BadRequest(response.Message);
    }

    [HttpPut("{id}/status")]
    public IActionResult UpdateStatus([FromRoute] int id, [FromBody] SwapUpdateDto dto)
    {
        var response = _swapLogic.UpdateSwapStatus(id, dto);
        return response.IsSuccess ? Ok(response.Message) : NotFound(response.Message);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete([FromRoute] int id)
    {
        var response = _swapLogic.DeleteSwap(id);
        return response.IsSuccess ? NoContent() : NotFound(response.Message);
    }
}