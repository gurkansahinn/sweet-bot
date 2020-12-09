const dotenv = require('dotenv');
const Bot = require("./src/bot");
dotenv.config();

const bot = new Bot(process.env.TOKEN);
module.exports = bot;