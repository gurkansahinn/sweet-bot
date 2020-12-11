const Discord = require('discord.js');
const dotenv = require('dotenv');
const leaderBoard = require('../leaderboard');

dotenv.config();

module.exports = {
    name: 'openmp.aoc2020',
    description: 'Advent Of Code 2020 open.mp discordundaki mevcut listeyi gösterir.',
    async execute(message) {
        const leaderBoardTemplate = new Discord.MessageEmbed()
            .setColor(15844367)
            .setURL('https://adventofcode.com')
            .setDescription('Advent Of Code 2020 - Liderlik Tablosu (OPEN.MP)')
            .setThumbnail('https://repository-images.githubusercontent.com/317076987/2058f880-327b-11eb-9a91-71903b2d5120')
            .setTimestamp();

        const response = await leaderBoard.getLeaderBoardData("https://adventofcode.com/2020/leaderboard/private/view/654104.json");

        let leaderBoardObject = JSON.parse(response);
        let members = Object.getOwnPropertyNames(leaderBoardObject.members).map(key => leaderBoardObject.members[key]) || [];

        let players = "";
        members.forEach((object, index) => {
            if (players.length > 800) {
                leaderBoardTemplate.addField("_", players);
                players = members[index].name + " isimli katılımcı " + members[index].local_score + " miktar puana sahip.\n";
            } else {
                players = players + members[index].name + " isimli katılımcı " + members[index].local_score + " miktar puana sahip.\n";
            }
        });
        leaderBoardTemplate.addField("_", players);
        message.channel.send(leaderBoardTemplate);
    },
};