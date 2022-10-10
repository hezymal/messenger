namespace Messenger.IdentityApi.Models;

public class JwtHeader
{
    public string Algorithm { get; set; }

    public JwtHeader(string algorithm)
    {
        Algorithm = algorithm;
    }
}
