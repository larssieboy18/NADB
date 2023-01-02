// load .env file
require("dotenv").config();

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");

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
  console.log(`Ready! Logged in as ${c.user.tag}. You can invite the bot by using the following URL: https://discord.com/api/oauth2/authorize?client_id=${process.env.BOT_ID}&permissions=8&scope=bot%20applications.commands`);
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
