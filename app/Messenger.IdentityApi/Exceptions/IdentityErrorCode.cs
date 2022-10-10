namespace Messenger.IdentityApi.Exceptions;

public enum IdentityErrorCode
{
    InvalidEmail = 1,
    InvalidPassword,
    InvalidEmailOrPassword,
    TokenExpired,
    InvalidToken,
}
