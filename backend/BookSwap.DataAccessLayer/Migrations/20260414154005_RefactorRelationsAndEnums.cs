using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookSwap.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class RefactorRelationsAndEnums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Users_OwnerId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Users_ReporterId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Books_BookOfferedId",
                table: "SwapRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Books_BookRequestedId",
                table: "SwapRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Users_OwnerId",
                table: "SwapRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Users_RequesterId",
                table: "SwapRequests");

            migrationBuilder.DropIndex(
                name: "IX_Reports_ReporterId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReportedBy",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReporterId",
                table: "Reports");

            migrationBuilder.Sql(
                "ALTER TABLE \"SwapRequests\" ALTER COLUMN \"Status\" TYPE integer USING \"Status\"::integer");

            migrationBuilder.Sql(
                "ALTER TABLE \"Reports\" ALTER COLUMN \"Status\" TYPE integer USING \"Status\"::integer");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportedByUserId",
                table: "Reports",
                column: "ReportedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Users_OwnerId",
                table: "Books",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Users_ReportedByUserId",
                table: "Reports",
                column: "ReportedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Books_BookOfferedId",
                table: "SwapRequests",
                column: "BookOfferedId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Books_BookRequestedId",
                table: "SwapRequests",
                column: "BookRequestedId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Users_OwnerId",
                table: "SwapRequests",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Users_RequesterId",
                table: "SwapRequests",
                column: "RequesterId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Users_OwnerId",
                table: "Books");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Users_ReportedByUserId",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Books_BookOfferedId",
                table: "SwapRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Books_BookRequestedId",
                table: "SwapRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Users_OwnerId",
                table: "SwapRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_SwapRequests_Users_RequesterId",
                table: "SwapRequests");

            migrationBuilder.DropIndex(
                name: "IX_Reports_ReportedByUserId",
                table: "Reports");

            migrationBuilder.Sql(
                "ALTER TABLE \"SwapRequests\" ALTER COLUMN \"Status\" TYPE text USING \"Status\"::text");

            migrationBuilder.Sql(
                "ALTER TABLE \"Reports\" ALTER COLUMN \"Status\" TYPE character varying(20) USING \"Status\"::text");

            migrationBuilder.AddColumn<string>(
                name: "ReportedBy",
                table: "Reports",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ReporterId",
                table: "Reports",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReporterId",
                table: "Reports",
                column: "ReporterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Users_OwnerId",
                table: "Books",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Users_ReporterId",
                table: "Reports",
                column: "ReporterId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Books_BookOfferedId",
                table: "SwapRequests",
                column: "BookOfferedId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Books_BookRequestedId",
                table: "SwapRequests",
                column: "BookRequestedId",
                principalTable: "Books",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Users_OwnerId",
                table: "SwapRequests",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SwapRequests_Users_RequesterId",
                table: "SwapRequests",
                column: "RequesterId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

