namespace vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addCustomerBirthdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Customers", "dateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Customers", "dateTime");
        }
    }
}
