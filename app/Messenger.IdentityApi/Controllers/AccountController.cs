using Microsoft.AspNetCore.Mvc;
using Messenger.IdentityApi.Domains;
using Messenger.IdentityApi.Models;
using Messenger.IdentityApi.Services;

namespace Messenger.IdentityApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly AccountService accountService;

    public AccountController(AccountService accountService)
    {
        this.accountService = accountService;
    }

    [HttpPost("registry")]
    public async Task<IActionResult> Registry(RegistryRequest request)
    {
        await accountService.Registry(request.Email, request.Password);
        return Ok();
    }

    [HttpPost("login")]
    public Task<string> Login(LoginRequest request)
    {
        return accountService.Login(request.Email, request.Password);
    }

    [HttpPost("password-reset-token")]
    public async Task<IActionResult> SendPasswordResetToken(SendPasswordResetTokenRequest request)
    {
        await accountService.SendPasswordResetToken(request.Email);
        return Ok();
    }

    [HttpPost("{userId}/password-reset")]
    public async Task<IActionResult> ResetPassword(Guid userId, ResetPasswordRequest request)
    {
        await accountService.ResetPassword(userId, request.ResetToken, request.NewPassword);
        return Ok();
    }

    [HttpPost("{userId}/password")]
    public async Task<IActionResult> ChangePassword(Guid userId, ChangePasswordRequest request)
    {
        await accountService.ChangePassword(userId, request.CurrentPassword, request.NewPassword);
        return Ok();
    }
}
