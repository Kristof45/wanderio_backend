const { getHotelTypes, getHotels, createHotel, updateHotel, deleteHotel } = require('../models/hotelModel')
const cloudinary = require('cloudinary').v2

//hotelek lekerese type es ar alapjan

async function gethoteltypes(req, res) {
    try {
        const result = await getHotelTypes()
        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a hoteltype lekeresekor' })
    }
}

//hotelek lekerese
async function gethotels(req, res) {
    try {
        const result = await getHotels()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a hotelek lekeresekor' })
    }
}

//hotel letrehozas
async function createhotel(req, res) {
    try {

        const { cityID, name, details, address } = req.body

        // Ellenőrizzük, hogy vannak-e feltöltött fájlok
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Nincsenek képek feltöltve.' });
        }

        const uploadedUrls = [];
        //csak akkor fut le ha vannak feltoltott fájlok
        if (req.files && req.files.length > 0) {
            // Végigmegyünk az összes feltöltött fájlon
            for (const file of req.files) {
                // Promise-t használunk, hogy megvárhassuk a feltöltés végét async/await-tel
                const result = await new Promise((resolve, reject) => {
                    // Létrehozunk egy stream-et a Cloudinary-re
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "hotels" },
                        (error, result) => {
                            if (error) {
                                return reject(error); // Hiba esetén reject
                            }
                            resolve(result); // Siker esetén resolve
                        }
                    );

                    // A fájl bufferét (a kép adatait) elküldjük a stream-en keresztül
                    stream.end(file.buffer);
                });

                // A feltöltés után kapott biztonságos URL-t hozzáadjuk a listához
                uploadedUrls.push(result.secure_url);
            }
        }

        await createHotel(cityID, name, details, address, uploadedUrls)
        return res.status(201).json({ message: 'Hotel letrehozva' })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Hiba a hotelek letrehozasakor' })
    }
}

//hotel adat modositas
async function updatehotel(req, res) {
    try {
        const hotelID = req.params.hotelID
        const { cityID, name, details, address } = req.body
        await updateHotel(cityID, hotelID, name, details, address)
        return res.status(201).json({ message: 'Hotel adatok modositva' })
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a hotel modositasakor' })
    }
}

//hotel torles
async function deletehotel(req, res) {
    try {
        const hotelID = req.params.hotelID
        await deleteHotel(hotelID)
        return res.status(204).send()
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a hotel torlesekor' })
    }
}

module.exports = { gethoteltypes, gethotels, createhotel, updatehotel, deletehotel }