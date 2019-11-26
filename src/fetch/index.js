const superagent = require('superagent')

superagent
  .get('https://storage.googleapis.com/turing_developers/development/avatar/1566334245673_cute-cat.jpg')
  .then(console.log)
  .catch(console.log)

console.log('all done')