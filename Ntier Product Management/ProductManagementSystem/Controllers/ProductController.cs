using ProductManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ProductManagementSystem.Controllers
{
    public class ProductController : Controller
    {
        private ProductManagementSystemContext context = new ProductManagementSystemContext();
        public ActionResult Index()
        {
            return View(context.Product.ToList());
        }

        public ActionResult Create()
        {
            Product product = new Product();
            product.ProductCategoryCollection = context.ProductCategory.OrderByDescending(x => x.Name).ToList();
            product.ProductSubCategoryCollection = context.ProductSubCategory.OrderByDescending(x => x.ModifiedDate).ToList();
            product.ProductModelCollection = context.ProductModel.OrderByDescending(x => x.ModifiedDate).ToList();
            return View(product);
        }

        [HttpPost]
        public ActionResult Create(Product product, int ProductModelId, int ProductCategoryID, int ProductSubCategoryID, HttpPostedFileBase file)
        {
            Photo photo = new Photo();
            photo.rowguid = Guid.NewGuid();
            photo.ModifiedDate = DateTime.Now;
            product.ProductModelId = ProductModelId;
            product.ProductSubCategoryID = ProductSubCategoryID;
            product.rowguid = Guid.NewGuid();
            product.ModifiedDate = DateTime.Now;
            if (ModelState.IsValid)
            {
                photo.Name = file.FileName;
                photo.Image = new byte[file.ContentLength];
                file.InputStream.Read(photo.Image, 0, file.ContentLength);
                context.Photo.Add(photo);
                context.SaveChanges();
                product.PhotoID = photo.PhotoID;
                context.Product.Add(product);
                context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        public PartialViewResult List()
        {
            return PartialView(context.Product.OrderByDescending(x => x.ModifiedDate).ToList());
        }
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var product = context.Product.Find(id);
            product.ProductCategoryCollection = context.ProductCategory.OrderByDescending(x => x.Name).ToList();
            product.ProductSubCategoryCollection = context.ProductSubCategory.OrderByDescending(x => x.ModifiedDate).ToList();
            product.ProductModelCollection = context.ProductModel.OrderByDescending(x => x.ModifiedDate).ToList();
            ViewBag.ProductModelID = product.ProductModelId;
            ViewBag.ProductCategoryID = context.ProductSubCategory.Where(x => x.ProductSubCategoryID == product.ProductSubCategoryID).Select(y => y.ProductCategoryID).FirstOrDefault();
            ViewBag.ProductSubCategoryID = product.ProductSubCategoryID;
            return View(product);
        }

        [HttpPost]

        public ActionResult Edit(Product product, int ProductModelId, int ProductCategoryID, int ProductSubCategoryID, HttpPostedFileBase file)
        {
            product.ProductModelId = ProductModelId;
            product.ProductSubCategoryID = ProductSubCategoryID;
            product.rowguid = Guid.NewGuid();
            product.ModifiedDate = DateTime.Now;
            if (ModelState.IsValid)
            {
                if (file != null)
                {
                    Photo photo = new Photo();
                    photo.rowguid = Guid.NewGuid();
                    photo.ModifiedDate = DateTime.Now;
                    photo.Name = file.FileName;
                    photo.Image = new byte[file.ContentLength];
                    file.InputStream.Read(photo.Image, 0, file.ContentLength);
                    context.Entry(photo).State = EntityState.Modified;
                    context.Photo.Add(photo);
                    context.SaveChanges();
                }
                context.Entry(product).State = EntityState.Modified;
                context.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        public ActionResult Details(int id)
        {
            var product = context.Product.Find(id);
            product.ProductCategoryCollection = context.ProductCategory.OrderByDescending(x => x.Name).ToList();
            product.ProductSubCategoryCollection = context.ProductSubCategory.OrderByDescending(x => x.ModifiedDate).ToList();
            product.ProductModelCollection = context.ProductModel.OrderByDescending(x => x.ModifiedDate).ToList();
            return PartialView(product);
        }

        public ActionResult Delete(int id)
        {
            var product = context.Product.Find(id);
            return PartialView(product);
        }

        [HttpPost]
        public ActionResult Delete(Product product)
        {
            var prodct = context.Product.Find(product.ProductID);
            context.Product.Remove(prodct);
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public FileContentResult GetImage(int id)
        {
            var photo = context.Photo.Find(id);
            return File(photo.Image, photo.Name);

        }

        public JsonResult GetSubCategory(int selectedValue)
        {
            var items = context.ProductSubCategory.Where(x => x.ProductCategoryID == selectedValue).ToList();
            return Json(items, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Search(string name)
        {
            var result = (from p in context.Product
                          where p.Name.ToLower().Contains(name.ToLower())
                          select new { p.Name }).Distinct();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}