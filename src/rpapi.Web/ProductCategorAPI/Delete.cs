using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;

namespace rpapi.Web.ProductCategorAPI;

public class Delete : Endpoint<GetCategoryInput, bool>
{
  private readonly IProductCategoryService _productCategoryService;
  public Delete(IProductCategoryService productCategoryService)
  {
    _productCategoryService = productCategoryService;
  }
  public override void Configure()
  {
    Delete("/ProductCategories/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetCategoryInput request, CancellationToken cancellationToken)
  {
    var result = await _productCategoryService.DeleteAsync(request.Id);
    Response = result;
  }
}
