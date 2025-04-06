using System.ComponentModel.DataAnnotations;
using Ardalis.SharedKernel;

namespace rpapi.Core.Modal;
public class ProductCategory : BaseClass, IAggregateRoot
{
  [Required]
  [MaxLength(255)]
  public string CategoryName { get; set; } = string.Empty;

  [MaxLength(500)]
  public string CategoryDescription { get; set; } = string.Empty;

  public byte[] CategoryImage { get; set; } = []; // Stores image as a byte array
}
