using BookSwap.DataAccessLayer;
using BookSwap.DataAccessLayer.Context;
using BookSwap.Domain.Entities.Report;
using BookSwap.Domain.Models.Report;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Structure;

public class ReportActions
{
    public ReportActions() { }

    protected ServiceResponse GetAllReportsAction()
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var list = db.Reports
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new ReportDto
            {
                Id           = r.Id,
                Type         = r.Type,
                Reason       = r.Reason,
                Status       = r.Status,
                ReportedBy   = r.ReportedBy,
                TargetId     = r.TargetId,
                TargetName   = r.TargetName,
                ResolveNote  = r.ResolveNote,
                ResolveAction = r.ResolveAction,
                CreatedAt    = r.CreatedAt
            }).ToList();

        return new ServiceResponse { IsSuccess = true, Data = list };
    }

    protected ServiceResponse GetReportByIdAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var r = db.Reports.Find(id);
        if (r == null)
            return new ServiceResponse { IsSuccess = false, Message = "Report not found" };

        var dto = new ReportDto
        {
            Id            = r.Id,
            Type          = r.Type,
            Reason        = r.Reason,
            Status        = r.Status,
            ReportedBy    = r.ReportedBy,
            TargetId      = r.TargetId,
            TargetName    = r.TargetName,
            ResolveNote   = r.ResolveNote,
            ResolveAction = r.ResolveAction,
            CreatedAt     = r.CreatedAt
        };

        return new ServiceResponse { IsSuccess = true, Data = dto };
    }

    protected ServiceResponse CreateReportAction(ReportCreateDto dto, int userId, string username)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var report = new ReportEntity
        {
            Type              = dto.Type,
            Reason            = dto.Reason,
            Status            = "open",
            ReportedBy        = username,
            TargetId          = dto.TargetId,
            TargetName        = dto.TargetName,
            ReportedByUserId  = userId,
            CreatedAt         = DateTime.UtcNow
        };

        try
        {
            db.Reports.Add(report);
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Create report failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Report submitted" };
    }

    protected ServiceResponse ResolveReportAction(int id, ReportResolveDto dto)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var report = db.Reports.Find(id);
        if (report == null)
            return new ServiceResponse { IsSuccess = false, Message = "Report not found" };

        report.Status        = dto.Status;
        report.ResolveNote   = dto.ResolveNote;
        report.ResolveAction = dto.ResolveAction;

        try
        {
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Resolve report failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = $"Report {dto.Status}" };
    }

    protected ServiceResponse DeleteReportAction(int id)
    {
        using var db = new BookSwapDbContext(DbSession.GetOptions());

        var report = db.Reports.Find(id);
        if (report == null)
            return new ServiceResponse { IsSuccess = false, Message = "Report not found" };

        try
        {
            db.Reports.Remove(report);
            db.SaveChanges();
        }
        catch (Exception)
        {
            return new ServiceResponse { IsSuccess = false, Message = "Delete report failed" };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Report deleted" };
    }
}