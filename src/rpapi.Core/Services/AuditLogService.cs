using System;
using Ardalis.SharedKernel;
using rpapi.Core.Interfaces;

namespace rpapi.Core.Services;

public class AuditLogService : IAuditLogService
{

  private readonly IRepository<AbpAuditLog> _repository;

  public AuditLogService(IRepository<AbpAuditLog> repository)
  {
    _repository = repository;
  }

  public async Task LogAsync(AbpAuditLog auditLog)
  {
    var entity = new AbpAuditLog
    {
      BrowserInfo = auditLog.BrowserInfo,
      ClientIpAddress = auditLog.ClientIpAddress,
      ClientName = auditLog.ClientName,
      CustomData = auditLog.CustomData,
      Exception = auditLog.Exception,
      ExecutionDuration = auditLog.ExecutionDuration,
      ExecutionTime = auditLog.ExecutionTime,
      ImpersonatorTenantId = auditLog.ImpersonatorTenantId,
      ImpersonatorUserId = auditLog.ImpersonatorUserId,
      MethodName = auditLog.MethodName,
      Parameters = auditLog.Parameters,
      ServiceName = auditLog.ServiceName,
      TenantId = auditLog.TenantId,
      UserId = auditLog.UserId,
      ReturnValue = auditLog.ReturnValue,
    };

    await _repository.AddAsync(entity);
  }
}
