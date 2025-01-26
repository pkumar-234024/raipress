using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;


namespace rpapi.Web.ProductCategorAPI;

public class GetById : Endpoint<GetCategoryInput,ProductCategory>
{
  private readonly IProductCategoryService _productCategoryService;
  public GetById(IProductCategoryService productCategoryService)
  {
    _productCategoryService = productCategoryService;
  }
  public override void Configure()
  {
    Get("/ProductCategories/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetCategoryInput request, CancellationToken cancellationToken)
  {
    var result = await _productCategoryService.GetByIdAsync(request.Id);
    Response = result;
  }
}
