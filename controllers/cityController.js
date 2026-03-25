const {getCities, createCity, updateCity, deleteCity} = require('../models/cityModel')

async function getcities(req, res) {
    try {
        const result = await getCities()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a varosok lekerdezesekor'})
    }

}

async function createcity(req, res) {
    try {
        const {name, country} = req.body
        await createCity(name, country)
        return res.status(201).json({message: 'Sikeres varos letrehozas'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a varos letrehozasakor'})
    }
}

async function updatecity(req, res) {
    try {
        const cityID = req.params.cityID
        const {name, country} = req.body
        await updateCity(cityID, name, country)
        return res.status(201).json({message: 'Sikeres varos modositas'})
    } catch (err) {
        //console.log(err);
        return res.status(500).json({error: 'Hiba a varos modositasakor'})
    }
}

async function deletecity(req, res) {
    try {
        const cityID = req.params.cityID
        await deleteCity(cityID)
        return res.status(204).send()
    } catch (err) {
        return res.status(500).json({error: 'Hiba a varos torlesekor'})
    }
}

module.exports = {getcities, createcity, updatecity, deletecity}