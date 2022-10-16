namespace Messenger.PublicApi.Models;

public class ChangePasswordDto
{
    public Guid UserId { get; set; }

    public string CurrentPassword { get; set; }

    public string NewPassword { get; set; }

    public ChangePasswordDto(Guid userId, string currentPassword, string newPassword)
    {
        UserId = userId;
        CurrentPassword = currentPassword;
        NewPassword = newPassword;
    }
}
