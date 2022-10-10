using System.IO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.IdentityApi.Helpers;

public static class CryptoHelper
{
    public static string Encrypt(string text, string secretKey, string initVector)
    {
        using var desProvider = new DESCryptoServiceProvider();

        var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
        var initVectorBytes = Encoding.UTF8.GetBytes(initVector);
        var encryptor = desProvider.CreateEncryptor(secretKeyBytes, initVectorBytes);

        using var memoryStream = new MemoryStream();
        using var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write);

        var textBytes = Encoding.UTF8.GetBytes(text);
        cryptoStream.Write(textBytes, 0, textBytes.Length);
        cryptoStream.FlushFinalBlock();

        return Convert.ToBase64String(memoryStream.ToArray());
    }
}
