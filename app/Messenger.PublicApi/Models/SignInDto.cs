namespace Messenger.PublicApi.Models;

public class SignInDto
{
    public string Email { get; set; }

    public string Password { get; set; }

    public SignInDto(string email, string password)
    {
        Email = email;
        Password = password;
    }
}
