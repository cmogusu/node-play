const fs = require('fs')
const readline = require('readline')

const memory = () => process.memoryUsage().rss / 1048576).toFixed(2)

const loadFile = (filename, cb) => {
  // this is more complex that simply calling fs.readFile() but
  // means we do not have to buffer the whole file in memory  
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(filename)
    const reader = readline.createInterface({ input })

    input.on('error', reject)

    reader.on('line', cb)
    reader.on('close', resolve)
  })
}

const start = Date.now()

const uniqueA = new Set()
const uniqueB = new Set()

// when reading the first file add every line to the set
const handleA = (line) => {
  uniqueA.add(line)
}

// this will leave us with unique lines only
const handleB = (line) => {
  if (uniqueA.has(line)) {
    uniqueA.delete(line)
  } else {
    uniqueB.add(line)
  }
}

console.log(`Starting memory: ${memory()}mb`)

Promise.resolve()
  .then(() => loadFile('uuids-eu.txt', handleA))
  .then(() => {
    console.log(`${uniqueA.size} items loaded into set`)
    console.log(`Memory: ${memory()}mb`)
  })
  .then(() => loadFile('uuids-us.txt', handleB))
  .then(() => {
    const end = Date.now()

    console.log(`Time taken: ${(end - start) / 1000}s`)
    console.log(`Final memory: ${memory()}mb`)

    console.log('Differences A:', Array.from(uniqueA))
    console.log('Differences B:', Array.from(uniqueB))
  })