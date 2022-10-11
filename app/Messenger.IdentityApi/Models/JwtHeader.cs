namespace Messenger.IdentityApi.Models;

public class JwtHeader
{
    public const string ALGORITHM_HS256 = "HS256";

    public string alg { get; set; }

    public JwtHeader(string alg = ALGORITHM_HS256)
    {
        this.alg = alg;
    }
}
