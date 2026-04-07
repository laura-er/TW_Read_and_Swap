using BookSwap.Domain.Models.Report;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Interfaces;

public interface IReportLogic
{
    ServiceResponse GetAllReports();
    ServiceResponse GetReportById(int id);
    ServiceResponse CreateReport(ReportCreateDto dto, int userId, string username);
    ServiceResponse ResolveReport(int id, ReportResolveDto dto);
    ServiceResponse DeleteReport(int id);
}