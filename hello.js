var fs = require('fs')
var lines = fs.readFileSync('/dev/stdin').toString()

console.log(lines)