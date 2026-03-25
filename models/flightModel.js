const db = require('../db/db.js')

async function getAllFlights() {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID'
    const [result] = await db.query(sql)

    return result
}

async function searchFlight(starting, departure, destination) {
    const sql = 'SELECT *, airlines.airline FROM `flights` JOIN airlines ON flights.airlineId = airlines.airlineID WHERE Date(flights.starting) = ? AND flights.departure = ? AND flights.destination=?'
    const [result] = await db.query(sql, [starting, departure, destination])

    return result
}

async function createFlight(airlineId, starting, arivval, price, departureCityID, destinationCityID) {
    const sql = 'INSERT INTO `flights`(`airlineId`, `starting`, `arivval`, `price`, departureCityID, destinationCityID) VALUES (?,?,?,?,?,?)'
    const [result] = await db.query(sql, [airlineId, starting, arivval, price, departureCityID, destinationCityID])

    return result
}

async function updateFlight(flightsId, airlineId, starting, arivval, price, departureCityID, destinationCityID) {
    const sql = 'UPDATE `flights`SET `airlineId` = COALESCE(NULLIF(?, ""), `airlineId`), `starting` = COALESCE(NULLIF(?, ""), `starting`), `arivval` = COALESCE(NULLIF(?, ""), `arivval`),`price` = COALESCE(NULLIF(?, ""), `price`), departureCityID = COALESCE(NULLIF(?, ""), `departureCityID`), destinationCityID = COALESCE(NULLIF(?, ""), `destinationCityID`) WHERE `flightsId` = ?;'
    
    const [result] = await db.query(sql, [airlineId, starting, arivval, price, departureCityID, destinationCityID, flightsId])

    return result
}

async function deleteFlight(flightsId) {
    const sql = 'DELETE FROM `flights` WHERE `flightsId`=?'
    const [result] = await db.query(sql, [flightsId])

    return result
}

module.exports = {getAllFlights, searchFlight, createFlight, updateFlight, deleteFlight}