using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;

namespace rpapi.Web.ProductsAPI;

public class Delete : Endpoint<GetCategoryInput, bool>
{
  private readonly IProductService _productService;
  public Delete(IProductService productService)
  {
    _productService = productService;
  }
  public override void Configure()
  {
    Delete("/Product/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetCategoryInput request, CancellationToken cancellationToken)
  {
    var result = await _productService.DeleteAsync(request.Id);
    Response = result;
  }
}
