const fs = require('fs')
const path = require('path')
// const diff = require('deep-diff')
const diff = require('jsondiffpatch').create()
// const diff = require('jsonpatch')
// const diff = require('jiff')

const outputFilePath1 = path.join(__dirname, 'deepdiff-output.patch')
const outputFilePath2 = path.join(__dirname, 'jsondiffpatch-output.patch')
const outputFilePath3 = path.join(__dirname, 'deepdiff-output.patch')
const patchesOutput = path.join(__dirname, 'patches-output.xdb')
const backupDir = `${path.dirname(path.dirname(__dirname))}/backups`
// const file1 = `${backupDir}/db3cf8c121-23af-421d-8721-e5f8f089c1be.xdb`
// const file2 = `${backupDir}/db3cf8c121-23af-421d-8721-e5f8f089c1be.1559936582470.xdb`
const file1 = `${backupDir}/Database4.xdb`
const file2 = `${backupDir}/Database5.xdb`

function doDiff(file1, file2) {
  fs.readFile(file1, 'utf8', (error, file1Data) => {
    if (error) {
      console.error(error)
      return
    }

    const json1 = file1Data.split('\n')[0]

    fs.readFile(file2, 'utf8', (error, file2Data) => {
      if (error) {
        console.error(error)
        return
      }

      const json2 = file2Data.split('\n')[0]
      if (!json1 || !json2) {
        console.log('empty json found')
        return
      }
      const d = diff.diff(json1, json2)

      fs.writeFile(outputFilePath2, JSON.stringify(d), err => {
        if (err) {
          console.log('err')
          return
        }

        console.log('wrote to file')
      })
    })
  })
}

function doPatch(file1, patchesFile, outputFilePath) {
  fs.readFile(patchesFile, 'utf8', (error, textPatches) => {
    if (error || !textPatches) {
      console.error(error)
      return
    }

    const patches = JSON.parse(textPatches)

    fs.readFile(file1, 'utf8', (error, file1Data) => {
      if (error) {
        console.error(error)
        return
      }

      const json1 = file1Data.split('\n')[0]
      if (!patches || !json1) {
        console.log('empty json found')
        return
      }

      let d

      try {
        d = diff.patch(json1, patches)
      } catch (e) {
        console.log(e)
      }

      d = JSON.stringify(d)
      d = d.replace('\\', '')

      fs.writeFile(outputFilePath, d, err => {
        if (err) {
          console.log('err')
          return
        }

        console.log('wrote to file')
      })
    })
  })
}

doPatch(file1, outputFilePath2, patchesOutput)
