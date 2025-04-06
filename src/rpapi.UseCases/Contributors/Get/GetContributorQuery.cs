using Ardalis.Result;
using Ardalis.SharedKernel;

namespace rpapi.UseCases.Contributors.Get;

public record GetContributorQuery(int ContributorId) : IQuery<Result<ContributorDTO>>;
