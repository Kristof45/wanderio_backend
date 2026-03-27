const {getAttractions, createAtt, updateAtt, deleteAtt, getAttractionsImg} = require('../models/attractionModel')

async function getattractions(req, res) {
    try {
        const result = await getAttractions()
        return res.status(200).json(result)
    } catch (err) {
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
        const {cityID, name, description, address, price, image} = req.body
        await updateAtt(attractionID, cityID, name, description, address, price, image)
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
        return res.status(204).send()
    } catch (err) {
        return res.status(500).json({error: 'Hiba az atrakciok torlesekor'})
    }
}

module.exports = {getattractions, createatt, updateatt, deleteatt,getattractionsimg}