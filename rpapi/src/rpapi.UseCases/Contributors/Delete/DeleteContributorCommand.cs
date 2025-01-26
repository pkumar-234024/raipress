using Ardalis.Result;
using Ardalis.SharedKernel;

namespace rpapi.UseCases.Contributors.Delete;

public record DeleteContributorCommand(int ContributorId) : ICommand<Result>;
