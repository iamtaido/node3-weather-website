const request = require('request');

const weatherCode = ({lattitude, longitude} , callback) => {
    const url = `https://api.darksky.net/forecast/44f56579fc91205bf31b1f1add54bad0/${lattitude +","+longitude}`
    console.log(url)
    request({url: url, json:true}, (error, response) => {
        if(error){
            callback("unable to connect to weather service", undefined)
        } else if(response.body.error) {
            callback(response.body.error, undefined)
        } else {
            const data = response.body.currently
            callback(undefined, `The weather is currently ${data.temperature} degree out. There is ${data.precipProbability}% of rain!`)
        }
    })
}

module.exports = weatherCode