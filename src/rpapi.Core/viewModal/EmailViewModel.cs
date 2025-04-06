using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.SharedKernel;
using rpapi.Core.Modal;

namespace rpapi.Core.viewModal;
public class EmailViewModel
{
  [Required]
  [EmailAddress]
  public string ToEmail { get; set; } = "example@gmail.com";

  public string Name { get; set; } = string.Empty;
 
  public string Body { get; set; } = string.Empty;
}
