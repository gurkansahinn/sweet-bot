const fs = require('fs');
const Discord = require('discord.js');

let sweet = null;
const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/sweet/commands').filter(file => file.endsWith('.js'));

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
    `Hey, hey! Big Smoke, it's me, Carl! Chill! Chill!`,
    `It's time for smoke.`,
    `Mahalleni sevmen lazım, tıpkı kardeşlerini sevdiğin gibi.`,
    `Naber, kanka?`,
    `Geç kaldık, hadi koyulalım şu işe!`
];

const channelIds = [];

function Sweet(token) {
    this.token = token;
    this.client = client;

    this.login(this.client);
}

/* random mesaj fonksiyonu - aktif değil */

function RandomMessage(messageArr) {

    const data = {};
    const ch = channelIds[Math.floor(Math.random() * (channelIds.length + 1))];
    const message = new Discord.Message(client.id, data, ch);

    message.ch.send(messageArr[Math.floor(Math.random() * messageArr.length)]);
    setTimeout(() => { RandomMessage(messages); }, (Math.floor(Math.random() * messageArr.length) * 15000));

}

/* */

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

    /* random mesaj başlatma kısmı - aktif değil çünkü düzenli değil */
    /*try {
        let channels = client.channels.cache.array();
        for (const channel of channels) { channelIds.push(channel.id); }
        RandomMessage(messages);
    } catch (err) { console.log(err); }*/
    /* */
});

client.on("message", async (message) => {
    if (message.content.toLowerCase() === "sweet") {
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
