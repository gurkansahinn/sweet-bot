const Discord = require('discord.js');
const client = new Discord.Client();

function Bot(token) {
    this.token = token;
    client.login(this.token);
}

Bot.prototype.token = function token() {
    return this.token;
}

client.on('ready', () => {
    console.log(`${client.user.tag} aktif!`);
});

client.on('message', msg => {

});

module.exports = Bot;