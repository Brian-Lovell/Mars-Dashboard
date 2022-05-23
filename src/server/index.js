require('dotenv').config()
console.log(process.env) // Remove after testing
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
})

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})

app.use('/', express.static(path.join(__dirname, '../public')))