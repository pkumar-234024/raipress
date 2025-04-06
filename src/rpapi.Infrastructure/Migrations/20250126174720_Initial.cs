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
                  Id = table.Column<int>(type: "int", nullable: false)
                      .Annotation("SqlServer:Identity", "1, 1"),
                  Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                  Status = table.Column<int>(type: "int", nullable: false)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Contributors", x => x.Id);
              });

          migrationBuilder.CreateTable(
              name: "Product",
              columns: table => new
              {
                  Id = table.Column<int>(type: "int", nullable: false)
                      .Annotation("SqlServer:Identity", "1, 1"),
                  ProductName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                  ProductsDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                  ProductsImage = table.Column<byte[]>(type: "varbinary(255)", maxLength: 255, nullable: false),
                  ProductCategoryId = table.Column<int>(type: "int", nullable: false),
                  CreateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
              },
              constraints: table =>
              {
                  table.PrimaryKey("PK_Product", x => x.Id);
              });

          migrationBuilder.CreateTable(
              name: "ProductCategory",
              columns: table => new
              {
                  Id = table.Column<int>(type: "int", nullable: false)
                      .Annotation("SqlServer:Identity", "1, 1"),
                  CategoryName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                  CategoryDescription = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                  CategoryImage = table.Column<byte[]>(type: "varbinary(255)", maxLength: 255, nullable: false),
                  CreateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
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
              name: "Product");

          migrationBuilder.DropTable(
              name: "ProductCategory");
      }
  }
