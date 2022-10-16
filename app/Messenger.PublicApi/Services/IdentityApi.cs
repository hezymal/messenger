using Messenger.ApiBase.Clients;
using Messenger.PublicApi.Models;

namespace Messenger.PublicApi.Services;

public class IdentityApi
{
    public Task SignUp(SignUpDto request)
    {
        var apiClient = GetApiClient();
        return apiClient.Post("/sign-up", request);
    }

    public async Task<string> SignIn(SignInDto request)
    {
        var apiClient = GetApiClient();
        var response = await apiClient.Post<string, SignInDto>("/sign-in", request);
        return response.Payload;
    }

    public Task SendPasswordResetToken(SendPasswordResetTokenDto request)
    {
        var apiClient = GetApiClient();
        return apiClient.Post("/password-reset-token", request);
    }

    public Task ResetPassword(ResetPasswordDto request)
    {
        var apiClient = GetApiClient();
        return apiClient.Post("/password-reset", request);
    }

    public Task ChangePassword(ChangePasswordDto request)
    {
        var apiClient = GetApiClient();
        return apiClient.Post("/password", request);
    }

    private ApiClient GetApiClient()
    {
        return new ApiClient("http://localhost:5001"); // TODO: move url to appsettings.json
    }
}
