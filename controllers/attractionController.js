const {getAttractions, createAtt, updateAtt, deleteAtt, getAttractionsImg, uploadAttractionImage} = require('../models/attractionModel')
const cloudinary = require('../config/cloudinary.js')

async function getattractions(req, res) {
    try {
        const result = await getAttractions()
        return res.status(200).json(result)
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({error: 'Hiba az atrakciok lekeresekor'})
    }
}

//attractions osszekotve a attractionImg vel
async function getattractionsimg(req,res){
    try {
        const result = await getAttractionsImg()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error:'Hiba a attImg lekeresekor'})
    }
}

async function createatt(req, res) {
    try {
        const {cityID, name, description, address, price, image} = req.body
        await createAtt(cityID, name, description, address, price, image)
        return res.status(201).json({message: 'Sikeres attrakcio letrehozas'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba uj atrakciok letrehozasakor'})
    }
}

async function updateatt(req, res) {
    try {
        const attractionID = req.params.attractionID
        const {cityID, name, description, address, price} = req.body
        await updateAtt(attractionID, cityID, name, description, address, price)
        return res.status(201).json({message: 'Sikeres modositas'})
    } catch (err) {
        //console.log(err);
        return res.status(500).json({error: 'Hiba az atrakciok modositasakor'})
    }
}

async function deleteatt(req, res) {
    try {
        const attractionID = req.params.attractionID
        await deleteAtt(attractionID)
        return res.status(200).json({message: 'Sikeres atrakcio törles'})
    } catch (err) {
        return res.status(500).json({error: 'Hiba az atrakciok torlesekor'})
    }
}

async function uploadimage(req,res) {
    try {
        // 1. HIBAJAVÍTÁS: cityID helyes kinyerése az URL paraméterből
        const  {attractionID}  = req.params

        // Ellenőrizzük, hogy van-e cityID és vannak-e feltöltött fájlok
        if (!attractionID) {
            return res.status(400).json({ error: 'A hotel azonosítója (attractionID) kötelező.' });
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
                await uploadAttractionImage(attractionID, url);
            }
        }

        // Sikeres válasz: Visszaküldjük a feltöltött képek URL-jeit.
        return res.status(201).json({
            message: `${uploadedUrls.length} kép sikeresen feltöltve a(z) ${attractionID} azonosítójú hotelhez.`,
            attractionImages: uploadedUrls
        });

    } catch (err) {
        console.error("Hiba a képfeltöltés során:", err); 
        return res.status(500).json({ error: 'Szerveroldali hiba kepfeltolteskor' });
    }
}

module.exports = {getattractions, createatt, updateatt, deleteatt,getattractionsimg,uploadimage}