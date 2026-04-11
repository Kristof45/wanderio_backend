const db = require('../db/db')

async function getRooms() {
    const sql = 'SELECT * FROM `rooms`'
    const [result] = await db.query(sql)

    return result
}

async function createRoom(hotelID, typeId, available, price, guests, climate, arrival, starting, services, size) {
    const sql = 'INSERT INTO `rooms`( `hotelID`, `typeId`, `available`, `price`, `guests`, `climate`, `arrival`, `starting`, `services`, `size`) VALUES (?,?,?,?,?,?,?,?,?,?)'
    const [result] = await db.query(sql, [hotelID, typeId, available, price, guests, climate, arrival, starting, services, size])

    return result
}

async function updateRoom(roomId, hotelID, typeId, available, price, guests, climate, arrival, starting, services, sizeparams) {
    const sql = 'UPDATE `rooms` SET `hotelID`=?,`typeId`=?,`available`=?,`price`=?,`guests`=?,`climate`=?,`arrival`=?,`starting`=?,`services`=?,`size`=? WHERE `roomId`= ?'
    const [result] = await db.query(sql, [ hotelID, typeId, available, price, guests, climate, arrival, starting, services, size, roomId])

    return result
}

async function deleteRoom(roomId) {
    const sql = 'DELETE FROM `rooms` WHERE `roomId`=?'
    const [result] = await db.query(sql, [roomId])

    return result
}

async function adGetRoom() {
    const sql = 'SELECT r.roomId, h.name as hotelName, rt.type, r.available, r.price, r.guests, r.climate, r.arrival, r.starting, r.services, r.size FROM `rooms` AS r JOIN hotels AS h ON r.hotelID = h.hotelID JOIN roomtypes AS rt ON r.typeId = rt.typeId  '
    const [result] = await db.query(sql)

    return result
}

module.exports = {getRooms, createRoom, updateRoom, deleteRoom, adGetRoom }