var request = require('request');
var token = require('./secrets').GITHUB_TOKEN;
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'Bearer ' + token
    }
  };
  console.log(repoOwner, repoName);
  request(options, function(err, res, body) {
    for (user in JSON.parse(body)) {
      cb(err, JSON.parse(body)[user]);
    };
  });
}
function downloadImageByURL(url, filePath) {
  var request = require('request')
  var fs = require('fs')
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
    })
    .pipe(fs.createWriteStream(filePath));
}
getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  downloadImageByURL(result.avatar_url, 'images/' + result.login + '.jpg');
});