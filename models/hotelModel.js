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
    // 1. Segédfüggvény a relatív URL-ek javításához
    const host = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT || 4000;
    const serverBaseUrl = `http://${host}:${port}`;
    const fixUrl = (url) => url && !url.startsWith('http') ? `${serverBaseUrl}/${url}` : url;

    // 2. A hotel alap adatainak lekérdezése
    const [hotelResult] = await db.query('SELECT * FROM hotels WHERE hotelID = ?', [hotelID]);

    if (hotelResult.length === 0) {
        return null; // Ha nincs ilyen hotel, térjünk vissza null-lal
    }
    const hotel = hotelResult[0];

    // 3. A hotel összes képének lekérdezése (egyetlen hívás)
    const [hotelImgResult] = await db.query('SELECT hotelImg FROM hotelimage WHERE hotelID = ?', [hotelID]);
    hotel.images = hotelImgResult.map(row => fixUrl(row.hotelImg));

    // 4. A hotel összes szobájának ÉS a szobák képeinek lekérdezése EGYETLEN, HATÉKONY lekérdezéssel
    const roomsSql = `
        SELECT 
            r.*, 
            rt.type AS typeName,
            -- Összegyűjtjük az összes kép URL-t egy vesszővel elválasztott stringbe
            GROUP_CONCAT(ri.roomImg) AS roomImages 
        FROM 
            rooms r
        LEFT JOIN 
            roomtypes rt ON r.typeId = rt.typeId
        LEFT JOIN 
            -- A LEFT JOIN itt azért fontos, hogy a kép nélküli szobák is visszajöjjenek
            roomimage ri ON r.roomId = ri.roomId
        WHERE 
            r.hotelID = ?
        GROUP BY 
            r.roomId; -- Csoportosítunk szoba alapján, hogy minden szoba csak egyszer szerepeljen
    `;
    const [roomsResult] = await db.query(roomsSql, [hotelID]);

    // 5. A kapott eredmény feldolgozása a kliens számára
    // A 'GROUP_CONCAT' stringet itt alakítjuk át valódi képtömbbé.
    hotel.rooms = roomsResult.map(room => {
        return {
            ...room,
            images: (room.roomImages || '').split(',') // Ha roomImages null, üres stringből csinálunk tömböt
                    .filter(url => url) // Kiszűrjük az üres stringeket, ha a split eredménye az lenne
                    .map(fixUrl) // Minden URL-t "megjavítunk"
        };
    });

    // 6. Visszaadjuk a teljes, gazdagított hotel objektumot
    return hotel;
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

async function saveHotelBooking(userID, hotelID, roomID, days){
    const sql = ` INSERT INTO hotelorders (userID, hotelID, roomId, date, day, status) VALUES (?, ?, ?, NOW(), ?, 'pending')`

    try {
        const [result] = await db.query(sql,[userID, hotelID, roomID, days])
        return result
    } catch (error) {
        console.error("Adatbázis hiba a hotel foglalás mentésekor:", error);
        throw new Error("Adatbázis hiba a foglalás rögzítése során.");
    }
}

module.exports = { getHotelTypes, getHotels, createHotel, updateHotel, deleteHotel ,getHotelDetails, uploadHotelImage, getAdHotel, saveHotelBooking}