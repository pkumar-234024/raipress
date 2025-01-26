using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rpapi.Infrastructure.Migrations;

  /// <inheritdoc />
  public partial class Initial : Migration
  {
      /// <inheritdoc />
      protected override void Up(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.CreateTable(
              name: "Contributors",
              columns: table => new
              {
                  Id = table.Column<int>(type: "INTEGER", nullable: false)
                      .Annotation("Sqlite:Autoincrement", true),
                  Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                  Status = table.Column<int>(type: "INTEGER", nullable: false)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Contributors", x => x.Id);
              });

          migrationBuilder.CreateTable(
              name: "ProductCategory",
              columns: table => new
              {
                  Id = table.Column<int>(type: "INTEGER", nullable: false)
                      .Annotation("Sqlite:Autoincrement", true),
                  CategoryName = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                  CategoryDescription = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                  CategoryImage = table.Column<byte[]>(type: "BLOB", maxLength: 255, nullable: false),
                  CreateTime = table.Column<DateTime>(type: "TEXT", nullable: false)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_ProductCategory", x => x.Id);
              });
      }

      /// <inheritdoc />
      protected override void Down(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.DropTable(
              name: "Contributors");

          migrationBuilder.DropTable(
              name: "ProductCategory");
      }
  }
