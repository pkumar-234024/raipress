using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using rpapi.Core.Modal;

namespace rpapi.Core.Interfaces;
public interface IProductCategoryService
{
  public Task<List<ProductCategory>> GetAllAsync();

  public Task<bool> DeleteAsync(int Id);

  public Task<ProductCategory> CreateAndUpdateAsync(ProductCategory input);

  public Task<ProductCategory> GetByIdAsync(int id);
}
