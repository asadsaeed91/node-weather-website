const path = require('path')
const geoCodeAndForecast = require('./utils/forecast&geocode')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(publicDirectoryPath + '\n' + viewsPath +  '\n' + partialsPath)

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('',{
        title: 'Weather',
        author: 'created by Asad',
        footerText: 'Footer Root!'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Title: About Page',
        author: 'created by Asad',
        footerText: 'This is footer for about!'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{ 
        msg: 'Help will be provided.',
        command: 'command to seek help for!',
        title: 'Title: This one is about Help',
        footerText: 'This is footer for help!'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            address: 'The address is necessary to process your request'
        })
    }

    geoCodeAndForecast.geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: 'Error occurred! ' + error
            })
        }

        geoCodeAndForecast.forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                Response: 'Response received for location: ' + location + '. Weather details: '
                + forecastData,
                location: location 
            })
        })
    })
})
app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})