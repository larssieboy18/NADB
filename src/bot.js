// load .env file
require("dotenv").config();

// load package.json
const pkg = require("../package.json");

// require additional node packages
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
  console.log(
    `Ready! Logged in as ${c.user.tag}, using version ${pkg.version} of ${pkg.name} by ${pkg.author.split(" ")[0]}. You can invite the bot by using the following URL: https://discord.com/api/oauth2/authorize?client_id=${process.env.BOT_ID}&permissions=8&scope=bot%20applications.commands`
  );
});

// Creating a new collection of commands
client.commands = new Collection();

// load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// log interaction to console
client.on(Events.InteractionCreate, interaction => {
  if (!interaction.isChatInputCommand()) return
  console.log(interaction);
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
