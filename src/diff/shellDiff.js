const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const baseDir = path.dirname(path.dirname(__dirname))
const backupDir = `${baseDir}/backups`

function pretifyFile(filePath, writeFilePath) {
  let fileData = fs.readFileSync(filePath, { encoding: 'utf8'})
  fileData = JSON.parse(fileData)
  const prettyFileData = JSON.stringify(fileData, null, 1)

  if (1) {
    fs.writeFile(writeFilePath, prettyFileData, err => {
      if (err) console.log('error writing to file', err)
      console.log('successfully wrote to file')
    })
  }
}

function runDiff(file1, file2, outputFile) {
  return new Promise(resolve => {
    /*
    const diff = exec(`diff ${file1} ${file2} > ${outputFile}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.log(err, stderr)
        return resolve(false)
      }

      resolve(outputFile)
      console.log('successfully written')
    })
    */

    const diff = exec(`diff ${file1} ${file2} > ${outputFile}`)

    diff.stdout.on('data', data => {
      console.log(`stdout: ${data}`)
      resolve(outputFile)
    })

    diff.stderr.on('data', data => {
      console.log(`stderr: ${data}`)
      resolve()
    })

    diff.on('close', data => {
      console.log('closing')
      resolve()
    })
  })
}

const filePath1 = `${backupDir}/Database4.xdb`
const writeFilePath1 = `${backupDir}/Database4-pretty.xdb`

const filePath2 = `${backupDir}/Database5.xdb`
const writeFilePath2 = `${backupDir}/Database5-pretty.xdb`

const diffFilePath = `${backupDir}/Database5-diff.xdb`

// pretifyFile(filePath1, writeFilePath1)
// pretifyFile(filePath2, writeFilePath2)

runDiff(writeFilePath1, writeFilePath2, diffFilePath)




