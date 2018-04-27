using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProductManagementSystem.Models
{
    public class ProductManagementSystemContext : DbContext
    {
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductCategory> ProductCategory { get; set; }

        public DbSet<ProductSubCategory> ProductSubCategory { get; set; }

        public DbSet<ProductModel> ProductModel { get; set; }

        public DbSet<Photo> Photo { get; set; }
    }
}