const Trip = require("../models/trip")

exports.list = async(req, res) => {
    let searchOptions = {}
    searchOptions.user =  req.session.user.id
    if (req.query.keyword != null && req.query.keyword !== ''){
        searchOptions.name = new RegExp(req.query.keyword, 'i')
    }

    try {
        const trips = await Trip.find(searchOptions)
        res.render('trip/index', {trips: trips})
    } catch (error) {
        res.redirect('/')
    }

}

exports.new = async(req, res) => {
    res.render('trip/new', {trip: new Trip()})
}

exports.newPost = async(req, res) => {
    let images = []
    let thumbnail
    if (req.body.images !== ''){
        if (!Array.isArray(req.body.images)){
            images = [req.body.images] 
            thumbnail = images[0]
        }else{
            images = req.body.images
            if (req.body.thumbnail != ''){
                thumbnail = req.body.thumbnail
            }
        }
    }
    const trip = new Trip({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        description: req.body.description,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        images: images,
        thumbnail: thumbnail,
        user: req.session.user.id
    })

    try{
        await trip.save()
        res.redirect(`/trips/${trip.id}`)
    }catch (error) {
        res.render('trip/new', {
            trip: trip,
            errorMessage: 'Error Creating Trip'
        })
    }
}

exports.editTrip = async(req, res)=>{
    try {
        const trip = await Trip.findById(req.params.id)
        res.render('trip/edit', {trip: trip})
    } catch (error) {
        res.redirect('/trips')
    }
}

exports.updateTrip = async(req, res) =>{
    let trip
    try {
        trip = await Trip.findById(req.params.id)
        trip.name = req.body.name
        trip.lat = req.body.lat
        trip.lng = req.body.lng
        trip.description = req.body.description
        trip.startDate = req.body.startDate
        trip.endDate = req.body.endDate
        trip.images = req.body.images
        trip.thumbnail = req.body.thumbnail
    } catch (error) {
        if (trip == null) {
            res.redirect('/')
        } else {
            res.render('trip/edit', {
                trip: trip,
                errorMessage: 'Error Updating Trip'
            })
        }
    }
}

exports.deleteTrip = async(req, res) => {
    let trip
    try {
        console.log(req.params.id)
        trip = await Trip.findById(req.params.id)
        console.log(trip)
        await trip.remove()
        res.redirect('/trips')
    } catch (error) {
        console.log(error)
        if (trip == null) {
            res.redirect('/')
        } else {
            res.redirect(`/trips/${trip.id}`)
        }
    }
}


exports.tripDetails = async(req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
        res.render('trip/show', { trip: trip })
    } catch (error) {
        res.redirect('/trips')
    }
}

