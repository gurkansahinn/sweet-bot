const Discord = require('discord.js');
const client = new Discord.Client();
let sweet = null;

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

client.on('ready', () => {
    console.log(`${client.user.tag} aktif edildi!`);
});

client.on('message', (msg) => {

});

module.exports = Sweet;