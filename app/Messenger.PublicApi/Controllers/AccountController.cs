using Messenger.PublicApi.Models;
using Messenger.PublicApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.PublicApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly IdentityApi identityApi;

    public AccountController(IdentityApi identityApi)
    {
        this.identityApi = identityApi;
    }

    [HttpPost("sign-up")]
    public async Task<IActionResult> SignUp(SignUpRequest request)
    {
        await identityApi.SignUp(new SignUpDto(request.Email, request.Password));
        return Ok();
    }

    [HttpPost("sign-in")]
    public Task<string> SignIn(SignInRequest request)
    {
        return identityApi.SignIn(new SignInDto(request.Email, request.Password));
    }

    [HttpPost("password-reset-token")]
    public async Task<IActionResult> SendPasswordResetToken(SendPasswordResetTokenRequest request)
    {
        await identityApi.SendPasswordResetToken(new SendPasswordResetTokenDto(request.Email));
        return Ok();
    }

    [HttpPost("password-reset")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        var userId = Guid.NewGuid(); // TODO: get userId from authorization
        await identityApi.ResetPassword(new ResetPasswordDto(userId, request.ResetToken, request.NewPassword));
        return Ok();
    }

    [HttpPost("password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
    {
        var userId = Guid.NewGuid(); // TODO: get userId from authorization
        await identityApi.ChangePassword(new ChangePasswordDto(userId, request.CurrentPassword, request.NewPassword));
        return Ok();
    }
}
