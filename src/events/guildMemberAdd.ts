import { GuildMember } from 'discord.js';

export async function handleGuildMemberAdd(member: GuildMember) {
  const guildId = process.env.GUILD_ID;
  const roleId = process.env.MEMBER_ROLE_ID;

  if (member.guild.id !== guildId) return;

  try {
    await member.roles.add(roleId!);
    console.log(`Cargo "Membro" adicionado para ${member.user.tag}`);
  } catch (error) {
    console.error('Erro ao adicionar cargo:', error);
  }
}
