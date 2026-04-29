# Wanderio
## A projektrõl
> A Wanderio egy komplex utazásfoglaló platform, amely lehetõvé teszi a felhasználók számára, hogy repülõjegyeket és hotelszobákat keressenek, böngésszenek és foglaljanak le. Az alkalmazás egy modern, két részbõl álló architektúrára épül: egy React alapú, dinamikus frontend felületre, ami a Netlify-on fut, és egy robusztus Node.js backendre, ami a MySQL adatbázissal kommunikál. A projekt célja, hogy egy teljes körû, felhasználóbarát utazási élményt nyújtson, az adminisztrációs felülettõl kezdve egészen a végfelhasználói foglalási folyamatig.

## Készítette
	Tokai Kristóf (Backend, SQL adatbázis)
	Hegyi Vendel (Backend)

## Fejlesztési környezet
	Node.js
	Express.js
	MySql
	Cloudinary

## Adatbázis
A projekt adatbázisa több, egymással összekapcsolt táblából áll, hogy hatékonyan kezelje a felhasználókat, városokat, hoteleket, repülõjáratokat és a hozzájuk tartozó rendeléseket.

### Táblák listája:
+ users
+ cities
+ hotels
+ rooms
+ roomTypes
+ flights
+ airlines
+ attractions
+ hotelOrders
+ ticketOrders
+ cityImage, hotelImage, roomImage, airlineImage, attractionImage (képeket tároló kapcsolótáblák)

## Adatbázis diagram:

[Itt illeszd be a projekt adatbázis diagramjának képét]

## Backend
A backend Node.js alapú, Express keretrendszerrel, és egy MySQL adatbázissal kommunikál a mysql2 csomag segítségével. Feladata egy RESTful API biztosítása, amely hidat képez a Netlify-on hosztolt frontend és az adatbázis között. Kezeli a felhasználói hitelesítést, az adatlekérdezéseket, a foglalási logikát és a képfeltöltéseket a Cloudinary felé.

## Telepítés és futtatás:
git clone https://github.com/Kristof45/wanderio_backend.git
cd wanderio_backend
npm install
npm run dev

## Mappa struktúra:
wanderio_backend/
	node_modules/
	 ... -> Használt csomagok fájljai
	config/
		dotenvConfig.js
		cloudinary.js
	controllers/
		userController.js
		hotelController.js
		...	# További vezérlõk
	db/
		db.js
	middleware/
		userMiddleware.js # JWT Token autentikáció
		multerMiddleware.js # Fájlfeldolgozás (képek)
		adminMiddleware.js # Admin autentikáció
	models/
		userModel.js
		hotelModel.js
		...	# Adatbázis mûveleteket tartalmazó modellek
	routes/
		userRoutes.js
		hotelRoutes.js
		...	# API útvonalak definíciói
	.env  -> Környezeti változók (DB adatok, JWT secret, Cloudinary kulcsok)
	app.js -> Az alkalmazás belépési pontja (Express konfigurálás)
	package.json -> Használt csomagok és függõségek
	package-lock.json -> Függõségek
	server.js # Szerver indítási fájl (pl. app.js meghívása és futtatása adott porton)
	.gitignore -> Nem nyomonkövetett fájlok vagy mappák
	ReadMe.md -> Dokumentáció

## Használt package-ek :
+ bcryptjs
+ cloudinary
+ cookie-parser
+ cors
+ dotenv
+ express
+ jsonwebtoken
+ multer
+ mysql2
+ nodemon
+foto

## Biztonság :
 Hitelesítés: JWT token alapú hielesítés a védett végpontokhoz. A token a localStorage-ban tárolódik a kliens oldalon.
 Jelszókezelés: A felhasználói jelszavak a bcryptjs segítségével vannak titkosítva
 Környezeti változók: Minden érzékeny adat (adatbázis jelszó, JWT titkos kulcs, Cloudinary API kulcsok) a .env fájlban van tárolva, és nincs a Git repository-ban.

## Végpontok :
Az app.js -be meghívtuk az összes routes fájlt és mint egy közlekedési csomópont igazgatja a végpontokat.
foto

1. Auth Végpontok
 | Művelet | HTTP | Végpont | Leírás |
 | ------- | ---- | ------- | ------ |
 | Regisztráció | POST | /register | Új felhasználó regisztrálása. |
 | Bejelentkezés | POST | /login | Felhasználó bejelentkezése, JWT token visszaadása. |
 | Saját adatok lekérdezése	| GET | /whoami | A bejelentkezett felhasználó adatainak lekérdezése a token alapján. (Hitelesítés szükséges) |
 | Kijelentkezés | POST | /logout | Felhasználó kijelentkeztetése. (Hitelesítés szükséges) |
 | Jelszó változtatás | PUT | /pswchange | Bejelentkezett felhasználó jelszavának módosítása. (Hitelesítés szükséges) |
 | Név változtatás | PUT	| /namechange | Bejelentkezett felhasználó nevének módosítása. (Hitelesítés szükséges) |
 | E-mail cím változtatás	| PUT	| /emailchange | Bejelentkezett felhasználó e-mail címének módosítása. (Hitelesítés szükséges) |
 | Összes felhasználó | GET | /admin/alluser | Az összes regisztrált felhasználó adatainak lekérdezése. (Admin jogosultság szükséges) |
 | Felhasználó módosítása | PUT | /admin/modifyuser/:userID | Adott felhasználó adatainak módosítása ID alapján. (Admin jogosultság szükséges) |
 | Felhasználó törlése | DELETE | /admin/deleteuser/:userID | Adott felhasználó törlése ID alapján. (Admin jogosultság szükséges)
 foto csatolas az osszesrol 

