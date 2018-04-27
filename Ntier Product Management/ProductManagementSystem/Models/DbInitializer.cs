using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ProductManagementSystem.Models
{
    public class DbInitializer : DropCreateDatabaseAlways<ProductManagementSystemContext>
    {
        protected override void Seed(ProductManagementSystemContext context)
        {
            base.Seed(context);
            var model = new ProductCategory { Name = "Bikes", rowguid = Guid.NewGuid(), ModifiedDate = DateTime.Now };
            context.ProductCategory.Add(model);
            context.SaveChanges();
        }
    }
}