namespace Vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBirthdayToCustomer1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Customers", "Birthdate");
            AddColumn("dbo.Customers", "Birthdate", c => c.DateTime(nullable: true));
        }
        
        public override void Down()
        {
        }
    }
}
