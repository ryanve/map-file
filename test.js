const mapFile = require("./")
const assert = require("assert")
const fs = require("fs")
const cp = require("child_process")
const path = require("path")
const utf8 = "utf8"
const folder = "test-folder"
const from = `${folder}/test-read.txt`
const original = "HELLO"
const method = "toLowerCase"
const transform = text => text[method]()
const cases = [
  `${folder}/test-write.txt`,
  `${folder}/deep/test-write.txt`
]

cp.exec(`rm -rf ${folder} && mkdir ${folder}`, err => {
  if (err) throw err
  console.log("created:", folder)
  console.log()
  fs.writeFile(path.resolve(from), original, err => {
    if (err) throw err
    cases.forEach(to => {
      mapFile({ from, to, map: text => {
        assert.strictEqual(text, original)
        console.log("read:", from)
        console.log("text:", original.trim())
        console.log()
        return transform(text)
      }}, err => {
        if (err) throw err
        fs.readFile(to, utf8, (err, output) => {
          if (err) throw err
          assert.strictEqual(output, transform(original))
          console.log("map:", method)
          console.log("wrote:", to)
          console.log("text:", output.trim())
          console.log()
        })
      })
    })
    cp.exec(`rm -rf ${folder}`, err => {
      if (err) throw err
      console.log("deleted:", folder)
      console.log()
      console.log("tests: passed =)")
      console.log(`node: ${process.version}`)
      console.log()
    })
  })
})
