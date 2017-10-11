const mapFile = require("./map-file")
const assert = require("assert")
const fs = require("fs")
const from = "test-read.txt"
const to = "test-write.txt"
const utf8 = "utf8"
const transform = text => text.toLowerCase()

fs.readFile(from, utf8, (err, original) => {
  mapFile({ from, to, map: text => {
    assert.strictEqual(text, original)
    console.log(from, original.trim())
    return transform(text)
  }}, err => {
    if (err) throw err
    fs.readFile(to, utf8, (err, output) => {
      if (err) throw err
      console.log(to, output.trim())
      assert.strictEqual(output, transform(original))
      console.log("Tests passed =)")
    })
  })
})
