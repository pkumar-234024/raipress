using Azure;
using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;

namespace rpapi.Web.ProductImagesApi;

public class Create : Endpoint<ProductImages, ProductImages>
{
  private readonly IProductImageService _productImageService;
  public Create(IProductImageService productImageService)
  {
    _productImageService = productImageService;
  }
  public override void Configure()
  {
    Post("/ProductImage");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ProductImages request, CancellationToken cancellationToken)
  {
    var result = await _productImageService.CreateAsync(request);

      Response = result;
  }
}
