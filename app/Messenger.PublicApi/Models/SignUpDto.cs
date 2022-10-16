namespace Messenger.PublicApi.Models;

public class SignUpDto
{
    public string Email { get; set; }

    public string Password { get; set; }

    public SignUpDto(string email, string password)
    {
        Email = email;
        Password = password;
    }
}
