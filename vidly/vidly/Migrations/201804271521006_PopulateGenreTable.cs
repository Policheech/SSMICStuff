namespace vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PopulateGenreTable : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Genres (Id, Name)" +
                "VALUES (1, 'Action')," +
                "       (2, 'Comedy')," +
                "       (3, 'Family')," +
                "       (4, 'Romance');");
        }
        
        public override void Down()
        {
        }
    }
}
