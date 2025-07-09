import { Client, Interaction, ButtonInteraction, Collection } from 'discord.js';

export async function handleInteractionCreate(client: Client & { commands: Collection<string, any> }  , interaction: Interaction)  {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Erro ao executar o comando.', ephemeral: true });
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'primary-button') {
      await interaction.reply({ content: 'Você clicou no botão!', ephemeral: true });
    }
  }
}
