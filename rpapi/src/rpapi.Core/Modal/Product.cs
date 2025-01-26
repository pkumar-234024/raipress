using System.ComponentModel.DataAnnotations;
using Ardalis.SharedKernel;

namespace rpapi.Core.Modal;
public class Product : BaseClass, IAggregateRoot
{
  [Required]
  [MaxLength(255)]
  public string ProductName { get; set; } = string.Empty;

  [MaxLength(500)]
  public string ProductsDescription { get; set; } = string.Empty;

  public byte[] ProductsImage { get; set; } = []; // Stores image as a byte array

  [Required]
  public int ProductCategoryId { get; set; }
}

