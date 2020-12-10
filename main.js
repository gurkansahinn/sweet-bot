const dotenv = require('dotenv');
const Sweet = require("./src/sweet");
dotenv.config();

const bot = new Sweet(process.env.TOKEN);
module.exports = bot;