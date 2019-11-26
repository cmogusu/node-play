const { generateSW } = require('workbox-build')
const path = require('path')

const swDest = path.join(__dirname, 'sw.js')
generateSW({
  swDest,
  globDirectory: '.',
})
  .then(({ count, size }) => {
    console.log('generated sw', count, size)
  })
  .catch(err => {
    console.log('err', err)
  })
