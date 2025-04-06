using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.SharedKernel;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;

namespace rpapi.Core.Services;
public class ProductImagesService : IProductImageService
{
  private IRepository<ProductImages> _productImagesRepository;
  public ProductImagesService(IRepository<ProductImages> productImagesRepository)
  {
    _productImagesRepository = productImagesRepository;
  }

  public async Task<ProductImages> CreateAsync(ProductImages input)
  {
    try
    {
      if (input.Id == 0)
      {
        var product = await _productImagesRepository.AddAsync(input);
        return product;
      }
      
      throw new Exception("Exception error");

    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task<bool> DeleteAsync(int Id)
  {
    try
    {
      var productCategory = await _productImagesRepository.GetByIdAsync(Id);
      if (productCategory != null)
      {
        await _productImagesRepository.DeleteAsync(productCategory);
        return true;
      }
      return false;
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }
  public async Task<List<ProductImages>> GetByIdAsync(int ProductId)
  {
    try
    {
      var result = await _productImagesRepository.ListAsync();
      result = result.Where(w => w.ProductId == ProductId).ToList();
      if (result != null)
      {
        return result;
      }
      throw new Exception("Prodcut not found");
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }
}

