const request = require('request');
const config = require('../config.js');


let getReposByUsername = (req, callback) => {
  let options = {
    url: `https://api.github.com/users/${req}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function (err, response, body) {
    if (err) console.log('error:');
    console.log('statusCode:', response && response.statusCode); // 200
    callback(err, JSON.parse(body));
  });
}

module.exports.getReposByUsername = getReposByUsername;