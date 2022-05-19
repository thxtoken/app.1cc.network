var fs = require('fs')
console.log('Incrementing build number...')
fs.readFile('src/app.json', function (err, content) {
  if (err) throw err
  var metadata = JSON.parse(content)
  metadata.buildNumber = metadata.buildNumber + 1
  fs.writeFile('src/app.json', JSON.stringify(metadata, null, 2) + '\n', function (err) {
    if (err) throw err
    console.log('Current build number: ' + metadata.buildNumber + '\n')
  })
})
