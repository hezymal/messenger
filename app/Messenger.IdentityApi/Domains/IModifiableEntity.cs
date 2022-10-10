namespace Messenger.IdentityApi.Domains;

public interface IModifiableEntity
{
    DateTime? ModifiedDate { get; set; }
}
