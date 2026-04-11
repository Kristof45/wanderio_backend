const {getRooms, createRoom, updateRoom, deleteRoom, adGetRoom } = require('../models/roomModel')

async function getrooms(req, res) {
    try {
        const result = await getRooms()
    } catch (err) {
        return res.status(500).json({error: 'Hiba a szobak lekeresekor'})
    }
}

async function createroom(req, res) {
    try {
        const {hotelID, typeId, available, price, guests, climate, arrival, starting, services, size} = req.body
        await createRoom(hotelID, typeId, available, price, guests, climate, arrival, starting, services, size)
        return res.status(201).json({message: 'Sikeres szoba letrehozas'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba uj szoba letrehozasakor'})
    }
}

async function updateroom(req, res) {
    try {
        const roomId = req.params.roomId
        const {hotelID, typeId, available, price, guests, climate, arrival, starting, services, size} = req.body
        await updateRoom({roomId, hotelID, typeId, available, price, guests, climate, arrival, starting, services, size} = req.body)
        return res.status(201).json({message: 'Sikeres szoba modositas'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a szoba modositasakor'})
    }
}

async function deleteroom(req, res) {
    try {
        const roomId = req.params.roomId
        await deleteRoom(roomId)
        return res.status(200).json({message: 'Sikeres szoba torles'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a szoba torlesekor'})
    }
}

async function adgetroom(req, res) {
    try {
        const result = await adGetRoom()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error: 'Hiba az admin szoba lekeresekor'})
    }
}

module.exports = { getrooms, createroom, updateroom, deleteroom, adgetroom }