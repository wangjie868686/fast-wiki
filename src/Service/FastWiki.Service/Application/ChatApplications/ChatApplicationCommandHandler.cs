using Masa.BuildingBlocks.Data.Mapping;

namespace FastWiki.Service.Application.ChatApplications;

public class ChatApplicationCommandHandler(IChatApplicationRepository chatApplicationRepository, IMapper mapper)
{
    [EventHandler]
    public async Task CreateChatApplicationAsync(CreateChatApplicationCommand command)
    {
        var chatApplication = new ChatApplication(Guid.NewGuid().ToString("N"))
        {
            Name = command.Input.Name,
        };

        await chatApplicationRepository.AddAsync(chatApplication);
    }

    [EventHandler]
    public async Task RemoveChatApplicationAsync(RemoveChatApplicationCommand command)
    {
        await chatApplicationRepository.RemoveAsync(command.Id);
    }

    [EventHandler]
    public async Task UpdateChatApplicationAsync(UpdateChatApplicationCommand command)
    {
        var chatApplication = await chatApplicationRepository.FindAsync(command.Input.Id);

        command.Input.Name = chatApplication?.Name;
        mapper.Map(command.Input, chatApplication);

        await chatApplicationRepository.UpdateAsync(chatApplication);
    }

    [EventHandler]
    public async Task CreateChatDialogAsync(CreateChatDialogCommand command)
    {
        var entity = new ChatDialog(command.Input.Name, command.Input.ChatApplicationId, command.Input.Description);

        await chatApplicationRepository.CreateChatDialogAsync(entity);
    }

    [EventHandler]
    public async Task RemoveChatDialogAsync(RemoveChatDialogCommand command)
    {
        await chatApplicationRepository.RemoveChatDialogAsync(command.Id);
    }

    [EventHandler]
    public async Task CreateChatDialogHistoryAsync(CreateChatDialogHistoryCommand command)
    {
        var chatDialogHistory = new ChatDialogHistory(command.Input.ChatApplicationId, command.Input.ChatDialogId,
            command.Input.Content, 0, command.Input.Current, command.Input.Type);

        await chatApplicationRepository.CreateChatDialogHistoryAsync(chatDialogHistory);
    }

    [EventHandler]
    public async Task RemoveChatDialogHistoryAsync(RemoveChatDialogHistoryCommand command)
    {
        await chatApplicationRepository.RemoveChatDialogHistoryByIdAsync(command.Id);
    }
}