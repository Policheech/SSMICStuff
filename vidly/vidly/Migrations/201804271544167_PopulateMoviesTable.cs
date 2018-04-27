namespace vidly.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PopulateMoviesTable : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Movies (Name, ReleaseDate, DateAdded, Stock, GenreId)" +
                "VALUES ('Toy Story', 01/02/1994, 04/27/2018, 5, 3)," +
                "       ('Goodfellas', 01/05/1991, 04/27/2018, 10, 1)," +
                "       ('Blade', 02/06/1999, 04/27/2018, 5, 1)," +
                "       ('Jumanji', 03/10/1995, 04/27/2018, 8, 3);");
        }
        
        public override void Down()
        {
        }
    }
}
