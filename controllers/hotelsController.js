const { getHotelTypes, getHotels, createHotel, updateHotel, deleteHotel, uploadHotelImage, getAdHotel, getHotelDetails }= require('../models/hotelModel.js');
const cloudinary = require('../config/cloudinary.js')

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

async function hoteldetails(req, res) {
    try {
        const hotelID = req.params.hotelID
        const hotelData = await getHotelDetails(hotelID)

        if(!hotelData){
            return res.status(400).json({error:'Hotel is not found.'})
        }

        return res.status(200).json(hotelData)

    } catch (err) {
        console.log(err);
        
        return res.status(500).json({error:'Hiba a hoteldetails lekeresekor'})
    }
}

//kep feltoltes
async function uploadimage(req, res) {
    try {
        // 1. HIBAJAVÍTÁS: hotelID helyes kinyerése az URL paraméterből
        const  hotelID  = req.params.hotelID;

        // Ellenőrizzük, hogy van-e hotelID és vannak-e feltöltött fájlok
        if (!hotelID) {
            return res.status(400).json({ error: 'A hotel azonosítója (hotelID) kötelező.' });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Nincsenek képek feltöltve.' });
        }

        const uploadedUrls = [];

        // Végigmegyünk az összes feltöltött fájlon és feltöltjük őket Cloudinary-re
        for (const file of req.files) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "wanderio" }, // Javaslat: { folder: `wanderio/hotels/${hotelID}` }
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
                await uploadHotelImage(hotelID, url);
            }
        }

        // Sikeres válasz: Visszaküldjük a feltöltött képek URL-jeit.
        return res.status(201).json({
            message: `${uploadedUrls.length} kép sikeresen feltöltve a(z) ${hotelID} azonosítójú hotelhez.`,
            hotelImages: uploadedUrls
        });

    } catch (err) {
        console.error("Hiba a képfeltöltés során:", err); 
        return res.status(500).json({ error: 'Szerveroldali hiba kepfeltolteskor' });
    }
}

//admin hotelek lekerese
async function getadhotel(req, res) {
    try {
        const result = await getAdHotel()
        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({error: 'Hiba amikor az admin lekeri a hotel adatokat'})
    }
}

module.exports = { gethoteltypes, gethotels, createhotel, updatehotel, deletehotel, hoteldetails, uploadimage, getadhotel }