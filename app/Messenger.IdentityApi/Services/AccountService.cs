using Messenger.IdentityApi.Database;
using Messenger.IdentityApi.Domains;
using Messenger.IdentityApi.Exceptions;
using Messenger.IdentityApi.Helpers;
using Messenger.IdentityApi.Models;
using Microsoft.EntityFrameworkCore;

namespace Messenger.IdentityApi.Services;

public class AccountService
{
    private readonly IdentityDbContext dbContext;

    private readonly EmailService emailService;

    private readonly UserService userService;

    public AccountService(
        IdentityDbContext dbContext,
        EmailService emailService,
        UserService userService)
    {
        this.dbContext = dbContext;
        this.emailService = emailService;
        this.userService = userService;
    }

    public async Task Registry(string email, string password)
    {
        var user = new User { Email = email };
        var userId = await userService.AddUser(user);
        var userPassword = new UserPassword
        {
            UserId = userId,
            Hash = EncryptPassword(password),
        };
        await userService.AddUserPassword(userPassword);
    }

    public async Task<string> Login(string email, string password)
    {
        var user = await userService.GetUserByEmail(email);
        if (user == null)
        {
            throw IdentityException.InvalidEmailOrPassword();
        }

        var userPassword = await userService.GetUserPasswordById(user.Id);
        if (EncryptPassword(password) != userPassword.Hash)
        {
            throw IdentityException.InvalidEmailOrPassword();
        }

        return GenerateToken();
    }

    public async Task SendPasswordResetToken(string email)
    {
        var user = await userService.GetUserByEmail(email);
        if (user == null)
        {
            throw IdentityException.InvalidEmail();
        }

        var resetToken = GenerateToken();
        var endDate = DateTime.UtcNow.AddDays(3); // TODO: move 3 days to appsettings.json
        await userService.SetPasswordResetToken(user.Id, resetToken, endDate);

        var emailMessage = new EmailMessage(email, "Password reset link", "Password reset link: ");
        await emailService.SendMessage(emailMessage);
    }

    public async Task ResetPassword(Guid userId, string resetToken, string newPassword)
    {
        var userPassword = await userService.GetUserPasswordById(userId);
        if (userPassword.ResetTokenExpirationDate < DateTime.UtcNow)
        {
            throw IdentityException.TokenExpired();
        }

        if (resetToken != userPassword.ResetToken)
        {
            throw IdentityException.InvalidToken();
        }

        dbContext.UseTransaction(async () =>
        {
            await userService.SetPassword(userId, EncryptPassword(newPassword));
            await userService.SetPasswordResetToken(userId, null, null);
        });
    }

    public async Task ChangePassword(Guid userId, string currentPassword, string newPassword)
    {
        var userPassword = await userService.GetUserPasswordById(userId);
        if (EncryptPassword(currentPassword) != userPassword.Hash)
        {
            throw IdentityException.InvalidPassword();
        }

        await userService.SetPassword(userId, EncryptPassword(newPassword));
    }

    private static string EncryptPassword(string password)
    {
        // TODO: move secret key and VI to appsettings.json
        return CryptoHelper.Encrypt(password, "123456", "qwerty1234qwerty");
    }

    private static string GenerateToken()
    {
        // TODO: generate unique token
        return string.Empty;
    }
}
