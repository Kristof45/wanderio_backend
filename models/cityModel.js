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

module.exports = {getCities, createCity, updateCity, deleteCity, getCitiesById}