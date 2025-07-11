import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const banCommand = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the ban")
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const allowedRoles = process.env.MOD_ROLES!.split(",");
    if (!interaction.member || !("roles" in interaction.member)) return;
    const roles = interaction.member.roles;
    if (
      !("cache" in roles) ||
      !roles.cache.some((r: any) => allowedRoles.includes(r.id))
    ) {
      return interaction.reply({
        content: "Você não tem permissão para isso.",
        ephemeral: true,
      });
    }
    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";

    if (!interaction.guild) {
      return interaction.reply({
        content: "This command can only be used in a server.",
        ephemeral: true,
      });
    }
    try {
      await interaction.guild?.members.ban(user?.id!, { reason });
      return interaction.reply({
        content: `Successfully banned ${user!.tag} for: ${reason}`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "An error occurred while trying to ban the user.",
        ephemeral: true,
      });
    }
  },
};
