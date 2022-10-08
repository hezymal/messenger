namespace Messenger.MessageApi.Domains;

public interface IEntity
{
    Guid Id { get; set; }

    DateTime CreatedDate { get; set; }
}
