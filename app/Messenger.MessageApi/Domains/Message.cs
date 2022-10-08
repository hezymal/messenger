using System.ComponentModel.DataAnnotations.Schema;

namespace Messenger.MessageApi.Domains;

#nullable disable warnings

public class Message : IModifiableEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Text { get; set; }

    public Guid GroupId { get; set; }

    public Guid OwnerId { get; set; }

    public Group Group { get; set; }
}
