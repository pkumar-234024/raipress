using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace rpapi.Infrastructure.Migrations;

  /// <inheritdoc />
  public partial class Third : Migration
  {
      /// <inheritdoc />
      protected override void Up(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.AlterColumn<byte[]>(
              name: "ProductsImage",
              table: "Product",
              type: "varbinary(max)",
              nullable: false,
              oldClrType: typeof(byte[]),
              oldType: "varbinary(255)",
              oldMaxLength: 255);
      }

      /// <inheritdoc />
      protected override void Down(MigrationBuilder migrationBuilder)
      {
          migrationBuilder.AlterColumn<byte[]>(
              name: "ProductsImage",
              table: "Product",
              type: "varbinary(255)",
              maxLength: 255,
              nullable: false,
              oldClrType: typeof(byte[]),
              oldType: "varbinary(max)");
      }
  }
