using Messenger.IdentityApi.Models;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Messenger.IdentityApi.Helpers;

public static class JwtHelper
{
    private const string SEPARATOR = ".";

    public static string Encode<TData>(JwtHeader header, TData data, string secret)
    {
        var payload = EncodeToBase64(header) + SEPARATOR + EncodeToBase64(data);
        return payload + SEPARATOR + GetSignature(payload, secret);
    }

    private static string GetSignature(string data, string secret)
    {
        var secretBytes = Encoding.UTF8.GetBytes(secret);
        using var hmac = new HMACSHA256(secretBytes);
        var dataBytes = Encoding.UTF8.GetBytes(data);
        var hashBytes = hmac.ComputeHash(dataBytes);
        return WebEncoders.Base64UrlEncode(hashBytes);
    }

    private static string EncodeToBase64<TData>(TData data)
    {
        var json = JsonSerializer.Serialize(data);
        var bytes = Encoding.UTF8.GetBytes(json);
        return WebEncoders.Base64UrlEncode(bytes);
    }
}
