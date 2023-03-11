const Trip = require("../models/trip")

exports.index = async(req, res) => {
    res.render('index')
}
exports.locations = async(req, res) =>{
    try {
        const trips = await Trip.find({user: req.session.user.id})
        const locations = trips.map(trip=>{
            return {"lat": trip.lat, "lng": trip.lng}
        })
        res.json(locations)
    } catch (error) {
        res.json([]).status(500)
    }
}
exports.locationInfo = async(req, res) =>{
    try {
        const locationInfo = await Trip.findOne({lat: req.body.location.lat, lng: req.body.location.lng})
        res.json(locationInfo)
    } catch (error) {
        res.json({}).status(500)
    }
}