const fs = require('fs');
const Discord = require('discord.js');
const { send } = require('process');

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

const channels = [
    '808070096161210419'
];

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

function RandomMessage() {
    var randomChannel = Math.floor(Math.random() * channels.length);
    var randomChannelMessage = Math.floor(Math.random() * messages.lenght);

    client.channels.cache.get(randomChannel).send(randomChannelMessage);
}

client.on("message", async (message) => {
    if (message.content.toLowerCase() === "sweet") {
        message.channel.send(messages[Math.floor(Math.random() * messages.length)]);
    }
    
    if(message.content.toLowerCase() === "test" && message.author.id === "708138652839968799") {
        const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'coolguy');
        message.react(reactionEmoji);

        setTimeout(RandomMessage, 15000);
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
