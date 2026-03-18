const {getHotelOrd, createHotelOrd, updateHotOrdStat, deleteHotelOrd} = require('../models/hotelOrdersModel')

//hotel orders lekerese
async function gethotelord(req, res) {
    try {
        const result = await getHotelOrd()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error : 'Hiba a hotel orders lekeresekor'})
    }
}

//uj hotel order letrehozas
async function createhotelord(req, res) {
    try {
        const {userID, date, day, status} = req.body

        const insertId = await createHotelOrd(userID, date, day, status)
        return res.status(201).json({message: 'Sikeres hotel order leadas', insertId})
    } catch (err) {
        return res.status(500).json({error: 'Hiba hotel order letrehozasakor'})
    }
}

//hotel order status update
async function updatehotordstat(req, res) {
    try {
        const orderID = req.params.orderID
        const {status} = req.body
        console.log(orderID, status);
        await updateHotOrdStat(orderID, status)
        
        return res.status(201).json({message: 'Sikeres status modositas'})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Hiba hotel order frissitesekor'})
    }
}

//hotel order delete
async function deletehotelord(req, res) {
    try {
        const orderID = req.params.orderID
        //console.log(orderID);
        await deleteHotelOrd(orderID)
        return res.status(200).json({message: 'Sikeres hotel order torles'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba hotel order torlesekor'})
    }
}

module.exports = {gethotelord, createhotelord, updatehotordstat, deletehotelord}