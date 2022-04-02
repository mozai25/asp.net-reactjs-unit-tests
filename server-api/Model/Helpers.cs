using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReactBackEnd.Model
{
    public class Helpers<T>
    {   
        public static async Task<string> tryGET(string URL)
        {
            string ResponseText = String.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    ResponseText = await client.GetStringAsync(URL);
                }
                catch (HttpRequestException ex)
                {
                    ResponseText = ex.Message;
                }
            }
            return ResponseText;
        }

        public static async Task<List<T>> GetItems(string? id, string url)
        {
            List<T> list = new List<T>();
            var response = await tryGET(url);
            JsonSerializerOptions options = new(JsonSerializerDefaults.Web) { WriteIndented = true };

            try
            {
                var jsonObj = JsonSerializer.Deserialize<List<T>>(response, options);
                if (jsonObj != null) list = jsonObj;
            }
            catch (JsonException ex)
            {
                Console.Write(ex.Message);
            }

            return list;
        }

        public static async Task<T?> AddItem(T item, string url)
        {
            JsonSerializerOptions options = new(JsonSerializerDefaults.Web) { WriteIndented = true };
            var json = JsonSerializer.Serialize<T>(item, options);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            using (HttpClient client = new HttpClient())
            {
                var response = await client.PostAsync(url, data);
                if (response != null)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<T>(result, options);
                }
            }

            return default(T);
        }

        public static async Task<T?> DeleteItem(string id, string url)
        {
            JsonSerializerOptions options = new(JsonSerializerDefaults.Web) { WriteIndented = true };
            String u = new StringBuilder(url).Append(id).ToString();
            using (HttpClient client = new HttpClient())
            {
                var response = await client.DeleteAsync(u);
                if (response != null)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<T>(result, options);
                }
            }

            return default(T);
        }

    }
}
