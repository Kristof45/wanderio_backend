const {getRooms, createRoom, updateRoom, deleteRoom, adGetRoom ,uploadRoomImage} = require('../models/roomModel')
const cloudinary = require('../config/cloudinary.js')

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
        await updateRoom(roomId, hotelID, typeId, available, price, guests, climate, arrival, starting, services, size)
        return res.status(201).json({message: 'Sikeres szoba modositas'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba a szoba modositasakor'})
    }
}

async function deleteroom(req, res) {
    try {
        const roomId = req.params.roomId
        await deleteRoom(roomId)
        return res.status(204).json({message: 'Sikeres szoba torles'})
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

async function uploadimage(req, res) {
      try {
        // 1. HIBAJAVÍTÁS: cityID helyes kinyerése az URL paraméterből
        const  {roomId}  = req.params

        // Ellenőrizzük, hogy van-e cityID és vannak-e feltöltött fájlok
        if (!roomId) {
            return res.status(400).json({ error: 'A room azonosítója (atroomId) kötelező.' });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Nincsenek képek feltöltve.' });
        }

        const uploadedUrls = [];

        // Végigmegyünk az összes feltöltött fájlon és feltöltjük őket Cloudinary-re
        for (const file of req.files) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'wabderio' }, // Javaslat: { folder: `wanderio/cities/${cityID}` }
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(file.buffer);
            });
            uploadedUrls.push(result.secure_url);
        }

        // 2. HIBAJAVÍTÁS: Az `uploadedUrls` tömbön kell végigmenni, nem egy üres `imageUrl`-t használni
        // Most, hogy megvannak az URL-ek, mentsük el őket az adatbázisba.
        if (uploadedUrls.length > 0) {
            // Végigmegyünk az összes frissen feltöltött URL-en...
            for (const url of uploadedUrls) {
                // ...és mindegyiket beszúrjuk az adatbázisba a megfelelő hotelID-val.
                // Itt hívjuk meg a modell függvényt, a HELYES adatokkal.
                await uploadRoomImage(roomId, url);
            }
        }

        // Sikeres válasz: Visszaküldjük a feltöltött képek URL-jeit.
        return res.status(201).json({
            message: `${uploadedUrls.length} kép sikeresen feltöltve a(z) ${roomId} azonosítójú hotelhez.`,
            roomImages: uploadedUrls
        });

    } catch (err) {
        console.error("Hiba a képfeltöltés során:", err); 
        return res.status(500).json({ error: 'Szerveroldali hiba kepfeltolteskor' });
    }
}

module.exports = { getrooms, createroom, updateroom, deleteroom, adgetroom ,uploadimage}