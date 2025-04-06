﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rpapi.Infrastructure.Migrations;

  /// <inheritdoc />
  public partial class TableAddedLogs : Migration
  {
      /// <inheritdoc />
      protected override void Up(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.CreateTable(
              name: "AbpAuditLog",
              columns: table => new
              {
                  Id = table.Column<int>(type: "int", nullable: false)
                      .Annotation("SqlServer:Identity", "1, 1"),
                  BrowserInfo = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: true),
                  ClientIpAddress = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                  ClientName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                  CustomData = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                  Exception = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                  ExecutionDuration = table.Column<int>(type: "int", nullable: false),
                  ExecutionTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                  ImpersonatorTenantId = table.Column<int>(type: "int", nullable: true),
                  ImpersonatorUserId = table.Column<long>(type: "bigint", nullable: true),
                  MethodName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                  Parameters = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                  ServiceName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                  TenantId = table.Column<int>(type: "int", nullable: true),
                  UserId = table.Column<long>(type: "bigint", nullable: true),
                  ReturnValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                  CreateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_AbpAuditLog", x => x.Id);
              });
      }

      /// <inheritdoc />
      protected override void Down(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.DropTable(
              name: "AbpAuditLog");
      }
  }
