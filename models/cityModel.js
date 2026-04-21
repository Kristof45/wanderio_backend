const db = require('../db/db')

async function getCities() {
const sql = 'SELECT c.*, GROUP_CONCAT(ci.cityImg) AS cityImages FROM cities c LEFT JOIN cityimage ci ON c.cityID = ci.cityID GROUP BY c.cityID;';
    
    const [cities] = await db.query(sql);

    // FONTOS LÉPÉS: A stringből (pl. "url1,url2") tömböt ([ "url1", "url2" ]) csinálunk.
    const citiesWithImageArray = cities.map(city => {
        return {
            ...city,
            cityImages: city.cityImages ? city.cityImages.split(',') : []
        };
    });

    return citiesWithImageArray;
}

async function createCity(name, country) {
    const sql = 'INSERT INTO `cities`( `name`, `country`) VALUES (?,?)'
    const [result] = await db.query(sql, [name, country])

    return result
}

async function updateCity(cityID, name, country, description) {
    const sql = 'UPDATE `cities` SET `name`= COALESCE(NULLIF(?, ""), `name`), `country`= COALESCE(NULLIF(?, ""), `country`) WHERE `cityID`=?'
    const [result] = await db.query(sql, [name, country, cityID, description])

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

    // 1. Város adatai + Képei (külön lekérdezés, mert a galéria nem fér el egy JOIN-ban)
    const [cities] = await db.query('SELECT * FROM cities WHERE cityID = ?', [cityID]);
    if (!cities.length) return null;
    const city = cities[0];

    const [cityImgs] = await db.query('SELECT cityImg FROM cityimage WHERE cityID = ?', [cityID]);
    city.images = cityImgs.map(i => i.cityImg);

    // 2. Látnivalók (JOIN-nal, mint az adminban)
    const [attractions] = await db.query(`
        SELECT a.*, ai.name as mainImg 
        FROM attractions a 
        LEFT JOIN attractionimage ai ON a.attractionID = ai.attractionID 
        WHERE a.cityID = ? 
        GROUP BY a.attractionID`, [cityID]);
    city.attractions = attractions.map(a => ({ ...a, images: a.mainImg?  [a.mainImg] : [] }));

    // 3. HOTELEK + KÉP + LEGOLCSÓBB SZOBA (Egyetlen SQL kérésben!)
    const [hotels] = await db.query(`
        SELECT 
            h.*, 
            hi.hotelImg,
            r.price as roomPrice, 
            r.guests as roomGuests, 
            rt.type as roomTypeName
        FROM hotels h
        LEFT JOIN hotelimage hi ON h.hotelID = hi.hotelID
        LEFT JOIN (
            SELECT hotelID, MIN(price) as minPrice 
            FROM rooms GROUP BY hotelID
        ) min_r ON h.hotelID = min_r.hotelID
        LEFT JOIN rooms r ON h.hotelID = r.hotelID AND r.price = min_r.minPrice
        LEFT JOIN roomTypes rt ON r.typeId = rt.typeId
        WHERE h.cityID = ?
        GROUP BY h.hotelID`, [cityID]);

    // Itt csak formázzuk az eredményt, hogy a frontendnek ne kelljen változnia
    city.hotels = hotels.map(h => ({
        ...h,
        images:  h.hotelImg ? [h.hotelImg] : [],
        cheapestRoom: h.roomPrice ? {
            price: h.roomPrice,
            guests: h.roomGuests,
            typeName: h.roomTypeName
        } : null
    }));

    return city;
}

async function uploadCityImage(cityID, imageUrl){
    const sql = 'INSERT INTO `cityimage` (`cityID`, `cityImg`) VALUES (?, ?)';
    const [result] = await db.query(sql, [cityID, imageUrl]);
    
    return result;
}

module.exports = { getCities, createCity, updateCity, deleteCity, getCitiesById, getCityDetails,uploadCityImage }