namespace Messenger.IdentityApi.Exceptions;

public class IdentityException : Exception
{
    public IdentityErrorCode ErrorCode { get; set; }

    public IdentityException(IdentityErrorCode errorCode)
        : base(GetMessage(errorCode))
    {
        ErrorCode = errorCode;
    }

    private static string GetMessage(IdentityErrorCode errorCode)
    {
        switch (errorCode)
        {
            case IdentityErrorCode.InvalidEmail:
                return "Invalid email";

            case IdentityErrorCode.InvalidPassword:
                return "Invalid password";

            case IdentityErrorCode.InvalidEmailOrPassword:
                return "Invalid email or password";

            case IdentityErrorCode.InvalidToken:
                return "Invalid token";

            case IdentityErrorCode.TokenExpired:
                return "Token expired";

            default:
                throw new Exception($"Unknown error code: {errorCode}");
        }
    }

    public static IdentityException InvalidEmail() =>
        new IdentityException(IdentityErrorCode.InvalidEmail);

    public static IdentityException InvalidPassword() =>
        new IdentityException(IdentityErrorCode.InvalidPassword);

    public static IdentityException InvalidEmailOrPassword() =>
        new IdentityException(IdentityErrorCode.InvalidEmailOrPassword);

    public static IdentityException InvalidToken() =>
        new IdentityException(IdentityErrorCode.InvalidToken);

    public static IdentityException TokenExpired() =>
        new IdentityException(IdentityErrorCode.TokenExpired);
}
