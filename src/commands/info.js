// load .env file
require("dotenv").config();

// load package.json
const pkg = require("../../package.json");

// Importing the SlashCommandBuilder from the discord.js package.
const { SlashCommandBuilder } = require('discord.js');

// // get information about the bot user
// client.users.fetch(process.env.BOT_ID).then(bot => {
//   console.log(bot);
// });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription(`Provides information about NADB`),
	async execute(interaction) {
    console.log(bot)
		await interaction.reply(`${pkg.name}`);
	},
};