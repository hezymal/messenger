namespace Messenger.MessageApi.Models;

#nullable disable warnings

public class GroupRequest
{
    public Guid OwnerId { get; set; }

    public string Title { get; set; }
}
