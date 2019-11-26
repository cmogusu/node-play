const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'helloWorld.txt')
const file = fs.readFileSync(filePath, { encoding: 'utf8'})
const y =  file.split('\n')
console.log(y)