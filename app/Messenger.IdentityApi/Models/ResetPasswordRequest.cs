namespace Messenger.IdentityApi.Models;

public class ResetPasswordRequest
{
    public string ResetToken { get; set; }

    public string NewPassword { get; set; }
}
