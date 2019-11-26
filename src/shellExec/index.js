const { spawn } = require('child_process')
const ls = spawn('ls', ['-lh', '/usr'])

ls.stdout.on('data', data => {
  console.log(data)
})

ls.stderr.on('data', data => {
  console.log(data)
})

ls.on('close', data => {
  console.log('closing')
})
