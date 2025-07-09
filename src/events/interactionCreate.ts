import {
  Client,
  Interaction,
  ButtonInteraction,
  Collection,
  InteractionType,
} from "discord.js";
import { handleModalSubmit } from "../commands/anunciar";

export async function handleInteractionCreate(
  client: Client & { commands: Collection<string, any> },
  interaction: Interaction
) {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Erro ao executar o comando.",
        ephemeral: true,
      });
    }
  } else if (
    interaction.type === InteractionType.ModalSubmit &&
    interaction.customId === "modalAnnouncement"
  ) {
    await handleModalSubmit(interaction);
  }
}
