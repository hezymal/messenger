namespace Messenger.ApiBase.Models;

public class ApiResponse
{
    public const string SUCCESSFUL_TYPE = "successful";

    public const string ERROR_TYPE = "error";

    public string Type { get; set; }

    public ApiResponse(string type)
    {
        Type = type;
    }

    public static ApiResponse Successful()
    {
        return new ApiResponse(SUCCESSFUL_TYPE);
    }

    public static ApiResponse Error()
    {
        return new ApiResponse(ERROR_TYPE);
    }
}

public class ApiResponse<TPayload> : ApiResponse
{
    public TPayload Payload { get; set; }

    public ApiResponse(string type, TPayload payload)
        : base(type)
    {
        Payload = payload;
    }

    public static ApiResponse<TPayload> Successful(TPayload payload)
    {
        return new ApiResponse<TPayload>(SUCCESSFUL_TYPE, payload);
    }

    public static ApiResponse<TPayload> Error(TPayload payload)
    {
        return new ApiResponse<TPayload>(ERROR_TYPE, payload);
    }
}
