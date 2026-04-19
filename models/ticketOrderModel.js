const db = require('../db/db')

async function getTicketOrders() {
    const sql = 'SELECT t.orderID, t.userID, u.username, f.flightsId, f.starting, f.arivval, a.airline AS airlineName, dep_city.name AS departureCityName, dest_city.name AS destinationCityName, t.status FROM ticketOrders AS t JOIN users AS u ON t.userID = u.userID JOIN flights AS f ON t.flightsId = f.flightsId JOIN airlines AS a ON f.airlineID = a.airlineID JOIN cities AS dep_city ON f.departureCityID = dep_city.cityID JOIN cities AS dest_city ON f.destinationCityID = dest_city.cityID ORDER BY t.orderID DESC;'
    const [result] = await db.query(sql)

    return result
}

async function getTicketOrder(userID) {
    const sql = 'SELECT * FROM `ticketorders` WHERE `userID`=?'
    const [result] = await db.query(sql, [userID])

    return result
}

async function createTicketOrder(userID, airlineId, status) {
    const sql = 'INSERT INTO `ticketorders`( `userID`, `airlineId`, `status`) VALUES (?,?,?)'
    const [result] = await db.query(sql, [userID, airlineId, status])

    return {insertId: result.insertId}
}

async function updateTicketStatus(orderID, status) {
    const sql = 'UPDATE `ticketorders` SET `status`=? WHERE `orderID`=?'
    const [result] = await db.query(sql, [status, orderID])

    return result
}

async function deleteTicketOrder(orderID) {
    const sql = 'DELETE FROM `ticketorders` WHERE `orderID`= ? '
    const [result] = await db.query(sql, [orderID])

    return result
}

module.exports = {getTicketOrders, getTicketOrder, createTicketOrder, updateTicketStatus, deleteTicketOrder}