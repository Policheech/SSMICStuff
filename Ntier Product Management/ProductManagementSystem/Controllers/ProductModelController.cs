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
    public class ProductModelController : Controller
    {
        private ProductManagementSystemContext context = new ProductManagementSystemContext();

        public ActionResult Index()
        {
            ProductModel model = new ProductModel();
            model.ProductModelCollection = context.ProductModel.OrderByDescending(x => x.ModifiedDate).ToList();
            return View(model);
        }

        [HttpPost]
        public ActionResult Create(ProductModel model)
        {
            if (ModelState.IsValid)
            {
                model.rowguid = Guid.NewGuid();
                model.ModifiedDate = DateTime.Now;
                context.ProductModel.Add(model);
                context.SaveChanges();
            }
            return RedirectToAction("List");
        }

        public PartialViewResult List()
        {
            return PartialView(context.ProductModel.OrderByDescending(x => x.ModifiedDate).ToList());
        }


        [HttpGet]
        public ActionResult Edit(int id)
        {
            var model = context.ProductModel.Find(id);
            return PartialView(model);
        }

        [HttpPost]
        public ActionResult Edit(ProductModel model)
        {
            model.ModifiedDate = DateTime.Now;
            context.Entry(model).State = EntityState.Modified;
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public ActionResult Details(int id)
        {
            var model = context.ProductModel.Find(id);
            return PartialView(model);
        }

        public ActionResult Delete(int id)
        {
            var model = context.ProductModel.Find(id);
            return PartialView(model);
        }


        [HttpPost]
        public ActionResult Delete(ProductModel model)
        {
            var Model = context.ProductModel.Find(model.ProductModelId);
            context.ProductModel.Remove(Model);
            context.SaveChanges();
            return RedirectToAction("List");
        }

        public PartialViewResult Search(string id)
        {
            var result = context.ProductModel.Where(x => x.Name == id).ToList();
            return PartialView("List", result);
        }

        public JsonResult CheckDuplicate(string name)
        {
            var item = context.ProductModel.Where(x => x.Name == name).Select(y => y.Name).FirstOrDefault();

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