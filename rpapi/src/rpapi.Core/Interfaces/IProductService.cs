using rpapi.Core.Modal;

namespace rpapi.Core.Interfaces;
public interface IProductService
{
  public Task<List<Product>> GetAllAsync();

  public Task<bool> DeleteAsync(int Id);

  public Task<Product> CreateAndUpdateAsync(Product input);

  public Task<List<Product>> GetByIdAsync(int id);
}
