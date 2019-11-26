const fs = require('fs')
const path = require('path')
const diffMatchPatch = require('diff-match-patch')

const diff = new diffMatchPatch()
diff.Diff_Timeout = 30
const baseDir = path.dirname(path.dirname(__dirname))
const backupDir = `${baseDir}/backups`
const patchesDir = `${baseDir}/patches`

const file1 = `${backupDir}/db3cf8c121-23af-421d-8721-e5f8f089c1be.xdb`
const file2 = `${backupDir}/db3cf8c121-23af-421d-8721-e5f8f089c1be.1559936582470.xdb`
const latestFile2 = `${backupDir}/db3cf8c121-23af-421d-8721-e5f8f089c1be.latest.xdb`
const patchesFile = `${patchesDir}/db3cf8c121-23af-421d-8721-e5f8f089c1be.patch`

function createTextPatch(string1, string2) {
  const diffs = diff.diff_main(string1, string2)
  diff.diff_cleanupEfficiency(diffs)
  const patches = diff.patch_make(string1, string2, diffs)

  return diff.patch_toText(patches)
}

function restoreTextPatch(string1, textPatches) {
  const patches = diff.patch_fromText(textPatches)
  const string2 = diff.patch_apply(patches, string1)[0]
  return string2
}

function saveToFile(fileName, fileData) {
  fs.writeFile(fileName, fileData, err => {
    if (err) console.log('error writing to file', err)
    console.log('successfully wrote to file')
  })
}

function getFilePatches(file1, file2, callback) {
  fs.readFile(file1, 'utf8', (err, file1Data) => {
    if (err) return callback(err, null)

    fs.readFile(file2, 'utf8', (err, file2Data) => {
      if (err) return callback(err, null)
      
      const patches = createTextPatch(file1Data, file2Data)
      return callback(null, patches)
    })
  })
}

function restoreFilePatches(patchesFile, file1, callback) {
  fs.readFile(patchesFile, 'utf8', (err, textPatches) => {
    if (err) return callback(err, null)
    
    fs.readFile(file1, 'utf8', (err, file1Data) => {
      if (err) return callback(err, null)

      const file2Data = restoreTextPatch(file1Data, textPatches)
      return callback(null, file2Data)
    })
  })
}

/*
getFilePatches(file1, file2, (err, patches) => {
  if (err) return console.log(err)

  console.log(patches)
  return saveToFile(patchesFile, patches)
})

restoreFilePatches(patchesFile, file1, (err, file2Data) => {
  if (err) return console.log(err)

  console.log(file2Data)
  
  return saveToFile(latestFile2, file2Data)
})
*/
