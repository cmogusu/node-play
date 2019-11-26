const middleware = require('webpack-dev-middleware');
const compiler = require('./prod')
const express = require('express')
const app = express();
const port = 3000;

app.use(middleware(compiler, {
	serversideRender: true,
}))
/*
app.get('/', (req, res) => {
	res.send('hello world')
});
*/
app.listen(port, () => console.log('started listening'))
