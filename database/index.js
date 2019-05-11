const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db mongo connected');
});

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: Number,             // id
  username: String,       // owner.login
  repo: String,           // name
  stargazers: Number,     // stargazers_count
  watchers: Number,       // watchers_count
  forks: Number,          // forks
  rank: Number,           // (startgazers + watchers + forks)
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let doc = new Repo(repo);
  console.log('new Repo(repo)', doc);
  doc.save(function (err, doc) {
    if (err) return console.error(err);
  });
}

module.exports.save = save;