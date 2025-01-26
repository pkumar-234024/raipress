using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.SharedKernel;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;

namespace rpapi.Core.Services;
public class ProductService : IProductService
{
  private IRepository<Product> _productRepository;
  public ProductService(IRepository<Product> productRepository)
  {
    _productRepository = productRepository;
  }

  public async Task<Product> CreateAndUpdateAsync(Product input)
  {
    try
    {
      if (input.Id == 0)
      {
        var product = await _productRepository.AddAsync(input);
        return product;
      }
      else
      {
        var product = await _productRepository.GetByIdAsync(input.Id);
        if (product != null)
        {
          product.ProductsImage = input.ProductsImage;
          product.ProductName = input.ProductName;
          product.ProductsDescription = input.ProductsDescription;
          product.ProductCategoryId = input.ProductCategoryId;
          await _productRepository.UpdateAsync(product);
          return product;
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
      var productCategory = await _productRepository.GetByIdAsync(Id);
      if (productCategory != null)
      {
        await _productRepository.DeleteAsync(productCategory);
        return true;
      }
      return false;
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task<List<Product>> GetAllAsync()
  {
    try
    {
      List<Product> productCategory = new List<Product>();
      productCategory = await _productRepository.ListAsync();
      return productCategory;
    }
    catch (Exception ex)
    {
      throw new Exception(ex.Message);
    }
  }

  public async Task<List<Product>> GetByIdAsync(int ProductCategoryId)
  {
    try
    {
      var result = await _productRepository.ListAsync();
      result =  result.Where(w=>w.ProductCategoryId == ProductCategoryId).ToList();
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
