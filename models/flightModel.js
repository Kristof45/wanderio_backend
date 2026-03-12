const db = require('../db/db.js')

async function getAllFlights() {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID'
    const [result] = await db.query(sql)

    return result
}

async function searchFlight(starting) {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID WHERE Date(flights.starting) = ?'
    const [result] = await db.query(sql, [starting])

    return result
}

async function createFlight(airlineId, starting, arivval, price) {
    const sql = 'INSERT INTO `flights`(`airlineId`, `starting`, `arivval`, `price`) VALUES (?,?,?,?)'
    const [result] = await db.query(sql, [airlineId, starting, arivval, price])

    return result
}

async function updateFlight(flightsId, airlineId, starting, arivval, price) {
    const sql = 'UPDATE `flights`SET `airlineId` = COALESCE(NULLIF(?, ""), `airlineId`),`starting` = COALESCE(NULLIF(?, ""), `starting`),`arivval` = COALESCE(NULLIF(?, ""), `arivval`),`price` = COALESCE(NULLIF(?, ""), `price`)WHERE `flightsId` = ?;'
    
    const [result] = await db.query(sql, [airlineId, starting, arivval, price, flightsId])

    return result
}

async function deleteFlight(flightsId) {
    const sql = 'DELETE FROM `flights` WHERE `flightsId`=?'
    const [result] = await db.query(sql, [flightsId])

    return result
}

module.exports = {getAllFlights, searchFlight, createFlight, updateFlight, deleteFlight}