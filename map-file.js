const fs = require("fs")
const path = require("path")
const utf8 = "utf8"
const made = dir => "." === dir || fs.existsSync(path.resolve(dir))
const same = text => text
const done = file => err => {
  if (err) throw err
  console.log("Wrote:", file)
}

const mapFile = ({from, to, map=same}, cb=done(to)) => {
  const write = text => {
    fs.writeFile(path.resolve(to), text, utf8, cb)
  }

  fs.readFile(path.resolve(from), utf8, (err, text) => {
    if (err) throw err
    text = map(text)
    if (void 0 === text) {
      cb(new Error("text => undefined"))
    } else {
      const destination = path.dirname(to)
      if (made(destination)) write(text)
      else fs.mkdir(path.resolve(destination), err => {
        if (err) throw err
        write(text)
      })
    }
  })
}

module.exports = mapFile;
