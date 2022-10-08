namespace Messenger.MessageApi.Models;

#nullable disable warnings

public class GroupResponse
{
    public Guid Id { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public Guid OwnerId { get; set; }

    public string Title { get; set; }
}
