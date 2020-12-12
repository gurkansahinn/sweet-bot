const fs = require('fs');
const Discord = require('discord.js');

require("./leaderboard");

let sweet = null;
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/sweet/commands').filter(file => file.endsWith('.js'));

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
    if (message.content.toLowerCase() === "sweet") {
        const messages = [
            `Kahretsin, tekrar başlıyoruz.`,
            `Grove Street Aileleri artık büyük değil.`,
            `Grove Street, ev. En azından her şeyi berbat etmeden önce öyleydi.`,
            `Grove Street kraldır! Benimle söyleyin zenciler, Grove Street kraldır! EVET!`,
            `Gidelim.`,
            `Yapma! Ne yapıyorsun? Carl, Brian, kesin şunu!`,
            `Yanlış evi seçtin, pislik!`,
            `Kahrolası treni takip et CJ!`,
            `Sakinleş Big Smoke, SAKİNLEŞ!`,
            `Ryder haklı. Hepimiz ayrılalım ve daha sonra tekrar buluşalım.`,
            `Adamım, kimse mahalleye önem vermiyor.`,
            `Bilmiyorum adamım!`,
            `_Megafon Sesi: LSPD! aracını durdur! HEY HEY, NE YAPIYORSUN? BİZİ ÖLDÜRECEKSİN._`,
        ];
        message.channel.send(messages[Math.floor(Math.random() * 7)]);
    }

    if (message.content.toLowerCase() === "grove street kraldır!" || message.content.toLowerCase() === "grove street kraldır") {
        message.channel.send("EVET, EVET GROVE STREET KRALDIR!");

        const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'coolguy');
        message.react(reactionEmoji);
    }

    if (!message.content.startsWith("!") || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
    }
});

module.exports = Sweet;