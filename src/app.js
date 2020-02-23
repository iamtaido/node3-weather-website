const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./../utils/geocode')
const forcast = require('./../utils/weathercode.js')

//generate express application
const app = express() 

//set up handlebars (used for dynamic pages)
app.set('view engine', 'hbs')

//changes views (required folder) location 
const viewTemplate = path.join(__dirname, "../templates/views" )
app.set('views', viewTemplate)

//set up partials (reusing templates per say)
const partialsPath = path.join(__dirname, '../templates/partials' )
hbs.registerPartials(partialsPath)

//set up static pages and allow us to retrieve them
const publicDirectoryPath = path.join(__dirname, "../public")
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        text: "too cool",
        name: 'some faggot',
        page: "Home"
    })
})

app.get('/about', (req , res) => {
    res.render('about.hbs', {
        name: "LUFFY D MONKEY",
        page: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render("help.hbs", {
        page: "Help"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "help page not found"
    })
})

// geoCode("lilburn", (err, res) => {
//     console.log(err, res)
// })

app.get('/weather', (req, res) => {

    const address = req.query.address

    if(address){

         return geoCode(address, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }
    
            forcast(data, (error, response) => {
                if(error){
                    return res.send({
                        error
                    })
                }

                return res.send({
                    location: data.placeName,
                    forcast: response
                })
        
            })
        })
    }

    res.send({
        error: "404 Nigga, please put a valid address!"
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        error: "404 error"
    })
})

//starting the server up
app.listen(3000, () => {
    console.log("server is up on port 3000.")
})









































































































//SIDE NOTES//

/*
req - object containing info about the incoming request 
res contains a bunch of methods allowing us to customize what we're going to send back

app.get('/about', (req, res) => {
    res.send("about page")
})
*/