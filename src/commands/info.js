// load .env file
require("dotenv").config();

// load package.json
const pkg = require("../../package.json");

// Importing the SlashCommandBuilder from the discord.js package.
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription(`Provides information about NADB`),
	async execute(interaction) {
    console.log(bot)
		await interaction.reply(`${pkg.name}`);
	},
};