using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace IsQandoUp.QandoApi
{
    public class DefaultHttpClient
    {
        public async Task<string> RequestAsync(string url, string postData)
        {
            var handler = new HttpClientHandler();

            if (handler.SupportsAutomaticDecompression)
            {
                handler.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            }

            var client = new HttpClient(handler);
            // client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("text/xml"));

            try
            {
                using (var response = await client.PostAsync(url, new StringContent(postData)).ConfigureAwait(false))
                {
                    response.EnsureSuccessStatusCode();

                    var body = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return body;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.ToString());
            }

            return null;
        }
    }
}
