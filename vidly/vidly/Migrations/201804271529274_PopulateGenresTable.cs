namespace vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PopulateGenresTable : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Genres (Name)" +
                "VALUES ('Action')," +
                "       ('Comedy')," +
                "       ('Family')," +
                "       ('Romance');");
        }
        
        public override void Down()
        {
        }
    }
}
