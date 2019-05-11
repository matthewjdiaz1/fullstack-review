const express = require('express');
const bodyParser = require('body-parser')
const save = require('../database/index.js');
const app = express();
const mongoose = require('mongoose');
const port = 1128;
const getReposByUsername = require('../helpers/github.js');

app.use(bodyParser.text());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API
  getReposByUsername.getReposByUsername(req.body, (err, res) => {
    res.forEach(repo => {
      let doc = {
        id: repo.id,
        username: req.body,
        repo: repo.name,
        stargazers: repo.stargazers_count,
        watchers: repo.watchers_count,
        forks: repo.forks,
        rank: (repo.stargazers_count +
          repo.watchers_count +
          repo.forks)
      }
      save.save(doc);
    });
  });
  // console.log(save.Repo);
  // save.Repo.find({ username: /^matthewjdiaz1/ }, callback);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});


app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

