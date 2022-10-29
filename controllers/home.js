const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../models')

//displays that seasonal anime in home page.
router.get('/', (req, res)=>{
    let animeUrl = `https://api.jikan.moe/v4/seasons/now`;
    // Use request to call the API
    axios.get(animeUrl)
    .then(apiResponse => {
        let anime = apiResponse.data.data
    //   console.log(apiResponse.data.data)
      res.render('home.ejs', {animeRec: anime} )
    })
    .catch(err=>res.send(err))
    })



    //displays the search results.
router.get('/results', (req, res)=>{
    let animeUrl = `https://api.jikan.moe/v4/anime?q=${req.query.searchAnime}`
    // Use request to call the API
    axios.get(animeUrl)
    .then(apiResponse => {
        let anime = apiResponse.data.data
        // console.log(apiResponse.data.data)
        res.render('results.ejs', {animeRec: anime})
    })
    .catch(err=>res.send(err))
    })



    //displays results of image search.
router.get('/imageSearchResults', (req,res)=>{
    url =   `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
        req.query.searchAnimeImage
        )}`
    
    axios.request(url)
    .then(function (response) {
        res.render('imageSearch.ejs', {pic: response.data})
        // console.log(response.data)
    }).catch(function (error) {
        console.error(error)
        res.status(400).render('main/404')
    });
})


module.exports = router

