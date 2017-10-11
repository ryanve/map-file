const fs = require("fs")
const path = require("path")
const utf8 = "utf8"
const same = text => text
const done = file => err => {
  if (err) throw err
  console.log("Wrote:", file)
}

const mapFile = ({from, to, map = same}, cb) => {
  if (void 0 === cb) cb = done(to)
  from = path.resolve(from)
  to = path.resolve(to)
  fs.readFile(from, utf8, (err, text) => {
    if (err) throw err
    text = map(text)
    if (void 0 === text) cb(new Error("text => undefined"))
    else fs.writeFile(to, text, utf8, cb)
  })
}

module.exports = mapFile;
