using rpapi.Core.Modal;

namespace rpapi.Core.Interfaces;
public interface IProductImageService
{
  public Task<bool> DeleteAsync(int Id);

  public Task<ProductImages> CreateAsync(ProductImages input);

  public Task<List<ProductImages>> GetByIdAsync(int id);
}
