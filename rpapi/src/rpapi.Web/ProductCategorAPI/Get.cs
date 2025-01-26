using Azure;
using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.UseCases.Contributors.List;
using rpapi.Web.ContributorEndpoints;
using rpapi.Web.Endpoints.ContributorEndpoints;

namespace rpapi.Web.ProductCategorAPI;

public class Get : EndpointWithoutRequest<List<ProductCategory>>
{
  private readonly IProductCategoryService _productCategoryService;
  public Get(IProductCategoryService productCategoryService)
  {
    _productCategoryService = productCategoryService;
  }
  public override void Configure()
  {
    Get("/ProductCategories");
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken cancellationToken)
  {
    var result = await _productCategoryService.GetAllAsync();
    if (result.Count>0)
    {
      Response = result;
    }
  }
}
