const db = require('../db/db')

async function createAirline(airline) {
    const sql = 'INSERT INTO `airlines`( `airline`) VALUES (?)'
    const [result] = await db.query(sql, [airline])
    //console.log(airline);
    return result
}

async function updateAirline(airlineID,airline) {
    const sql = 'UPDATE `airlines` SET `airline`=? WHERE `airlineID`=?'
    const [result] = await db.query(sql, [airline, airlineID])

    return result
}

async function deleteAirline(airlineID) {
    const sql ='DELETE FROM `airlines` WHERE `airlineID`=?'
    const [result] = await db.query(sql, [airlineID])

    return result
}

module.exports = {createAirline, updateAirline, deleteAirline}