2. Jegyrendelés Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Összes rendelés lekérdezése | GET | /getticketorders | Az összes jegyrendelés adatainak lekérdezése. (Valószínűleg admin jogosultság szükséges) |
 | Kosár lekérdezése | GET | /getcart/:userID | Egy adott felhasználó kosarának tartalmának lekérdezése a felhasználó ID-ja alapján. |
 | Jegyrendelés létrehozása | POST | /createticketorder | Új jegyrendelés leadása a kosár tartalma alapján. |
 | Rendelés állapotának frissítése | PUT | /updateticketstatus/:orderID | Egy meglévő jegyrendelés állapotának módosítása (pl. fizetve, teljesítve). (Admin jogosultság szükséges) |
 | Jegyrendelés törlése | DELETE | /deleteticketorder/:orderID | Egy jegyrendelés törlése azonosító alapján. (Hitelesítés szükséges, a felhasználó valószínűleg a sajátját törölheti). |

3. Légitársaság Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Légitársaságok lekérdezése | GET | /getairlines | Az összes légitársaság adatainak lekérdezése. |
 | Légitársaság létrehozása	| POST | /createairline | Új légitársaság felvétele az adatbázisba. ( Admin jogosultság szükséges) |
 | Légitársaság módosítása | PUT | /updateairline/:airlineID | Egy meglévő légitársaság adatainak módosítása azonosító alapján. ( Admin jogosultság szükséges) |
  | Légitársaság törlése | DELETE | /deleteairline/:airlineID | Egy légitársaság törlése az adatbázisból azonosító alapján. ( Admin jogosultság szükséges) |

4. Flights Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Összes járat listázása | GET | /getallflights | Az összes publikusan elérhető repülőjárat listázása. |
 | Egyszerű járatkeresés | GET | /searchflight | Repülőjáratok keresése egyszerűbb feltételek alapján. |
 | Részletes járatkeresés GET | /search | Repülőjáratok keresése részletes szűrőkkel (pl. indulás, érkezés, dátum). |
 | Járatfoglalás | POST | /book | Új járatfoglalás létrehozása. (Hitelesítés szükséges) |
 | Járatok listázása | GET | /adgetflights | Az összes járat lekérdezése adminisztrátori felülethez, több adattal. (Admin jogosultság szükséges) |
 | Járat módosítása | PUT | /updateflight/:flightsId | Egy meglévő járat adatainak frissítése azonosító alapján. (Admin jogosultság szükséges) |
 | Járat törlése | DELETE | /deleteflight/:flightsId | Egy járat törlése az adatbázisból azonosító alapján. (Admin jogosultság szükséges) |

5. Szállodafoglalás Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Összes szállodafoglalás | GET | /gethotelord | Az összes szállodafoglalás adatainak lekérdezése. (Valószínűleg admin jogosultság szükséges) |
 | Szállodafoglalás létrehozása | POST | /createhotelord | Új szállodafoglalás létrehozása. |
 | Foglalás állapotának frissítése | PUT | /updatehotordstat/:orderID | Egy meglévő szállodafoglalás állapotának módosítása (pl. fizetve, lemondva). (Admin jogosultság szükséges) |
 | Szállodafoglalás törlése	DELETE | /deletehotelord/:orderID | Egy szállodafoglalás törlése azonosító alapján. (Hitelesítés szükséges, a felhasználó a sajátját törölheti). |

6. Szálloda Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Szállodák listázása | GET | /gethotels | Az összes publikusan elérhető szálloda listázása böngészéshez. |
 | Szállodatípusok listázása | GET | /gethoteltypes | Az elérhető szállodatípusok (pl. 5 csillagos, apartman) lekérdezése. |
 | Szálloda részletei | GET | /details/:hotelID | Egy konkrét szálloda részletes adatainak lekérdezése azonosító alapján. |
 | Szállodafoglalás | POST | /book | Új szállodafoglalás létrehozása egy adott hotelbe. (Hitelesítés szükséges) |
 | Szállodák listázása | GET | /admin/getadhotel | Az összes szálloda lekérdezése adminisztrátori felülethez, részletesebb adatokkal. (Admin jogosultság szükséges) |
 | Szálloda létrehozása | POST | /createhotel | Új szálloda létrehozása, maximum 5 kép egyidejű feltöltésével. (Admin jogosultság szükséges) |
 | Kép(ek) feltöltése | POST | /upload-image/:hotelID | Képek hozzáadása egy meglévő szállodához, max. 5 kép egyidejű feltöltésével. (Admin jogosultság szükséges) |
 | Szálloda módosítása | PUT | /updatehotel/:hotelID | Egy meglévő szálloda adatainak frissítése azonosító alapján. (Admin jogosultság szükséges) |
 | Szálloda törlése	DELETE | /deletehotel/:hotelID | Egy szálloda törlése az adatbázisból azonosító alapján. (Admin jogosultság szükséges) |

