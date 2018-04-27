using ProductManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProductManagementSystem.Controllers
{
    public class ProductCategoryController : Controller
    {
        private ProductManagementSystemContext context = new ProductManagementSystemContext();
        public ActionResult Index()
        {
            ProductCategory category = new ProductCategory();
            category.ProductCategoryCollection = context.ProductCategory.OrderByDescending(x => x.ModifiedDate).ToList();
            return View(category);
        }

        [HttpPost]
        public ActionResult Create(ProductCategory category)
        {
            category.rowguid = Guid.NewGuid();
            category.ModifiedDate = DateTime.Now;
            context.ProductCategory.Add(category);
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public PartialViewResult List()
        {
            return PartialView(context.ProductCategory.OrderByDescending(x => x.ModifiedDate).ToList());
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var category = context.ProductCategory.Find(id);
            return PartialView(category);
        }

        [HttpPost]
        public ActionResult Edit(ProductCategory category)
        {
            category.ModifiedDate = DateTime.Now;
            context.Entry(category).State = EntityState.Modified;
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public ActionResult Details(int id)
        {
            var catgory = context.ProductCategory.Find(id);
            return PartialView(catgory);
        }

        public ActionResult Delete(int id)
        {
            var catgory = context.ProductCategory.Find(id);
            return PartialView(catgory);
        }

        [HttpPost]
        public ActionResult Delete(ProductCategory category)
        {
            var catgory = context.ProductCategory.Find(category.ProductCategoryID);
            context.ProductCategory.Remove(catgory);
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public PartialViewResult Search(string id)
        {
            var result = context.ProductCategory.Where(x => x.Name == id).ToList();
            return PartialView("List", result);
        }

        public JsonResult CheckDuplicate(string name)
        {
            var item = context.ProductCategory.Where(x => x.Name == name).Select(y => y.Name).FirstOrDefault();

            if (string.IsNullOrEmpty(item)) //test if the value of SourceDirectory is valid
            {
                return Json(true, JsonRequestBehavior.AllowGet); // indicates its valid
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet); // indicates its not valid
            }
        }
    }
}