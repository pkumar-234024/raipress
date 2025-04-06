using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ardalis.SharedKernel;
using rpapi.Core.Modal;

public class AbpAuditLog : BaseClass, IAggregateRoot
{

  [MaxLength(512)]
  public string? BrowserInfo { get; set; }

  [MaxLength(64)]
  public string? ClientIpAddress { get; set; }

  [MaxLength(128)]
  public string? ClientName { get; set; }

  [MaxLength(2000)]
  public string? CustomData { get; set; }

  [MaxLength(2000)]
  public string? Exception { get; set; }
  public int ExecutionDuration { get; set; }
  public DateTime ExecutionTime { get; set; }

  public int? ImpersonatorTenantId { get; set; }

  public long? ImpersonatorUserId { get; set; }  
  public string? MethodName { get; set; }

  [MaxLength(1024)]
  public string? Parameters { get; set; }

  [MaxLength(256)]
  public string? ServiceName { get; set; }

  public int? TenantId { get; set; }

  public long? UserId { get; set; }

  public string? ReturnValue { get; set; }
}

