using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;


namespace rpapi.Web.ProductsAPI;

public class GetByProductCategoryId : Endpoint<GetCategoryInput,List<Product>>
{
  private readonly IProductService _productService;
  public GetByProductCategoryId(IProductService productService)
  {
    _productService = productService;
  }
  public override void Configure()
  {
    Get("/Product/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetCategoryInput request, CancellationToken cancellationToken)
  {
    var result = await _productService.GetByIdAsync(request.Id);
    Response = result;
  }
}
