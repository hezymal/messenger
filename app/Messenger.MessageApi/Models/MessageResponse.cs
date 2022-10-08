namespace Messenger.MessageApi.Models;

#nullable disable warnings

public class MessageResponse
{
    public Guid Id { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public Guid OwnerId { get; set; }

    public string Text { get; set; }

    public Guid GroupId { get; set; }
}
