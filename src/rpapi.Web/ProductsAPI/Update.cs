using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;

namespace rpapi.Web.ProductsAPI;

public class Update : Endpoint<Product, Product>
{
  private readonly IProductService _productService;
  public Update(IProductService productService)
  {
    _productService = productService;
  }
  public override void Configure()
  {
    Patch("/Product");
    AllowAnonymous();
  }

  public override async Task HandleAsync(Product request, CancellationToken cancellationToken)
  {
    var result = await _productService.CreateAndUpdateAsync(request);
    Response = result;
  }
}
