using System;
using System.Collections.Generic;
using System.Linq;
using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Swap;
using BookSwap.Domain.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookSwap.Api.Controllers;

[ApiController]
[Route("api/admin/activity")]
[Authorize(Roles = "Admin")]
public class AdminActivityController : ControllerBase
{
    [HttpGet]
    public IActionResult GetActivity([FromQuery] int limit = 20)
    {
        var currentUser = HttpContext.Items["CurrentUser"] as UserEntity;
        if (currentUser == null) return Unauthorized("Not authenticated");
        if (currentUser.Role != UserRole.Admin) return StatusCode(403, "Access denied");

        using var db = new BookSwapDbContext(DbSession.GetOptions());
        var activities = new List<object>();

        var newBooks = db.Books
            .Include(b => b.Owner)
            .OrderByDescending(b => b.CreatedAt)
            .Take(limit)
            .Select(b => new {
                id = "book_" + b.Id,
                type = "book_added",
                description = b.Title + " by " + b.Author,
                user = b.Owner.Username,
                timestamp = b.CreatedAt
            }).ToList();
        activities.AddRange(newBooks);

        var newUsers = db.Users
            .Where(u => u.Role == UserRole.User)
            .OrderByDescending(u => u.CreatedAt)
            .Take(limit)
            .Select(u => new {
                id = "user_" + u.Id,
                type = "user_joined",
                description = u.FirstName + " " + u.LastName + " joined",
                user = u.Username,
                timestamp = u.CreatedAt
            }).ToList();
        activities.AddRange(newUsers);

        var pendingSwaps = db.SwapRequests
            .Include(s => s.Requester)
            .Include(s => s.BookRequested)
            .Where(s => s.Status == SwapStatus.Pending)
            .OrderByDescending(s => s.CreatedAt)
            .Take(limit)
            .Select(s => new {
                id = "swap_pending_" + s.Id,
                type = "swap_requested",
                description = "Swap request for \"" + s.BookRequested.Title + "\"",
                user = s.Requester.Username,
                timestamp = s.CreatedAt
            }).ToList();
        activities.AddRange(pendingSwaps);

        var completedSwaps = db.SwapRequests
            .Include(s => s.Requester)
            .Include(s => s.BookRequested)
            .Where(s => s.Status == SwapStatus.Accepted)
            .OrderByDescending(s => s.UpdatedAt)
            .Take(limit)
            .Select(s => new {
                id = "swap_done_" + s.Id,
                type = "swap_completed",
                description = "Swap completed for \"" + s.BookRequested.Title + "\"",
                user = s.Requester.Username,
                timestamp = s.UpdatedAt
            }).ToList();
        activities.AddRange(completedSwaps);

        var reports = db.Reports
            .Include(r => r.Reporter)
            .OrderByDescending(r => r.CreatedAt)
            .Take(limit)
            .Select(r => new {
                id = "report_" + r.Id,
                type = "report_filed",
                description = "Report filed: " + r.Reason,
                user = r.Reporter.Username,
                timestamp = r.CreatedAt
            }).ToList();
        activities.AddRange(reports);

        var sorted = activities
            .OrderByDescending(a => (DateTime)a.GetType().GetProperty("timestamp")!.GetValue(a)!)
            .Take(limit)
            .ToList();

        return Ok(sorted);
    }
}