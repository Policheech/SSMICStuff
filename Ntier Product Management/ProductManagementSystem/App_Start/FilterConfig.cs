﻿using ProductManagementSystem.Attributes;
using System.Web;
using System.Web.Mvc;

namespace ProductManagementSystem
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new CustomExceptionHandler());
        }
    }
}