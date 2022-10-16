namespace Messenger.PublicApi.Models;

#nullable disable warnings

public class ChangePasswordRequest
{
    public string CurrentPassword { get; set; }

    public string NewPassword { get; set; }
}
