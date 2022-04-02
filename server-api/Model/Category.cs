using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReactBackEnd.Model
{
    public class Category
    {
        [JsonPropertyName("id")]
        public string CategoryId { get; set; }

        [JsonPropertyName("name")]
        public string CategoryName { get; set; }

        private string GetCategoriesUrl = "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/";

        public Category()
        {

        }

        public async Task<List<Category>> GetCategories(string? id)
        {
            return await Helpers<Category>.GetItems(id, GetCategoriesUrl);
        }


    }
}
