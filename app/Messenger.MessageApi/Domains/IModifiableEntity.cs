namespace Messenger.MessageApi.Domains;

public interface IModifiableEntity
{
    DateTime? ModifiedDate { get; set; }
}
