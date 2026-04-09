const db = require('../db/db')

async function getHotelTypes() {
    const sql = 'SELECT hotelimage.hotelImg, hotels.name, hotels.details, rooms.guests,rooms.price, roomtypes.type FROM `hotels` INNER JOIN hotelimage ON hotels.hotelID = hotelimage.hotelID INNER JOIN rooms ON hotels.hotelID= rooms.hotelID INNER JOIN roomtypes ON rooms.typeId = roomtypes.typeId INNER JOIN cities ON hotels.cityID = cities.cityID;'
    const [result] = await db.query(sql)

    return result
}

async function getHotels() {
    const sql = 'SELECT * FROM `hotels`'
    const [result] = await db.query(sql)

    return result
}

async function createHotel(cityID, name, details, address, uploadedUrls) {
    // Átalakítjuk a kép URL tömböt JSON sztringgé az adatbázis számára
    const hotelImagesJSON = JSON.stringify(uploadedUrls || []);

    const sql = 'INSERT INTO `hotels`(cityID, `name`, `details`, `address`, ) VALUES (?, ?, ?, ?)'
    const [hotelResult] = await db.query(sql, [cityID, name, details, address])
    const newHotelID = hotelResult.insertId;
    // Ha vannak feltöltött képek, elmentjük őket a külön táblában
    if (uploadedUrls && uploadedUrls.length > 0) {
        // Batch insert: gyorsabb mint egyenkénti beszúrás minden képhez
        const imageValues = uploadedUrls.map(url => [newHotelID, url]);
        const imageSql = 'INSERT INTO `hotellmage`(hotelID, hotellmg) VALUES ?';
        await db.query(imageSql, [imageValues]);
    }

    return hotelResult
}

async function updateHotel(cityID, hotelID, name, details, address) {
    const sql = 'UPDATE `hotels` SET cityID = COALESCE(NULLIF (?, ""), `cityID`), `name`= COALESCE(NULLIF (?, ""), `name`), `details`= COALESCE(NULLIF (?, ""), `details`), `address`= COALESCE(NULLIF (?, ""), `address`) WHERE `hotelID` = ?'
    const [result] = await db.query(sql, [cityID, name, details, address, hotelID])

    return result
}

async function deleteHotel(hotelID) {
    const sql = 'DELETE FROM `hotels` WHERE `hotelID`=?'
    const [result] = await db.query(sql, [hotelID])

    return result
}

async function getHotelDetails(hotelID) {
    const sql =  'SELECT * FROM hotels WHERE hotelID = ?'
    const [hotelResult] = await db.query(sql, [hotelID])

    if (hotelResult.length === 0) {
        return null
    }
    const hotel = hotelResult[0]

    const host = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT || 4000;
    const serverBaseUrl = `http://${host}:${port}`;

    const hotelImgSql = 'SELECT hotelImg as imgUrl FROM hotelimage WHERE hotelID=?'
    const [hotelImg] = await db.query(hotelImgSql, [hotelID])
    const hotelImages = hotelImg.map(row => `${serverBaseUrl}${row.imgUrl}`)

    const roomsSql =
        `SELECT r.*, rt.type as typeName 
        FROM rooms r
        JOIN roomTypes rt ON r.typeId = rt.typeId
        WHERE r.hotelID = ?`;
    const [roomsResult] = await db.query(roomsSql, [hotelID]);

    const roomWithImages = await Promise.all(
        roomsResult.map(async (room) =>{
            const roomImagesSql = 'SELECT roomImg as imgUrl FROM roomimage WHERE roomID = ? '
            const [images] = await db.query(roomImagesSql, [room.roomID])
            return{
                ...room,
                images: images.map(img=> `${serverBaseUrl}${img.imgUrl}`)
            }
        })
    )

    return {
        ...hotel,
        images: hotelImages,
        rooms: roomWithImages
    }
}

async function uploadHotelImage(hotelID, imageUrl) {
    const sql = 'INSERT INTO `hotelimage` (`hotelID`, `hotelImg`) VALUES (?, ?)';
    const [result] = await db.query(sql, [hotelID, imageUrl]);
    
    return result;
}

async function getAdHotel() {
    const sql = 'SELECT hotels.`hotelID`,cities.name AS `cityname`,hotels.`name`,hotels.`details`,hotels.`address`, hotelimage.hotelImg FROM `hotels` LEFT JOIN hotelimage ON hotels.hotelID = hotelimage.hotelID JOIN cities ON hotels.cityID = cities.cityID;'
    const [result] = await db.query(sql)

    return result
}

module.exports = { getHotelTypes, getHotels, createHotel, updateHotel, deleteHotel ,getHotelDetails, uploadHotelImage, getAdHotel}