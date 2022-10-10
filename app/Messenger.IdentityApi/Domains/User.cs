using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger.IdentityApi.Domains;

#nullable disable warnings

public class User : ICreatableEntity, IModifiableEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Email { get; set; }

    public UserPassword Password { get; set; }
}
