namespace Messenger.PublicApi.Models;

public class ResetPasswordDto
{
    public Guid UserId { get; set; }

    public string ResetToken { get; set; }

    public string NewPassword { get; set; }

    public ResetPasswordDto(Guid userId, string resetToken, string newPassword)
    {
        UserId = userId;
        ResetToken = resetToken;
        NewPassword = newPassword;
    }
}
