using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;

namespace ProxyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProxyController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ProxyController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateContent([FromBody] object body)
        {
            //request - {"prompt": "List 3 benefits of regular exercise."}
        var jsonBody = body?.ToString();
            using var doc = JsonDocument.Parse(jsonBody);

            if (!doc.RootElement.TryGetProperty("prompt", out var promptElement))
                return BadRequest("Missing 'prompt' in request.");
            var prompt = promptElement.GetString();

            var requestPayload = new
            {
                contents = new[]
            {
                new
                {
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
                }
            };

            var apiKey = "";  // Replace with your Google API key

            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}";
            var requestJson = JsonSerializer.Serialize(requestPayload);
            var content = new StringContent(requestJson, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);
            var responseString = await response.Content.ReadAsStringAsync();
            using var responseDoc = JsonDocument.Parse(responseString);
            var generatedText = responseDoc.RootElement
          .GetProperty("candidates")[0]
          .GetProperty("content")
          .GetProperty("parts")[0]
          .GetProperty("text")
          .GetString();

            //{"response": {}
            return Ok(new { response = generatedText });
        }
    }
}
