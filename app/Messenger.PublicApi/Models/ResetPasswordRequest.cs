namespace Messenger.PublicApi.Models;

#nullable disable warnings

public class ResetPasswordRequest
{
    public string ResetToken { get; set; }

    public string NewPassword { get; set; }
}
