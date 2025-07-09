import 'dotenv/config';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { loadCommands } from './handlers/commandHandler';
import { deployCommands } from './handlers/deployCommands';
import { handleGuildMemberAdd } from './events/guildMemberAdd';
import { handleInteractionCreate } from './events/interactionCreate';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
}) as Client & { commands: Collection<string, any> };

client.commands = new Collection();

(async () => {
    await deployCommands();
    loadCommands(client);
    client.on('interactionCreate', (interaction) => handleInteractionCreate(client, interaction));
    client.on('guildMemberAdd', (member) => handleGuildMemberAdd(member));
    client.once('ready', () => console.log(`Bot online como ${client.user?.tag}!`));
    client.login(process.env.DISCORD_TOKEN);
})();