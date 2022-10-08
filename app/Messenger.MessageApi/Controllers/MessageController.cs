using Messenger.MessageApi.Domains;
using Messenger.MessageApi.Models;
using Messenger.MessageApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace Messenger.MessageApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly MessageService messageService;

    public MessageController(MessageService messageService)
    {
        this.messageService = messageService;
    }

    [HttpGet("group/{groupId}")]
    public async Task<IEnumerable<MessageResponse>> GetMessagesByGroupId(Guid groupId)
    {
        var messages = await messageService.GetMessagesByGroupId(groupId);
        return messages.Select(m => new MessageResponse
        {
            Id = m.Id,
            CreatedDate = m.CreatedDate,
            ModifiedDate = m.ModifiedDate,
            OwnerId = m.OwnerId,
            Text = m.Text,
            GroupId = m.GroupId,
        });
    }

    [HttpPost()]
    public async Task<Guid> AddMessage(MessageRequest messageRequest)
    {
        var message = new Message
        {
            Text = messageRequest.Text,
            OwnerId = messageRequest.OwnerId,
            GroupId = messageRequest.GroupId,
        };
        var messageId = await messageService.AddMessage(message);
        return messageId;
    }

    [HttpDelete("{messageId}")]
    public async Task<IActionResult> RemoveMessageById(Guid messageId)
    {
        await messageService.RemoveMessageById(messageId);
        return Ok();
    }
}
