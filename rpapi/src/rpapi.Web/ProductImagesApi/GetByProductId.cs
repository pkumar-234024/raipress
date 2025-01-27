using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.Services;
using rpapi.Core.viewModal;


namespace rpapi.Web.ProductsAPI;

public class GetByProductId : Endpoint<GetCategoryInput, List<ProductImages>>
{
  private readonly IProductImageService _productImagesService;
  public GetByProductId(IProductImageService productImagesService)
  {
    _productImagesService = productImagesService;
  }
  public override void Configure()
  {
    Get("/ProductImage/{Id}");
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetCategoryInput request, CancellationToken cancellationToken)
  {
    var result = await _productImagesService.GetByIdAsync(request.Id);
    Response = result;
  }
}
