var request = require('request');
var token = require('./secrets').GITHUB_TOKEN;
// console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'Bearer ' + token
    }
  };
  request(options, function(err, res, body) {
    for (user in JSON.parse(body)) {
      cb(err, JSON.parse(body)[user].avatar_url);
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
      //console.log('Response Status Code: ', response.statusCode);
      //console.log('Content Type: ', response.headers['content-type'])
    })
    .pipe(fs.createWriteStream(filePath));
}
downloadImageByURL('INSERT URL HERE', './images/i.jpg');
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log(result);
});
