const wiki = require('../wiki');

module.exports = {
    name: 'wiki',
    description: "SA-MP Native'lerini listeleyen komut.",
    async execute(message, args) {

        if (!args.length) {
            return message.channel.send(`${message.author}, bir callback veya fonksiyon adı yazmalısın.`);
        }

        const response = await wiki.getWikiPage("https://raw.githubusercontent.com/openmultiplayer/web/master/docs/translations/tr/scripting/callbacks/" + args[0] + ".md");

        if (response === "404: Not Found") {
            const responseFunction = await wiki.getWikiPage("https://raw.githubusercontent.com/openmultiplayer/web/master/docs/translations/tr/scripting/functions/" + args[0] + ".md");
            if (responseFunction == "404: Not Found") {
                return message.channel.send(`${message.author}, böyle bir callback veya fonksiyon bulunamadı.`);
            }

            const leaderBoardTemplate = wiki.getMessageTemplate(responseFunction);
            message.channel.send(leaderBoardTemplate);
        } else {
            const leaderBoardTemplate = wiki.getMessageTemplate(response);
            message.channel.send(leaderBoardTemplate);
        }
    },
};