const {getCities, createCity, updateCity, deleteCity,getCityDetails, uploadCityImage } = require('../models/cityModel')
const cloudinary = require('../config/cloudinary.js')

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
        const {name, country, description} = req.body
        await updateCity(cityID, name, country, description)
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

async function getcitiesbyid(req, res){
    try {
        const cityID = req.params.cityID
        const result = await getCitiesById(cityID)

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a varos keresesekor id alapjan'})
    }
}

async function getcitydetails(req, res) {
    try {
        const cityID = req.params.cityID
        const result = await getCityDetails(cityID)

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({error: 'Hiba a varos reszletek keresesekor id alapjan'})
    }
}

async function uploadimage(req, res) {
    try {
        // 1. HIBAJAVÍTÁS: cityID helyes kinyerése az URL paraméterből
        const  {cityID}  = req.params

        // Ellenőrizzük, hogy van-e cityID és vannak-e feltöltött fájlok
        if (!cityID) {
            return res.status(400).json({ error: 'A hotel azonosítója (cityID) kötelező.' });
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
                await uploadCityImage(cityID, url);
            }
        }

        // Sikeres válasz: Visszaküldjük a feltöltött képek URL-jeit.
        return res.status(201).json({
            message: `${uploadedUrls.length} kép sikeresen feltöltve a(z) ${cityID} azonosítójú hotelhez.`,
            cityImages: uploadedUrls
        });

    } catch (err) {
        console.error("Hiba a képfeltöltés során:", err); 
        return res.status(500).json({ error: 'Szerveroldali hiba kepfeltolteskor' });
    }
}

module.exports = {getcities, createcity, updatecity, deletecity, getcitiesbyid, getcitydetails,uploadimage }