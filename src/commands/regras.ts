import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('regras').setDescription('Envia as regras do servidor e fixa no canal.'),

  async execute(interaction: ChatInputCommandInteraction) {
    const allowedRoles = process.env.MOD_ROLES!.split(',');
    if (!interaction.member || !('roles' in interaction.member)) return;
    const roles = interaction.member.roles;
    if (!('cache' in roles) || !roles.cache.some((r: any) => allowedRoles.includes(r.id))) {
      return interaction.reply({ content: 'Você não tem permissão para isso.', ephemeral: true });
    }
    const embed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setTitle('📘 Regras e Diretrizes da Comunidade')
      .setDescription('📝 Além das diretrizes feitas especificamente para o Discord, você pode ficar por dentro das Regras Gerais do servidor acessando nosso site. Atente-se!')
      .addFields(
        { name: '1º Trate todos com consideração', value: 'Nenhuma forma de assédio, perseguição, machismo, racismo ou discurso de ódio será aceito.' },
        { name: '2º Evite excesso de spam', value: 'Isso inclui mensagens, emojis e figurinhas.' },
        { name: '3º Autopromoção não é permitido', value: 'É proibido enviar convites de servidor ou propagandas sem autorização.' },
        { name: '4º Conteúdo adulto ou impróprio não é permitido', value: 'Nada de conteúdo NSFW, violência extrema, etc.' },
        { name: '5º Não divulgue informações pessoais', value: 'Proteja sua segurança online.' },
        { name: '6º Apelidos e avatares ofensivos são proibidos', value: 'Inclui qualquer forma de ódio ou discriminação.' },
        { name: '7º Respeite os termos do Discord', value: '[https://discordapp.com/terms](https://discordapp.com/terms)' },
        { name: '8º Faça amigos!', value: 'Nosso objetivo é manter o servidor um espaço acolhedor!' },
        { name: 'Atenção! ⚠️', value: 'Se notar algo que infrinja as regras, informe à staff.' }
      );

    const canal = await interaction.guild?.channels.fetch(process.env.REGRAS_CHANNEL_ID!);
    if (!canal?.isTextBased()) return await interaction.reply({ content: 'Canal de regras não encontrado.', ephemeral: true });

    const msg = await (canal as any).send({ embeds: [embed] });
    await msg.pin();

    await interaction.reply({ content: 'Mensagem de regras enviada e fixada com sucesso.', ephemeral: true });
    const logChannel = await interaction.guild?.channels.fetch(process.env.LOG_CHANNEL_ID!);
      if (logChannel?.isTextBased()) {
        await logChannel.send(`🔨 ${interaction.user.tag} fixou a mensagem de regras no chat de regras!`);
      }
  },
};
