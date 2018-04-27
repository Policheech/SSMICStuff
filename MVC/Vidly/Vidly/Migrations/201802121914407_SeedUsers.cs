namespace Vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SeedUsers : DbMigration
    {
        public override void Up()
        {
            Sql(@"
INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'8f55ba22-9f2d-4897-a4db-2157afe96eef', N'guest@vidly.com', 0, N'AAFg6ZrE5sVvvIm4IHkgNyAuIGOPmqQMejDG8FLwkeHINNuIA77ygx5zkefwui9pRg==', N'c80a4e53-bcff-46d6-ad3b-a632db3bde9f', NULL, 0, 0, NULL, 1, 0, N'guest@vidly.com')
INSERT INTO [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'f9b01ed9-c9c3-4f80-90a0-cdc37f5fa6bf', N'admin@vidly.com', 0, N'ABO7EOPCX7KW9Nhud7ntI78ohx6wQtQr9kn7vCeyDP/NEeDU1dIe3RVd+/tzKqo4xA==', N'a49860c0-46ce-4f7f-bbb0-a6fb347f7373', NULL, 0, 0, NULL, 1, 0, N'admin@vidly.com')
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'80d5d3b9-d1a2-41e2-9c24-cdcea5b745b8', N'CanManageMovies')
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f9b01ed9-c9c3-4f80-90a0-cdc37f5fa6bf', N'80d5d3b9-d1a2-41e2-9c24-cdcea5b745b8')

");
        }
        
        public override void Down()
        {
        }
    }
}
