using System;
using System.ComponentModel.DataAnnotations;
using Ardalis.SharedKernel;

namespace rpapi.Core.Modal;
public class ProductImages : BaseClass, IAggregateRoot
{
  public byte[] ProductsImage { get; set; } = []; // Stores image as a byte array

  [Required]
  public int ProductId { get; set; }
}


