namespace Messenger.MessageApi.Models;

#nullable disable warnings

public class MessageRequest
{
    public Guid OwnerId { get; set; }

    public string Text { get; set; }

    public Guid GroupId { get; set; }
}
