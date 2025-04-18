﻿using Azure;
using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;

namespace rpapi.Web.ProductCategorAPI;

public class Create : Endpoint<ProductCategory, ProductCategory>
{
  private readonly IProductCategoryService _productCategoryService;
  public Create(IProductCategoryService productCategoryService)
  {
    _productCategoryService = productCategoryService;
  }
  public override void Configure()
  {
    Post("/ProductCategories");
    AllowAnonymous();
  }

  public override async Task HandleAsync(ProductCategory request, CancellationToken cancellationToken)
  {
    var result = await _productCategoryService.CreateAndUpdateAsync(request);

      Response = result;
  }
}
