using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.SharedKernel;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;

namespace rpapi.Core.Services;
public class ProductCategoryService : IProductCategoryService
{
  private IRepository<ProductCategory> _productCategoryRepository;
  public ProductCategoryService(IRepository<ProductCategory> productCategoryRepository)
  {
    _productCategoryRepository = productCategoryRepository;
  }

  public async Task<ProductCategory> CreateAndUpdateAsync(ProductCategory input)
  {
    try
    {
      if (input.Id == 0)
      {
        var productCategory = await _productCategoryRepository.AddAsync(input);
        return productCategory;
      }
      else
      {
        var productCategory = await _productCategoryRepository.GetByIdAsync(input.Id);
        if (productCategory != null)
        {
          productCategory.CategoryImage = input.CategoryImage;
          productCategory.CategoryName = input.CategoryName;
          productCategory.CategoryDescription = input.CategoryDescription;
          await _productCategoryRepository.UpdateAsync(productCategory);
          return productCategory;
        }

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
      var productCategory = await _productCategoryRepository.GetByIdAsync(Id);
      if (productCategory != null)
      {
        await _productCategoryRepository.DeleteAsync(productCategory);
        return true;
      }
      return false;
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task<List<ProductCategory>> GetAllAsync()
  {
    try
    {
      List<ProductCategory> productCategory = new List<ProductCategory>();
      productCategory = await _productCategoryRepository.ListAsync();
      return productCategory;
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task<ProductCategory> GetByIdAsync(int Id)
  {
    try
    {
      var result = await _productCategoryRepository.GetByIdAsync(Id);
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
