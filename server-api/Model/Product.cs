using System.Collections.Specialized;
using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReactBackEnd.Model
{
    public class Product
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        
        [JsonPropertyName("avatar")]
        public string Avatar { get; set; }
        
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("price"), JsonConverter(typeof(ConverterNumberToDecimal))]
        public decimal Price { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("id"), JsonConverter(typeof(ConverterNumberToInt))] 
        public int ProductId { get; set; }

        private string GetProductsUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";
        private string DeleteProductUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/";
        private string PostUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products";

        public Product()
        {

        }

        public async Task<List<Product>> GetProducts(string? id)
        {
            return await Helpers<Product>.GetItems(id, GetProductsUrl);
        }

        public async Task<Product?> DeleteProduct(string id)
        {
            var result = await Helpers<Product>.DeleteItem(id, DeleteProductUrl);
            if (result != null)
            {
                return result;
            }

            return null;
        }

        public async Task<Product?> AddProduct()
        {
            var result = await Helpers<Product>.AddItem(this, PostUrl);
            if (result != null)
            {
                return result;
            }

            return null;
        }

    }
   
}
