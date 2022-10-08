namespace Messenger.MessageApi.Models;

#nullable disable warnings

public class SearchResponse<TItem>
{
    public TItem[] Items { get; set; }

    public int TotalItems { get; set; }
}
