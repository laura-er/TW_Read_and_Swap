using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookSwap.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class RemoveSessionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SessionId",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
