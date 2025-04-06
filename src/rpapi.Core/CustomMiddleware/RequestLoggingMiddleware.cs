using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using rpapi.Core.Interfaces;

namespace rpapi.Core.CustomMiddleware;
public class RequestLoggingMiddleware
{
  private readonly RequestDelegate _next;
  private readonly IAuditLogService _auditLogService;

  public RequestLoggingMiddleware(RequestDelegate next, IAuditLogService auditLogService)
  {
    _next = next;
    _auditLogService = auditLogService;
  }

  public async Task Invoke(HttpContext context)
  {
    var startTime = DateTime.UtcNow;
    var request = context.Request;
    var response = context.Response;

    var auditLog = new AbpAuditLog();
    auditLog.ExecutionTime = startTime;
    auditLog.ClientIpAddress = context.Connection.RemoteIpAddress?.ToString();
    auditLog.BrowserInfo = context.Request.Headers["User-Agent"].ToString();
    auditLog.ClientName = context.Request.Host.Value;
    auditLog.MethodName = request.Method;
    auditLog.Parameters = await ReadRequestBodyAsync(request);
    auditLog.ServiceName = request.Path;
    auditLog.TenantId = GetTenantIdFromContext(context);
    auditLog.UserId = GetUserIdFromContext(context);

    try
    {
      await _next(context);

      auditLog.ExecutionDuration = (int)(DateTime.UtcNow - startTime).TotalMilliseconds;
    }
    catch (Exception ex)
    {
      auditLog.Exception = ex.ToString();
      throw;
    }
    finally
    {
      await _auditLogService.LogAsync(auditLog);
    }
  }

  private async Task<string> ReadRequestBodyAsync(HttpRequest request)
  {
    //request.EnableBuffering();
    using var reader = new StreamReader(request.Body, leaveOpen: true);
    var body = await reader.ReadToEndAsync();
    if(body != "")
    {
      request.Body.Position = 0;
    }

    
    return body;
  }

  private int? GetTenantIdFromContext(HttpContext context)
  {
    // Logic to extract TenantId, if applicable
    return null;
  }

  private long? GetUserIdFromContext(HttpContext context)
  {
    // Logic to extract UserId, if applicable
    return null;
  }
}
