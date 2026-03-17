const {getAirlines, createAirline, updateAirline, deleteAirline} = require('../models/airlineModel')

//airline-ok lekerdezese
async function getairlines(req, res) {
    try {
        const result = await getAirlines()

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json('Hiba az airline-ok lekerdezesekor')
    }
}

//uj airline
async function createairline(req, res) {
    try {
        const {airline} = req.body
        //console.log(airline);
        const {insertId} = await createAirline(airline)
        return res.status(201).json('Uj airline letrehozva', insertId)
    } catch (err) {
        //console.log(err);
        return res.status(500).json('Hiba uj airline letrehozasakor')
    }
}

//airline modositasa
async function updateairline(req, res) {
    try {
        const {airlineID,airline} = req.body

        await updateAirline(airlineID,airline)
        return res.status(201).json('Sikeres airline modositas')
    } catch (err) {
        return res.status(500).json('Hiba az airline modositasakor')
    }
}

//airline torles
async function deleteairline(req, res) {
    try {
        const {airlineID} = req.body

        await deleteAirline(airlineID)
        return res.status(200).json('Sikeres airline torles')
    } catch (err) {
        return res.status(500).json('Hiba az airline torlesekor')
    }
}

module.exports = {getairlines, createairline, updateairline, deleteairline}