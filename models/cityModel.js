const db = require('../db/db')

async function getCities() {
    const sql = 'SELECT * FROM `cities`'
    const [result] = await db.query(sql)

    return result
}

async function createCity(name, country) {
    const sql = 'INSERT INTO `cities`( `name`, `country`) VALUES (?,?)'
    const [result] = await db.query(sql, [name, country])

    return result
}

async function updateCity(cityID, name, country) {
    const sql = 'UPDATE `cities` SET `name`= COALESCE(NULLIF(?, ""), `name`), `country`= COALESCE(NULLIF(?, ""), `country`) WHERE `cityID`=?'
    const [result] = await db.query(sql, [name, country, cityID])

    return result
}

async function deleteCity(cityID) {
    const sql = 'DELETE FROM `cities` WHERE `cityID`=?'
    const [result] = await db.query(sql, [cityID])

    return result
}

async function getCitiesById(cityID){
    const sql ='SELECT * FROM cities WHERE cityID=?'
    const [result] = await db.query(sql, cityID)

    return result
}

async function getCityDetails(cityID) {
    const citySql = 'SELECT * FROM cities WHERE cityID = ?';
    const [cityResult] = await db.query(citySql, [cityID]);
    
    if (cityResult.length === 0) {
        return null;
    }

    const city = cityResult[0]

    const imagesSql = 'SELECT cityImg FROM cityimage WHERE cityID = ?';
    const [imagesResult] = await db.query(imagesSql, [cityID]);
    
    const images = imagesResult.map(img => img.cityImg);


    const attractionsSql = 'SELECT attractionID, name, description, address, price FROM attractions WHERE cityID = ?';
    const [attractions] = await db.query(attractionsSql, [cityID]);
    

    const hotelsSql = 'SELECT hotelID, name, details, address FROM hotels WHERE cityID = ?';
    const [hotels] = await db.query(hotelsSql, [cityID]);

    return {
        ...city, // cityID, name, country, (és description, ha hozzáadod)
        images: images,
        attractions: attractions,
        hotels: hotels
    };
}

module.exports = {getCities, createCity, updateCity, deleteCity, getCitiesById, getCityDetails}