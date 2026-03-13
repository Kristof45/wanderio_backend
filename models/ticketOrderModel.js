const db = require('../db/db')

async function getTicketOrders() {
    const sql = 'SELECT * FROM `ticketorders`'
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

async function deleteTicketOrder(orderID, userID) {
    const sql = 'DELETE FROM `ticketorders` WHERE `orderID`= ? AND `userID`=?'
    const [result] = await db.query(sql, [orderID, userID])

    return result
}

module.exports = {getTicketOrders, getTicketOrder, createTicketOrder, updateTicketStatus, deleteTicketOrder}