const Discord = require('discord.js');
const client = new Discord.Client();

function Bot(token) {
    this.token = token;
    this.client = client;

    this.client.login(this.token);
}

Bot.prototype.token = function token() {
    return this.client;
}

Bot.prototype.setStatus = function setStatus(statusType, statusText, statusUrl) {
    this.client.user.setStatus("Online");
    this.client.user.setActivity(statusText, { type: "STREAMING", url: statusUrl })
}

client.on('ready', () => {
    const bot = require("../main");

    console.log(`${client.user.tag} aktif!`);
    bot.setStatus("Online", "SA-MP Geliştirici Topluluğu", "https://discord.gg/Df4Bv2ewgw");
});

client.on('message', (msg) => {

});

module.exports = Bot;