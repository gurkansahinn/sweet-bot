const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');

require("./leaderboard");

let sweet = null;
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/sweet/commands').filter(file => file.endsWith('.js'));

dotenv.config();

function Sweet(token) {
    this.token = token;
    this.client = client;

    this.login(this.client);
}

Sweet.prototype.login = async function login(client) {
    await this.client.login(this.token);

    sweet = this;
    this.setStatus("Online", "SA-MP Geliştirici Topluluğu", "https://discord.gg/Df4Bv2ewgw");

}

Sweet.prototype.token = function token() {
    return this.client;
}

Sweet.prototype.setStatus = function setStatus(statusType, statusText, statusUrl) {
    this.client.user.setStatus(statusType);
    this.client.user.setActivity(statusText, { type: "STREAMING", url: statusUrl })
}

for (const file of commandFiles) {
    console.log(file + " bağlantılı komut yüklendi.");
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    console.log(`${client.user.tag} aktif edildi!`);
});

client.on("message", async (message) => {
    if (message.content == "Sweet") {
        message.channel.send("Beni rahat bırak.");
    }

    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
    }
});

module.exports = Sweet, client;