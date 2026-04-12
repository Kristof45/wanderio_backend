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

async function updateRoom(roomId, hotelID, typeId, available, price, guests, climate, arrival, starting, services, size) {
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
    const sql = `
        SELECT 
            r.*, 
            h.name as hotelName,
            rt.type as type,
            GROUP_CONCAT(ri.roomImg) AS roomImages 
        FROM 
            rooms r
        LEFT JOIN 
            roomimage ri ON r.roomId = ri.roomId
        LEFT JOIN 
            hotels h ON r.hotelID = h.hotelID
        LEFT JOIN
            roomtypes rt on r.typeId = rt.typeId
        GROUP BY 
            r.roomId
    `;
    const [rooms] = await db.query(sql);

    // FONTOS: A stringből tömböt csinálunk!
    const result = rooms.map(room => ({
        ...room, roomImages: room.roomImages ? room.roomImages.split(',') : []
    }));
    return result;
}

async function uploadRoomImage(roomId, imageUrl) {
    const sql = 'INSERT INTO `roomimage` (`roomId`, `roomImg`) VALUES (?, ?)'
    const result = await db.query(sql, [roomId, imageUrl])

    return result
}

module.exports = {getRooms, createRoom, updateRoom, deleteRoom, adGetRoom ,uploadRoomImage}