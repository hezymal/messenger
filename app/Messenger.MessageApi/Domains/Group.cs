using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger.MessageApi.Domains;

#nullable disable warnings

public class Group : IModifiableEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Title { get; set; }

    public Guid OwnerId { get; set; }

    public List<GroupUser> Users { get; set; }
}
