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

async function getCitiesById(cityID) {
    const sql = 'SELECT * FROM cities WHERE cityID=?'
    const [result] = await db.query(sql, cityID)

    return result
}

async function getCityDetails(cityID) {
    // 1. Alap városi adatok lekérése (Változatlan)
    const citySql = 'SELECT * FROM `cities` WHERE `cityID` = ?';
    const [cityResult] = await db.query(citySql, [cityID]);

    if (cityResult.length === 0) {
        return null;
    }
    const city = cityResult[0];

    // Dinamikusan összerakjuk a szerver bázis URL-jét a .env fájl alapján.
    // Használunk alapértelmezett értékeket is, ha a .env-ben valami hiányozna.
    const host = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT || 4000;
    const serverBaseUrl = `http://${host}:${port}`;
    // Ez most ezt fogja eredményezni: 'http://127.0.0.1:4000'

    // 2. Város fő képeinek lekérése és URL összerakása
    const cityImagesSql = 'SELECT `cityImg` FROM `cityimage` WHERE `cityID` = ?';
    const [cityImagesResult] = await db.query(cityImagesSql, [cityID]);
    const cityImages = cityImagesResult.map(row => `${serverBaseUrl}${row.cityImg}`);

    // 3. Látnivalók és hotelek alapadatainak lekérése (Változatlan)
    const attractionsSql = 'SELECT `attractionID`, `name`, `description`, `address`, `price` FROM `attractions` WHERE `cityID` = ?';
    const [attractionsResult] = await db.query(attractionsSql, [cityID]);

    const hotelsSql = 'SELECT `hotelID`, `name`, `details`, `address` FROM `hotels` WHERE `cityID` = ?';
    const [hotelsResult] = await db.query(hotelsSql, [cityID]);

    // 4. Képek hozzárendelése (Változatlan logika, de a serverBaseUrl-t használja)
    const attractionsWithImages = await Promise.all(
        attractionsResult.map(async (attraction) => {
            const attractionImagesSql = 'SELECT `name` as `imageUrl` FROM `attractionimage` WHERE `attractionID` = ?';
            const [images] = await db.query(attractionImagesSql, [attraction.attractionID]);
            return {
                ...attraction,
                images: images.map(img => `${serverBaseUrl}${img.imageUrl}`)
            };
        })
    );

    const hotelsWithDetails = await Promise.all(
        hotelsResult.map(async (hotel) => {
            const hotelImgSql = 'SELECT `hotelImg` as `imageUrl` FROM `hotelimage` WHERE `hotelID` = ?';

            const [images] = await db.query(hotelImgSql, [hotel.hotelID])

            const cheapestRoomSql = `
                SELECT r.*, rt.type as typeName 
                FROM rooms r
                JOIN roomTypes rt ON r.typeId = rt.typeId
                WHERE r.hotelID = ?
                ORDER BY r.price ASC 
                LIMIT 1`;
            const [cheapestRoomResult] = await db.query(cheapestRoomSql, [hotel.hotelID]);

            return {
                ...hotel,
                images: images.map(img => `${serverBaseUrl}${img.imageUrl}`),
                cheapestRoom: cheapestRoomResult.length > 0 ? cheapestRoomResult[0] : null
            }
        })
    )

    // 5. Végső objektum összeállítása (Változatlan)
    return {
        ...city,
        images: cityImages,
        attractions: attractionsWithImages,
        hotels: hotelsWithDetails
    };
}


module.exports = { getCities, createCity, updateCity, deleteCity, getCitiesById, getCityDetails }