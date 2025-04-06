using rpapi.Web.ContributorEndpoints;

namespace rpapi.Web.Endpoints.ContributorEndpoints;

public class ContributorListResponse
{
  public List<ContributorRecord> Contributors { get; set; } = new();
}
