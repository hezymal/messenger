using System.ComponentModel.DataAnnotations;

namespace Messenger.MessageApi.Domains;

#nullable disable warnings

public class GroupUser
{
    [Key]
    public Guid GroupId { get; set; }

    public Group Group { get; set; }

    [Key]
    public Guid UserId { get; set; }
}
