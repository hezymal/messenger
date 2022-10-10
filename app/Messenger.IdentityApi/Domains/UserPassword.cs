using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger.IdentityApi.Domains;

#nullable disable warnings

public class UserPassword : ICreatableEntity, IModifiableEntity
{
    [Key]
    public Guid UserId { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Hash { get; set; }

    public string? ResetToken { get; set; }

    public DateTime? ResetTokenExpirationDate { get; set; }
}
