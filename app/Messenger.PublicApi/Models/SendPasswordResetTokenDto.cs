namespace Messenger.PublicApi.Models;

public class SendPasswordResetTokenDto
{
    public string Email { get; set; }

    public SendPasswordResetTokenDto(string email)
    {
        Email = email;
    }
}
