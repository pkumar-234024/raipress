﻿using Ardalis.GuardClauses;
using Ardalis.ListStartupServices;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using rpapi.Core;
using rpapi.Infrastructure;
using rpapi.Infrastructure.Data;
using FastEndpoints;
using FastEndpoints.Swagger;
using Serilog;
using rpapi.Core.CustomMiddleware;
using rpapi.Core.Interfaces;
using rpapi.Core.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.UseSerilog((_, config) => config.ReadFrom.Configuration(builder.Configuration));

builder.Services.Configure<CookiePolicyOptions>(options =>
{
  options.CheckConsentNeeded = context => true;
  options.MinimumSameSitePolicy = SameSiteMode.None;
});

string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Guard.Against.Null(connectionString);
builder.Services.AddApplicationDbContext(connectionString);

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll", builder =>
  {
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
  });
});

builder.Services.AddFastEndpoints();
builder.Services.SwaggerDocument(o =>
{
  o.ShortSchemaNames = true;
});

// add list services for diagnostic purposes - see https://github.com/ardalis/AspNetCoreStartupServices
builder.Services.Configure<ServiceConfig>(config =>
{
  config.Services = new List<ServiceDescriptor>(builder.Services);

  // optional - default path to view services is /listallservices - recommended to choose your own path
  config.Path = "/listservices";
});

builder.Services.AddScoped<IAuditLogService, AuditLogService>();
builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
{
  containerBuilder.RegisterModule(new DefaultCoreModule());
  containerBuilder.RegisterModule(new AutofacInfrastructureModule(builder.Environment.IsDevelopment()));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
  app.UseShowAllServicesMiddleware(); // see https://github.com/ardalis/AspNetCoreStartupServices
}
else
{
  app.UseDefaultExceptionHandler(); // from FastEndpoints
  app.UseHsts();
}
app.UseCors("AllowAll");
//app.UseMiddleware<RequestLoggingMiddleware>();
app.UseFastEndpoints();
app.UseSwaggerGen(); // FastEndpoints middleware

app.UseHttpsRedirection();

SeedDatabase(app);

app.Run();

static void SeedDatabase(WebApplication app)
{
  using var scope = app.Services.CreateScope();
  var services = scope.ServiceProvider;

  try
  {
    var context = services.GetRequiredService<AppDbContext>();
    //                    context.Database.Migrate();
    context.Database.EnsureCreated();
    SeedData.Initialize(services);
  }
  catch (Exception ex)
  {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred seeding the DB. {exceptionMessage}", ex.Message);
  }
}

// Make the implicit Program.cs class public, so integration tests can reference the correct assembly for host building
public partial class Program
{
}