7. Szoba Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Szobák listázása | GET | /getrooms | Az összes publikusan elérhető szoba listázása. |
 | Szobák listázása | GET | /adgetroom | Az összes szoba lekérdezése adminisztrátori felülethez, részletesebb adatokkal. (Admin jogosultság szükséges) |
 | Szoba létrehozása | POST | /createroom | Új szoba létrehozása az adatbázisban. (Admin jogosultság szükséges) |
 | Kép(ek) feltöltése | POST | /upload-image/:roomId | Képek hozzáadása egy meglévő szobához, max. 5 kép egyidejű feltöltésével. (Admin jogosultság szükséges) |
 | Szoba módosítása | PUT | /updateroom/:roomId | Egy meglévő szoba adatainak frissítése azonosító alapján. (Admin jogosultság szükséges) |
 | Szoba törlése | DELETE | /deleteroom/:roomId | Egy szoba törlése az adatbázisból azonosító alapján. (Admin jogosultság szükséges) |

8. Város Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Városok listázása | GET | /getcities | Az összes város adatainak lekérdezése. |
 | Város lekérdezése ID alapján | GET | /getcities/:cityID | Egy konkrét város alap adatainak lekérdezése azonosító alapján. |
 | Város részletei | GET | /detail/:cityID | Egy konkrét város részletes adatlapjának lekérdezése azonosító alapján (pl. képekkel, leírással). |
 | Város létrehozása | POST | /createcity | Új város felvétele az adatbázisba. (Valószínűleg admin jogosultság szükséges) |
 | Kép(ek) feltöltése | POST | /upload-image/:cityID | Képek hozzáadása egy meglévő városhoz, max. 5 kép egyidejű feltöltésével. (Admin jogosultság szükséges) |
 | Város módosítása | PUT | /updatecity/:cityID | Egy meglévő város adatainak frissítése azonosító alapján. (Admin jogosultság szükséges) |
 | Város törlése | DELETE | /deletecity/:cityID | Egy város törlése az adatbázisból azonosító alapján. (Admin jogosultság szükséges) |

9. Látnivaló Végpontok
 | Művelet | Metódus | Végpont | Leírás |
 | ------- | ------- | ------- | ------ |
 | Látnivalók listázása | GET | /getatt	Az összes látnivaló alap adatainak lekérdezése. | 
 | Látnivalók képekkel | GET | /getattimg | A látnivalók listázása a hozzájuk tartozó képekkel. |
 | Látnivaló létrehozása | POST | /createatt | Új látnivaló felvétele az adatbázisba. (Valószínűleg admin jogosultság szükséges) |
 | Kép(ek) feltöltése | POST | /upload-image/:attractionID | Képek hozzáadása egy meglévő látnivalóhoz, max. 5 kép egyidejű feltöltésével. (Admin jogosultság szükséges) |
 | Látnivaló módosítása | PUT | /updateatt/:attractionID | Egy meglévő látnivaló adatainak frissítése azonosító alapján. (Admin jogosultság szükséges) |
 | Látnivaló törlése | DELETE | /deleteatt/:attractionID | Egy látnivaló törlése az adatbázisból azonosító alapján. (Admin jogosultság szükséges) |


## Tesztelés :
[Postmanben tesztelés](https://documenter.getpostman.com/view/48099677/2sBXqJJfp1)

A projekt jelenleg manuálisan, a frontend felületen keresztül és a böngészõ fejlesztõi eszközeivel tesztelhetõ. A backend végpontok külön-külön tesztelhetõk a Postman alkalmazással.

## Továbbfejlesztési lehetőség :
drawsqlbol foto ket tabla megjelolese
1. Légitársaság logók feltöltése

Cél: A légitársaságok listájának és a járatoknak a vizuális megjelenítése a cégek logóival.
Előny: Professzionálisabb megjelenés, gyorsabb felismerhetőség a felhasználók számára.

2. Szobatípusok kezelése

Cél: Az egyes szobák helyett általános "szobatípusok" (pl. Standard, Lakosztály) bevezetése, és a szállodákhoz darabszám szerint történő hozzárendelése.
Előny: Egyszerűbb adminisztráció (nem kell 100 egyforma szobát felvinni), jobb szűrhetőség a felhasználóknak, és könnyebb árazás típusonként.

## Frontend
[Frontend](https://github.com/vendel1123/WanderioFrontend)

## Használt eszközök
+ VS code
+ NPM
+ Postman
+ DrawSQL
+ W3Schools
+ GitHub
+ PhpMyAdmin
+ Gemini
+ ChatGPT