using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ArtifactDepotApp.BusinessLayer.Caching
{
    public class RedisCacheService:ICacheService
    {
        private readonly IDistributedCache _cache;

        public RedisCacheService(IDistributedCache cache)
        {
            _cache = cache;
        }
        public async Task<T?> GetDataAsync<T>(string key)
        {
            var json = await _cache.GetStringAsync(key);
            if (json is null)
                return default;

            return JsonSerializer.Deserialize<T>(json);
        }
        public Task RemoveDataAsync(string key)
        {
            throw new NotImplementedException();
        }
        public async Task SetDataAsync<T>(string key, T data, TimeSpan timeSpan)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = timeSpan
            };

            var json = JsonSerializer.Serialize(data);
            await _cache.SetStringAsync(key, json, options);
        }
    }
}
