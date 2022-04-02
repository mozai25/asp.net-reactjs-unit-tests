using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactBackEnd.Model;

namespace ReactBackEnd.Controllers
{
    [ApiController]
    [Route("{controller}/{action}/{id?}")]
    public class ShopController : Controller
    {
        public List<WeatherForecast>? list;
        
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet]
        public async Task<JsonResult> Categories()
        {
            var category = new Category();
            var categories = await category.GetCategories(String.Empty);

            return Json(categories);
        }

        [HttpGet]
        public async Task<JsonResult> Category(string id)
        {
            var category = new Category();
            var categories = await category.GetCategories(String.Empty);
            var result = categories.Where(C => C.CategoryName.ToLower().Equals(id.ToLower()));

            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> Index()
        {
            var product = new Product();
            var result = await product.GetProducts(String.Empty);

            //var category = new Category();
            //var categories = await category.GetCategories(String.Empty);

            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> Create(Product product)
        {
            if (product != null)
            {
               var result = await product.AddProduct();
                return Json(result); 
            }

            return Json(null);
        }

        public async Task<JsonResult> Delete(int id)
        {   
            var product = new Product();
            var result = await product.DeleteProduct(id.ToString());

            return Json(result);
        }




    }
}
