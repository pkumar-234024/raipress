using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;

namespace rpapi.Web.ProductImagesApi;

public class Delete : Endpoint<GetCategoryInput, bool>
{
  private readonly IProductImageService _productImageService;
  public Delete(IProductImageService productImageService)
  {
    _productImageService = productImageService;
  }
  public override void Configure()
  {
    Delete("/ProductImage/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetCategoryInput request, CancellationToken cancellationToken)
  {
    var result = await _productImageService.DeleteAsync(request.Id);
    Response = result;
  }
}
