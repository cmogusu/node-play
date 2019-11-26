const fs = require('fs')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const pouchdb = require('pouchdb')
const expressPouchDb = require('express-pouchdb')
const replicationStream = require('pouchdb-replication-stream')
const pouchdbLoad = require('pouchdb-load')

const app = express()
const PouchDb = pouchdb.defaults()
PouchDb.plugin(replicationStream.plugin)
PouchDb.plugin({ loadIt: pouchdbLoad.load })
PouchDb.adapter('writableStream', replicationStream.adapters.writableStream);

const corsOptions = {
  // origin: 'http://localhost:3000/',
  allowedHeaders: ['Authorization'],
}
app.options('*', cors())
app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

app.use('/db', expressPouchDb(PouchDb))

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use('/backup', (req, res) => {
  const { dbId } = req.body

  if (!dbId) return res.send('finished doing things')

  try {
    const createdAt = new Date().getTime()
    const filePath = path.join(path.dirname(__dirname), `backups/${dbId}.${createdAt}.xdb`)
    const db = new PouchDb(dbId)
    const stream = fs.createWriteStream(filePath)
    db.dump(stream)
      .then(res => {
        console.log('successfully dumped')
      })
      .catch(err => {
        console.log('err', err)
      })
  } catch(err) {
    console.log('error getting db: ', err)
  }

  return res.send('finished doing things')
})

app.listen(9000)
