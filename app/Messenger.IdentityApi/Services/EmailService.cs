using System.Net.Mail;
using Messenger.IdentityApi.Models;

namespace Messenger.IdentityApi.Services;

public class EmailService
{
    public async Task SendMessage(EmailMessage message)
    {
        var smtpClient = new SmtpClient();
        var fromAddress = new MailAddress("hezyma@gmail.com"); // TODO: move address to appsettings.json
        var toAddress = new MailAddress(message.To);
        var mailMessage = new MailMessage(fromAddress, toAddress);
        mailMessage.Subject = message.Subject;
        mailMessage.IsBodyHtml = true;
        mailMessage.Body = message.Body;
        await smtpClient.SendMailAsync(mailMessage);
    }
}
