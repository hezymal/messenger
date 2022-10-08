using Messenger.MessageApi.Database;
using Messenger.MessageApi.Domains;
using Microsoft.EntityFrameworkCore;

namespace Messenger.MessageApi.Services;

public class GroupService
{
    private readonly MessageDbContext dbContext;

    public GroupService(MessageDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IEnumerable<Group>> GetGroupsByUserId(Guid userId)
    {
        var groups = await dbContext.GroupsUsers
            .Where(gu => gu.UserId == userId)
            .Select(gu => gu.Group)
            .AsNoTracking()
            .ToListAsync();
        return groups;
    }

    public async Task<Guid> AddGroup(Group group)
    {
        var entry = dbContext.Groups.Add(group);
        await dbContext.SaveChangesAsync();
        return entry.Entity.Id;
    }

    public async Task AddUserToGroup(GroupUser groupUser)
    {
        dbContext.GroupsUsers.Add(groupUser);
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveGroupById(Guid groupId)
    {
        var group = await dbContext.Groups.FirstAsync(
            g => g.Id == groupId
        );
        dbContext.Groups.Remove(group);
        await dbContext.SaveChangesAsync();
    }
}
