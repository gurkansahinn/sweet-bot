const fetch = require('node-fetch');
const dotenv = require('dotenv');
const Discord = require('discord.js');

var sweet = null;
const client = new Discord.Client();
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

client.on('ready', async () => {
    console.log(`${client.user.tag} aktif edildi!`);
});

client.on("message", async (message) => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "aoc2020") {

        const leaderBoardTemplate = new Discord.MessageEmbed()
            .setColor(15844367)
            .setURL('https://adventofcode.com')
            .setDescription('Advent Of Code 2020 - Liderlik Tablosu')
            .setThumbnail('https://repository-images.githubusercontent.com/317076987/2058f880-327b-11eb-9a91-71903b2d5120')
            .setTimestamp();

        const response = await getLeaderBoardData("https://adventofcode.com/2020/leaderboard/private/view/1156609.json");

        var leaderBoardObject = JSON.parse(response);

        const membersObject = leaderBoardObject.members;
        let members = Object.getOwnPropertyNames(membersObject).map(key => membersObject[key]) || [];

        members.forEach((object, index) => {
            leaderBoardTemplate.addField(members[index].name, members[index].local_score + " puan ve " + members[index].stars + " adet yıldıza sahip.");
        });
        message.channel.send(leaderBoardTemplate);
    }
});

async function getLeaderBoardData(url = '') {

    const cookieData = {
        headers: {
            cookie: '_ga=' + process.env._ga + ' _gid=' + process.env._gid + ' session=' + process.env.SESSION
        }
    };

    const response = await fetch(url, cookieData);
    const responseText = await (response).text();
    return responseText;
}

module.exports = Sweet;