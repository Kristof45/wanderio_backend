const {getHotelTypes,getHotels, createHotel, updateHotel, deleteHotel} = require('../models/hotelModel')


//hotelek lekerese type es ar alapjan

async function gethoteltypes(req,res){
    try {
        const result = await getHotelTypes()
        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Hiba a hoteltype lekeresekor'})
    }
}

//hotelek lekerese
async function gethotels(req, res) {
    try {
        const result = await getHotels()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a hotelek lekeresekor'})
    }
}

//hotel letrehozas
async function createhotel(req, res) {
    try {
        
        const {cityID, name, details, address} = req.body

        await createHotel(cityID, name, details, address)
        return res.status(201).json({message: 'Hotel letrehozva'})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Hiba a hotelek letrehozasakor'})
    }
}

//hotel adat modositas
async function updatehotel(req, res) {
    try {
        const hotelID = req.params.hotelID
        const {cityID, name, details, address} = req.body
        await updateHotel(cityID, hotelID, name, details, address)
        return res.status(201).json({message: 'Hotel adatok modositva'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a hotel modositasakor'})
    }
}

//hotel torles
async function deletehotel(req, res) {
    try {
        const hotelID = req.params.hotelID
        await deleteHotel(hotelID)
        return res.status(204).send()
    } catch (err) {
        return res.status(500).json({error: 'Hiba a hotel torlesekor'})
    }
}

module.exports = {gethoteltypes,gethotels, createhotel, updatehotel, deletehotel}