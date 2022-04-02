using System.Text.Json;
using System.Text.Json.Serialization;

namespace ReactBackEnd.Model
{
    public class ConverterNumberToInt : JsonConverter<int>
    {
        public override int Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            using (var jsonDoc = JsonDocument.ParseValue(ref reader))
            {
                var d = jsonDoc.RootElement.ToString();
                if (int.TryParse(d, out int num))
                {
                    return num;
                }
                
                return 0;
            }
        }

        public override void Write(Utf8JsonWriter writer, int value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
