# [`map-file`](https://www.npmjs.com/package/map-file)
Map a file into another file in Node.js

```
npm install map-file
```

## API

### <code>mapFile({from, to, map=<var>identity</var>}, callback=<var>done</var>)</code>

- `from` is the reading filename. It may be relative or absolute.
- `to` is the writing filename. It may be relative or absolute.
- `map` is the function you use to map the content. The default returns the original text.
- `callback` is a function to call after mapping. The default throws errors and logs success.

## Usage

```js
const mapFile = require("map-file")
```

### Copy file

```js
mapFile({
  from: "original.css",
  to: "copy.css",
})
```

### Trim file

```js
mapFile({
  from: "example.css",
  to: "example.css",
  map: text => text.trim(),
})
```

### Slice file

```js
mapFile({
  from: "full.md",
  to: "summary.md",
  map: text => text.slice(0, 200),
})
```

### Callback

```js
mapFile({
  from: "source.txt",
  to: "target.txt",
  map: text => text,
}, err => {
  if (err) throw err
  // ...
})
```
