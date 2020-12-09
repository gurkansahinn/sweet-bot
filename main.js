const dotenv = require('dotenv');
const Bot = require("./src/bot");

dotenv.config();
let bot = new Bot(process.env.TOKEN);