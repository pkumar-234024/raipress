using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace rpapi.Core.Interfaces;
public interface IAuditLogService
{
  Task LogAsync(AbpAuditLog auditLog);
}
