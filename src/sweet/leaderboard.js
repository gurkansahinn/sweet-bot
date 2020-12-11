const fetch = require('node-fetch');

async function getLeaderBoardData(url = '') {

    const cookieData = {
        headers: {
            cookie: '_ga=' + process.env._ga + ' _gid=' + process.env._gid + ' session=' + process.env.SESSION
        }
    };

    const response = await fetch(url, cookieData);
    return response.text();
}

exports.getLeaderBoardData = getLeaderBoardData;