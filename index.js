const express = require('express')
const axios = require('axios');

require('dotenv').config()

const app = express()
// 
const port = process.env.PORT || 3000

//app.set('views', './views')
//view engine
// app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.redirect('/all/1')
   
})
app.get('/all/:page', (req, res) => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=883f115815f6852afc0b44cfba336961&language=en-US&page=${req.params.page}`)
            .then(function (response) {
                // handle success
                console.log(response.data.results);
                res.render('index.ejs',{ page: Number(req.params.page), movies: response.data.results})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })
    // res.render('index.ejs',{ page: Number(req.params.page)})
    app.get('/detail/:id', (req, res) => {
        axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=883f115815f6852afc0b44cfba336961`)
            .then(function (response) {
                // handle success
                console.log(response.data.results);
                res.render('detail.ejs',{movie:response.data})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })
