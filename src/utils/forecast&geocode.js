const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/86cb883d579365c5dc72174f04fd9b2a/' + latitude + ',' + longitude + '?units=si'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find the temperature for the given coordinates', undefined)
        } else {
            callback(undefined, 'Temperature is: ' + response.body.currently.temperature)
        }
    })
}

const geocode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXNhZHNhZWVkIiwiYSI6ImNrM3F6ejc3NzA1OTgzZWxwb2s1em00NGEifQ.yCS98LxMtuk6tEY7qKdUHQ'

    request({ url: mapBoxUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the location services.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Coordinates not found for the given location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    forecast: forecast,
    geocode: geocode
}
