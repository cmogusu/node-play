const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');

const {google} = require('googleapis');
const scopes = ['https://www.googleapis.com/auth/plus.me'];
let oauth2Client = {}

async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            res.end('Authentication successful! Please return to the console.');
            server.destroy();
            const {tokens} = await oauth2Client.getToken(qs.get('code'));
            oauth2Client.credentials = tokens;
            resolve(oauth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

async function runSample() {
  // retrieve user profile
  const res = await plus.people.get({userId: 'me'});
  console.log(res.data);
}


fs.readFile('./credentials.json', (err, content) => {
  if (err) {
    console.log('error loading client secret file:', err)
    return
  }

  const { installed: keys } = JSON.parse(content)

  oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[1]
  )

  google.options({auth: oauth2Client})

  authenticate(scopes)
    .then(client => runSample(client))
    .catch(console.error);
})