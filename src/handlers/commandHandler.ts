import { Client, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

export function loadCommands(client: Client & { commands?: Collection<string, any> }) {
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    client.commands = new Collection();

    for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file)).default;
    if (command?.data?.name) {
      client.commands.set(command.data.name, command);
    }
  }
}