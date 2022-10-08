using Messenger.MessageApi.Domains;
using Messenger.MessageApi.Models;
using Messenger.MessageApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.MessageApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupController : ControllerBase
{
    private readonly GroupService groupService;

    public GroupController(GroupService groupService)
    {
        this.groupService = groupService;
    }

    [HttpGet("user/{userId}")]
    public async Task<IEnumerable<GroupResponse>> GetGroupsByUserId(Guid userId)
    {
        var groups = await groupService.GetGroupsByUserId(userId);
        return groups.Select(g => new GroupResponse
        {
            Id = g.Id,
            CreatedDate = g.CreatedDate,
            ModifiedDate = g.ModifiedDate,
            Title = g.Title,
            OwnerId = g.OwnerId,
        });
    }

    [HttpPost()]
    public async Task<Guid> AddGroup(GroupRequest groupRequest)
    {
        var group = new Group
        {
            Title = groupRequest.Title,
            OwnerId = groupRequest.OwnerId,
        };
        var groupId = await groupService.AddGroup(group);
        return groupId;
    }

    [HttpPost("{groupId}/user/{userId}")]
    public async Task<IActionResult> AddUserToGroup(Guid groupId, Guid userId)
    {
        var groupUser = new GroupUser
        {
            GroupId = groupId,
            UserId = userId,
        };
        await groupService.AddUserToGroup(groupUser);
        return Ok();
    }

    [HttpDelete("{groupId}")]
    public async Task<IActionResult> RemoveGroupById(Guid groupId)
    {
        await groupService.RemoveGroupById(groupId);
        return Ok();
    }
}
