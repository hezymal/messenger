using Messenger.ApiBase.Models;
using System.Net.Http.Json;

namespace Messenger.ApiBase.Clients;

public class ApiClient
{
    private readonly string baseUrl;

    public ApiClient(string baseUrl)
    {
        this.baseUrl = baseUrl;
    }

    public async Task<ApiResponse<TPayload>> Get<TPayload>(string url)
    {
        using var httpClient = GetHttpClient();
        var httpResponse = await httpClient.GetAsync(GetAbsoluteUrl(url));
        var payload = await ReadApiResponseFromHttpResponse<TPayload>(httpResponse);
        return ApiResponse<TPayload>.Successful(payload);
    }

    public async Task<ApiResponse> Post<TData>(string url, TData data)
    {
        using var httpClient = GetHttpClient();
        await httpClient.PostAsJsonAsync(GetAbsoluteUrl(url), data);
        return ApiResponse.Successful();
    }

    public async Task<ApiResponse<TPayload>> Post<TPayload, TData>(string url, TData data)
    {
        using var httpClient = GetHttpClient();
        var httpResponse = await httpClient.PostAsJsonAsync(GetAbsoluteUrl(url), data);
        return await ReadApiResponseFromHttpResponse<ApiResponse<TPayload>>(httpResponse);
    }

    public async Task<ApiResponse> Put<TData>(string url, TData data)
    {
        using var client = GetHttpClient();
        await client.PutAsJsonAsync(GetAbsoluteUrl(url), data);
        return ApiResponse.Successful();
    }

    public async Task<ApiResponse<TPayload>> Put<TPayload, TData>(string url, TData data)
    {
        using var client = GetHttpClient();
        var httpResponse = await client.PutAsJsonAsync(GetAbsoluteUrl(url), data);
        return await ReadApiResponseFromHttpResponse<ApiResponse<TPayload>>(httpResponse);
    }

    public async Task<ApiResponse> Delete(string url)
    {
        using var client = GetHttpClient();
        await client.DeleteAsync(GetAbsoluteUrl(url));
        return ApiResponse.Successful();
    }

    public async Task<ApiResponse<TPayload>> Delete<TPayload>(string url)
    {
        using var client = GetHttpClient();
        var httpResponse = await client.DeleteAsync(GetAbsoluteUrl(url));
        return await ReadApiResponseFromHttpResponse<ApiResponse<TPayload>>(httpResponse);
    }

    private string GetAbsoluteUrl(string url)
    {
        return $"{baseUrl}{url}";
    }

    private static async Task<TResponse> ReadApiResponseFromHttpResponse<TResponse>(HttpResponseMessage httpResponse)
    {
        var response = await httpResponse.Content.ReadFromJsonAsync<TResponse>();
        if (response == null)
        {
            throw new Exception($"HTTP request at url '{httpResponse.RequestMessage?.RequestUri}' no have paylaod");
        }

        return response;
    }

    private static HttpClient GetHttpClient()
    {
        return new HttpClient();
    }
}
