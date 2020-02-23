const request = require('request')

const geoCode = (address, callback) => {
    const geoToken = "pk.eyJ1IjoiaWFtdGFpZG8iLCJhIjoiY2s2bXp3ZXF4MHZuaTNlcGI4M244MXF5ayJ9.Q0er_8QYEqjoehWKleuo0A"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geoToken}`
    console.log(url)
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(response.body.features.length == 0){
            callback("Unable to find location. Try another search", undefined)
        } else{
            const data = response.body.features[0].center
            const coordinates = {
                placeName: response.body.features[0]['place_name'],
                longitude: data[0],
                lattitude: data[1]
            }
            callback(undefined, coordinates)
        }
    })
    
}

module.exports = geoCode