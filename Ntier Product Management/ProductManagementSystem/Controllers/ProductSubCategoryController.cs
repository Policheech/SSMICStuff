using ProductManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace ProductManagementSystem.Controllers
{
    public class ProductSubCategoryController : Controller
    {
        private ProductManagementSystemContext context = new ProductManagementSystemContext();

        public ActionResult Index()
        {
            ProductSubCategory category = new ProductSubCategory();
            category.ProductSubCategoryCollection = context.ProductSubCategory.OrderByDescending(x => x.ModifiedDate).ToList();
            category.ProductCategoryCollection = context.ProductCategory.ToList();
            return View(category);
        }


        [HttpPost]
        public ActionResult Create(ProductSubCategory subcategory, int ProductCategoryID)
        {
            var category = context.ProductCategory.Find(ProductCategoryID);
            subcategory.CategoryName = category.Name;
            subcategory.ProductCategoryID = ProductCategoryID;
            subcategory.rowguid = Guid.NewGuid();
            subcategory.ModifiedDate = DateTime.Now;
            context.ProductSubCategory.Add(subcategory);
            context.SaveChanges();
            return RedirectToAction("List");
        }
        public PartialViewResult List()
        {
            return PartialView(context.ProductSubCategory.OrderByDescending(x => x.ModifiedDate).ToList());
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var category = context.ProductSubCategory.Find(id);
            return PartialView(category);
        }

        [HttpPost]
        public ActionResult Edit(ProductSubCategory category)
        {
            category.ModifiedDate = DateTime.Now;
            context.Entry(category).State = EntityState.Modified;
            context.SaveChanges();
            return RedirectToAction("List");
        }
        public ActionResult Details(int id)
        {
            var category = context.ProductSubCategory.Find(id);
            return PartialView(category);
        }
        public ActionResult Delete(int id)
        {
            var category = context.ProductSubCategory.Find(id);
            return PartialView(category);
        }

        [HttpPost]
        public ActionResult Delete(ProductSubCategory category)
        {
            var catgory = context.ProductSubCategory.Find(category.ProductSubCategoryID);
            context.ProductSubCategory.Remove(catgory);
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public PartialViewResult Search(string id)
        {
            var result = context.ProductSubCategory.Where(x => x.Name == id).ToList();
            return PartialView("List", result);
        }

        public JsonResult IsDuplicate(string name)
        {
            var isexists = context.ProductSubCategory.Where(x => x.Name == name).Select(y => y.Name).FirstOrDefault();
            if (string.IsNullOrEmpty(isexists))
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult CheckDuplicate(string name)
        {
            var item = context.ProductSubCategory.Where(x => x.Name == name).Select(y => y.Name).FirstOrDefault();

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