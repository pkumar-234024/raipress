using Azure;
using FastEndpoints;
using rpapi.Core.Interfaces;
using rpapi.Core.Modal;
using rpapi.Core.viewModal;
using rpapi.UseCases.Contributors.List;
using rpapi.Web.ContributorEndpoints;
using rpapi.Web.Endpoints.ContributorEndpoints;


namespace rpapi.Web.EmailAPI;

public class Create : Endpoint<EmailViewModel,string>
{
  private readonly IProductCategoryService _productCategoryService;
  private readonly IEmailSender _emailSender;
  public Create(IProductCategoryService productCategoryService, IEmailSender emailSender)
  {
    _productCategoryService = productCategoryService;
    _emailSender = emailSender;
  }
  public override void Configure()
  {
    Post("/EmailSender");
    AllowAnonymous();
  }

  public override async Task HandleAsync(EmailViewModel req,CancellationToken cancellationToken)
  {

    try
    {
      await _emailSender.SendEmailAsync(req.ToEmail, req.ToEmail, "Regarding Contact!", req.Body, req.Name);
      await SendAsync("success", cancellation: cancellationToken);
    }
    catch (Exception ex)
    {
      AddError(ex.Message);
      ThrowIfAnyErrors();
    }
  }
}
