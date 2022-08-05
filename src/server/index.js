require('dotenv').config()
console.log(process.env) // Remove after testing
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fetch = require('node-fetch')

const app = express()
const port = 3000

// API URL
// const mmURL = 'https://api.nasa.gov/mars-photos/api/v1/manifests/'

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})

app.use('/', express.static(path.join(__dirname, '../public')))

// Astronomy Picture of the Day API route
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
// Curiosity Rover routes
// Mars Rover Mission Manifest API route
app.get('/mission-curiosity', async (req, res) => {
    try {
        let mission = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ mission })
    } catch (err) {
        console.log('error', err);
    }
})

// Mar Rover Phtos API route
app.get('/photos-curiosity', async (req, res) => {
    try {
        let photos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ photos })
    } catch (err) {
        console.log('error', err)
    }
})

// Opportunity Rover routes
// Mars Rover Mission Manifest API route
app.get('/mission-opportunity', async (req, res) => {
    try {
        let mission = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ mission })
    } catch (err) {
        console.log('error', err);
    }
})

// Mar Rover Phtos API route
app.get('/photos-opportunity', async (req, res) => {
    try {
        let photos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ photos })
    } catch (err) {
        console.log('error', err)
    }
})

// Spirit Rover routes
// Mars Rover Mission Manifest API route
app.get('/mission-spirit', async (req, res) => {
    try {
        let mission = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ mission })
    } catch (err) {
        console.log('error', err);
    }
})

// Mar Rover Phtos API route
app.get('/photos-spirit', async (req, res) => {
    try {
        let photos = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ photos })
    } catch (err) {
        console.log('error', err)
    }
})