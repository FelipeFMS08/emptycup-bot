import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("anunciar")
    .setDescription("Envia um anúncio personalizado.")
    .addStringOption((option) =>
      option
        .setName("mensagem")
        .setDescription("A mensagem a ser anunciada")
        .setRequired(true)
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

    const modal = new ModalBuilder()
      .setCustomId("modalAnnouncement")
      .setTitle("Criar Anúncio");

    const title = new TextInputBuilder()
      .setCustomId("titleInput")
      .setLabel("Título do Anúncio")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const description = new TextInputBuilder()
      .setCustomId("descriptionInput")
      .setLabel("Conteúdo do Anúncio")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(title),
      new ActionRowBuilder<TextInputBuilder>().addComponents(description)
    );

    await interaction.showModal(modal);
  },
};

export async function handleModalSubmit(interaction: ModalSubmitInteraction) {
  if (interaction.customId !== "modalAnnouncement") return;

  const title = interaction.fields.getTextInputValue("titleInput");
  const description = interaction.fields.getTextInputValue("descriptionInput");

  const embed = new EmbedBuilder()
    .setTitle(`📢 ${title}`)
    .setDescription(description)
    .setColor(0x00aeff)
    .setTimestamp()
    .setFooter({
      text: `Anunciado por ${interaction.user.tag}`,
      iconURL: interaction.user.displayAvatarURL(),
    });

  const channel = await interaction.guild?.channels.fetch(
    process.env.ANNOUNCEMENTS_CHANNEL_ID!
  );
  if (!channel || !channel.isTextBased()) {
    return interaction.reply({
      content: "Canal de anúncios não encontrado.",
      ephemeral: true,
    });
  }

  await channel.send({ embeds: [embed] });
  await interaction.reply({
    content: "✅ Anúncio enviado com sucesso!",
    ephemeral: true,
  });

  const logChannel = await interaction.guild?.channels.fetch(
    process.env.LOG_CHANNEL_ID!
  );
  if (logChannel?.isTextBased()) {
    await logChannel.send(
      `📢 ${interaction.user.tag} fez um anúncio: **${title}**`
    );
  }
}
