using Messenger.IdentityApi.Models;
using System.Text;
using System.Text.Json;

namespace Messenger.IdentityApi.Helpers;

public static class JwtHelper
{
    public static string Encrypt<TPayload>(JwtHeader header, TPayload payload)
    {
        var json = JsonSerializer.Serialize(header);
        var bytes = Encoding.UTF8.GetBytes(json);
        return Convert.ToBase64String(bytes);
    }
}
