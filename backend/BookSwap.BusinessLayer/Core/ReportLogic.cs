using BookSwap.BusinessLayer.Interfaces;
using BookSwap.BusinessLayer.Structure;
using BookSwap.Domain.Models.Report;
using BookSwap.Domain.Models.Service;

namespace BookSwap.BusinessLayer.Core;

public class ReportLogic : ReportActions, IReportLogic
{
    public ServiceResponse GetAllReports() => GetAllReportsAction();
    public ServiceResponse GetReportById(int id) => GetReportByIdAction(id);
    public ServiceResponse CreateReport(ReportCreateDto dto, int userId, string username) => CreateReportAction(dto, userId, username);
    public ServiceResponse ResolveReport(int id, ReportResolveDto dto) => ResolveReportAction(id, dto);
    public ServiceResponse DeleteReport(int id) => DeleteReportAction(id);
}