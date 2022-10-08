using Messenger.MessageApi.Database;
using Messenger.MessageApi.Domains;
using Microsoft.EntityFrameworkCore;

namespace Messenger.MessageApi.Services;

public class MessageService
{
    private readonly MessageDbContext dbContext;

    public MessageService(MessageDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IEnumerable<Message>> GetMessagesByGroupId(Guid groupId)
    {
        var messages = await dbContext.Messages
            .Where(m => m.GroupId == groupId)
            .AsNoTracking()
            .ToListAsync();
        return messages;
    }

    public async Task<Guid> AddMessage(Message message)
    {
        var entry = dbContext.Messages.Add(message);
        await dbContext.SaveChangesAsync();
        return entry.Entity.Id;
    }

    public async Task RemoveMessageById(Guid messageId)
    {
        var message = await dbContext.Messages.FirstAsync(
            m => m.Id == messageId
        );
        dbContext.Messages.Remove(message);
        await dbContext.SaveChangesAsync();
    }
}
