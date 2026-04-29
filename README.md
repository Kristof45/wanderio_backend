<div align="center">
  <img src="https://i.postimg.cc/WzYgszgY/world.png" alt="Wanderio Logo" width="120" height="120">
  <h1 align="center">Wanderio - Backend API</h1>
  <p align="center">
    A Wanderio utazásfoglaló platform Node.js alapú, RESTful API szervere.
    <br />
    <a href="#-végpontok"><strong>Végpontok Dokumentációja »</strong></a>
  </p>
</div>

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](http://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

</div>

---

### 📋 Tartalomjegyzék

- [A Projektről](#-a-projektről)
- [Készítette](#-készítette)
- [Technológiai Háttér](#-technológiai-háttér)
- [Adatbázis](#-adatbázis)
- [Telepítés és Futtatás](#-telepítés-és-futtatás)
- [Mappa Struktúra](#-mappa-struktúra)
- [Függőségek](#-függőségek)
- [Biztonság](#-biztonság)
- [Végpontok](#-végpontok)
- [Tesztelés](#-tesztelés)
- [Továbbfejlesztési Lehetőségek](#-továbbfejlesztési-lehetőségek)
- [Frontend Repository](#-frontend-repository)
- [Használt Eszközök](#-használt-eszközök)

---

## 📖 A Projektről

> A Wanderio egy komplex utazásfoglaló platform, amely lehetővé teszi a felhasználók számára, hogy repülőjegyeket és hotelszobákat keressenek, böngésszenek és foglaljanak le. Ez a repository a projekt **backend** részét tartalmazza, amely egy modern, két részből álló architektúrára épül: egy React alapú, dinamikus frontend felületre (ami a Netlify-on fut), és egy robusztus Node.js backendre, ami a MySQL adatbázissal kommunikál. A projekt célja, hogy egy teljes körű, felhasználóbarát utazási élményt nyújtson, az adminisztrációs felülettől kezdve egészen a végfelhasználói foglalási folyamatig.

<br>

## 👥 Készítette

| Név | Szerepkör |
| :--- | :--- |
| **Tokai Kristóf** | Backend, SQL Adatbázis |
| **Hegyi Vendel** | Backend |

<br>

## 🛠️ Technológiai Háttér

- `Node.js`
- `Express.js`
- `MySQL`
- `Cloudinary` (képkezeléshez)

<br>

## 🗄️ Adatbázis

A projekt adatbázisa több, egymással összekapcsolt táblából áll, hogy hatékonyan kezelje a felhasználókat, városokat, hoteleket, repülőjáratokat és a hozzájuk tartozó rendeléseket.

#### Táblák listája:
- `users`
- `cities`
- `hotels`
- `rooms`
- `roomTypes`
- `flights`
- `airlines`
- `attractions`
- `hotelOrders`
- `ticketOrders`
- `cityImage`, `hotelImage`, `roomImage`, `airlineImage`, `attractionImage` (képeket tároló kapcsolótáblák)

#### Adatbázis diagram:
<p align="center">
  <img src="https://i.postimg.cc/xCsb3BXy/draw-SQL-image-export-2026-04-29-(1).jpg" alt="Adatbázis diagram">
</p>

<br>

## 🚀 Telepítés és Futtatás

1.  **Klónozd a repository-t:**
    ```bash
    git clone https://github.com/Kristof45/wanderio_backend.git
    ```
2.  **Navigálj a projekt mappájába:**
    ```bash
    cd wanderio_backend
    ```
3.  **Telepítsd a függőségeket:**
    ```bash
    npm install
    ```
4.  **Indítsd el a szervert fejlesztői módban (nodemon):**
    ```bash
    npm run dev
    ```

<br>

## 📁 Mappa Struktúra
```
wanderio_backend/
├── node_modules/
├── config/
│   ├── cloudinary.js
│   └── dotenvConfig.js
├── controllers/
│   ├── hotelController.js
│   ├── userController.js
│   └── ...
├── db/
│   └── db.js
├── middleware/
│   ├── adminMiddleware.js
│   ├── multerMiddleware.js
│   └── userMiddleware.js
├── models/
│   ├── hotelModel.js
│   ├── userModel.js
│   └── ...
├── routes/
│   ├── hotelRoutes.js
│   ├── userRoutes.js
│   └── ...
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── ReadMe.md
└── server.js
```

<br>

## 📦 Függőségek
- `bcryptjs`
- `cloudinary`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `jsonwebtoken`
- `multer`
- `mysql2`
- `nodemon`

<p align="center">
  <img src="https://i.postimg.cc/qRZcXCKF/depend.png" alt="Dependencies" width="70%">
</p>

<br>

## 🛡️ Biztonság

- **Hitelesítés:** JWT token alapú hitelesítés a védett végpontokhoz. A token a `localStorage`-ban tárolódik a kliens oldalon.
- **Jelszókezelés:** A felhasználói jelszavak a `bcryptjs` segítségével vannak hashelve és sózva.
- **Környezeti változók:** Minden érzékeny adat (adatbázis jelszó, JWT titkos kulcs, Cloudinary API kulcsok) a `.env` fájlban van tárolva, és a `.gitignore` segítségével nincs a Git repository-ban.

---

## 🔌 Végpontok

Az `app.js` fájlban hívjuk meg az összes `routes` fájlt, és mint egy közlekedési csomópont, ez a fájl igazgatja a beérkező kéréseket a megfelelő végpontokhoz.
<p align="center">
  <img src="https://i.postimg.cc/yYCSXhdb/kep-2026-04-29-185949309.png" alt="Routes" width="70%">
</p>

<details>
<summary><strong>1. 🔑 Auth Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Regisztráció</td>
      <td><code>POST</code></td>
      <td><code>/register</code></td>
      <td>Új felhasználó regisztrálása.</td>
    </tr>
    <tr>
      <td>Bejelentkezés</td>
      <td><code>POST</code></td>
      <td><code>/login</code></td>
      <td>Felhasználó bejelentkezése, JWT token visszaadása.</td>
    </tr>
    <tr>
      <td>Saját adatok lekérdezése</td>
      <td><code>GET</code></td>
      <td><code>/whoami</code></td>
      <td>A bejelentkezett felhasználó adatainak lekérdezése a token alapján. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Kijelentkezés</td>
      <td><code>POST</code></td>
      <td><code>/logout</code></td>
      <td>Felhasználó kijelentkeztetése. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Jelszó változtatás</td>
      <td><code>PUT</code></td>
      <td><code>/pswchange</code></td>
      <td>Bejelentkezett felhasználó jelszavának módosítása. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Név változtatás</td>
      <td><code>PUT</code></td>
      <td><code>/namechange</code></td>
      <td>Bejelentkezett felhasználó nevének módosítása. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>E-mail cím változtatás</td>
      <td><code>PUT</code></td>
      <td><code>/emailchange</code></td>
      <td>Bejelentkezett felhasználó e-mail címének módosítása. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Összes felhasználó</td>
      <td><code>GET</code></td>
      <td><code>/admin/alluser</code></td>
      <td>Az összes regisztrált felhasználó adatainak lekérdezése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Felhasználó módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/admin/modifyuser/:userID</code></td>
      <td>Adott felhasználó adatainak módosítása ID alapján. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Felhasználó törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/admin/deleteuser/:userID</code></td>
      <td>Adott felhasználó törlése ID alapján. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/Gm5LzrKF/kep-2026-04-29-190137295.png" alt="Auth végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>2. 🎟️ Jegyrendelés Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Összes rendelés lekérdezése</td>
      <td><code>GET</code></td>
      <td><code>/getticketorders</code></td>
      <td>Az összes jegyrendelés adatainak lekérdezése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Kosár lekérdezése</td>
      <td><code>GET</code></td>
      <td><code>/getcart/:userID</code></td>
      <td>Egy adott felhasználó kosarának tartalmának lekérdezése.</td>
    </tr>
    <tr>
      <td>Jegyrendelés létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createticketorder</code></td>
      <td>Új jegyrendelés leadása a kosár tartalma alapján.</td>
    </tr>
    <tr>
      <td>Rendelés állapotának frissítése</td>
      <td><code>PUT</code></td>
      <td><code>/updateticketstatus/:orderID</code></td>
      <td>Egy meglévő jegyrendelés állapotának módosítása. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Jegyrendelés törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deleteticketorder/:orderID</code></td>
      <td>Egy jegyrendelés törlése. (Hitelesítés szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/3wd34wst/kep-2026-04-29-211240341.png" alt="Jegyrendelés végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>3. 🏢 Légitársaság Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Légitársaságok lekérdezése</td>
      <td><code>GET</code></td>
      <td><code>/getairlines</code></td>
      <td>Az összes légitársaság adatainak lekérdezése.</td>
    </tr>
    <tr>
      <td>Légitársaság létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createairline</code></td>
      <td>Új légitársaság felvétele. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Légitársaság módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/updateairline/:airlineID</code></td>
      <td>Egy meglévő légitársaság adatainak módosítása. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Légitársaság törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deleteairline/:airlineID</code></td>
      <td>Egy légitársaság törlése. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/PxjFG3Q8/kep-2026-04-29-211554106.png" alt="Légitársaság végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>4. ✈️ Repülőjárat Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Összes járat listázása</td>
      <td><code>GET</code></td>
      <td><code>/getallflights</code></td>
      <td>Az összes publikusan elérhető repülőjárat listázása.</td>
    </tr>
    <tr>
      <td>Részletes járatkeresés</td>
      <td><code>GET</code></td>
      <td><code>/search</code></td>
      <td>Repülőjáratok keresése részletes szűrőkkel (indulás, érkezés, dátum).</td>
    </tr>
    <tr>
      <td>Járatfoglalás</td>
      <td><code>POST</code></td>
      <td><code>/book</code></td>
      <td>Új járatfoglalás létrehozása. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Járatok listázása (Admin)</td>
      <td><code>GET</code></td>
      <td><code>/adgetflights</code></td>
      <td>Az összes járat lekérdezése adminisztrátori felülethez. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Járat módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/updateflight/:flightsId</code></td>
      <td>Egy meglévő járat adatainak frissítése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Járat törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deleteflight/:flightsId</code></td>
      <td>Egy járat törlése. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/MT55CWGh/kep-2026-04-29-211714369.png" alt="Repülőjárat végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>5. 🏨 Szállodafoglalás Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Összes szállodafoglalás</td>
      <td><code>GET</code></td>
      <td><code>/gethotelord</code></td>
      <td>Az összes szállodafoglalás adatainak lekérdezése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szállodafoglalás létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createhotelord</code></td>
      <td>Új szállodafoglalás létrehozása. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Foglalás állapotának frissítése</td>
      <td><code>PUT</code></td>
      <td><code>/updatehotordstat/:orderID</code></td>
      <td>Egy meglévő szállodafoglalás állapotának módosítása. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szállodafoglalás törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deletehotelord/:orderID</code></td>
      <td>Egy szállodafoglalás törlése. (Hitelesítés szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/MT6bbhY4/kep-2026-04-29-211814087.png" alt="Szállodafoglalás végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>6. 🏩 Szálloda Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Szállodák listázása</td>
      <td><code>GET</code></td>
      <td><code>/gethotels</code></td>
      <td>Az összes publikusan elérhető szálloda listázása.</td>
    </tr>
    <tr>
      <td>Szálloda részletei</td>
      <td><code>GET</code></td>
      <td><code>/details/:hotelID</code></td>
      <td>Egy konkrét szálloda részletes adatainak lekérdezése.</td>
    </tr>
    <tr>
      <td>Szállodafoglalás</td>
      <td><code>POST</code></td>
      <td><code>/book</code></td>
      <td>Új szállodafoglalás létrehozása. (Hitelesítés szükséges)</td>
    </tr>
    <tr>
      <td>Szállodák listázása (Admin)</td>
      <td><code>GET</code></td>
      <td><code>/admin/getadhotel</code></td>
      <td>Az összes szálloda lekérdezése admin felülethez. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szálloda létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createhotel</code></td>
      <td>Új szálloda létrehozása, max. 5 kép feltöltésével. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Kép(ek) feltöltése</td>
      <td><code>POST</code></td>
      <td><code>/upload-image/:hotelID</code></td>
      <td>Képek hozzáadása meglévő szállodához. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szálloda módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/updatehotel/:hotelID</code></td>
      <td>Egy meglévő szálloda adatainak frissítése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szálloda törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deletehotel/:hotelID</code></td>
      <td>Egy szálloda törlése. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/wB0sH3Xp/kep-2026-04-29-211914976.png" alt="Szálloda végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>7. 🛏️ Szoba Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Szobák listázása</td>
      <td><code>GET</code></td>
      <td><code>/getrooms</code></td>
      <td>Az összes publikusan elérhető szoba listázása.</td>
    </tr>
    <tr>
      <td>Szobák listázása (Admin)</td>
      <td><code>GET</code></td>
      <td><code>/adgetroom</code></td>
      <td>Az összes szoba lekérdezése admin felülethez. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szoba létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createroom</code></td>
      <td>Új szoba létrehozása. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Kép(ek) feltöltése</td>
      <td><code>POST</code></td>
      <td><code>/upload-image/:roomId</code></td>
      <td>Képek hozzáadása meglévő szobához. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szoba módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/updateroom/:roomId</code></td>
      <td>Egy meglévő szoba adatainak frissítése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Szoba törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deleteroom/:roomId</code></td>
      <td>Egy szoba törlése. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/s2qG1qNx/kep-2026-04-29-212142958.png" alt="Szoba végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>8. 🏙️ Város Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Városok listázása</td>
      <td><code>GET</code></td>
      <td><code>/getcities</code></td>
      <td>Az összes város adatainak lekérdezése.</td>
    </tr>
    <tr>
      <td>Város részletei</td>
      <td><code>GET</code></td>
      <td><code>/detail/:cityID</code></td>
      <td>Egy város részletes adatlapjának lekérdezése.</td>
    </tr>
    <tr>
      <td>Város létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createcity</code></td>
      <td>Új város felvétele. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Kép(ek) feltöltése</td>
      <td><code>POST</code></td>
      <td><code>/upload-image/:cityID</code></td>
      <td>Képek hozzáadása meglévő városhoz. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Város módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/updatecity/:cityID</code></td>
      <td>Egy meglévő város adatainak frissítése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Város törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deletecity/:cityID</code></td>
      <td>Egy város törlése. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/0yHbHhPx/kep-2026-04-29-212239899.png" alt="Város végpontok" width="70%">
</p>
</details>

<details>
<summary><strong>9. 🗿 Látnivaló Végpontok</strong></summary>
<br>
<table>
  <thead>
    <tr>
      <th>Művelet</th>
      <th>HTTP</th>
      <th>Végpont</th>
      <th>Leírás</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Látnivalók listázása</td>
      <td><code>GET</code></td>
      <td><code>/getatt</code></td>
      <td>Az összes látnivaló alap adatainak lekérdezése.</td>
    </tr>
    <tr>
      <td>Látnivalók képekkel</td>
      <td><code>GET</code></td>
      <td><code>/getattimg</code></td>
      <td>A látnivalók listázása a hozzájuk tartozó képekkel.</td>
    </tr>
    <tr>
      <td>Látnivaló létrehozása</td>
      <td><code>POST</code></td>
      <td><code>/createatt</code></td>
      <td>Új látnivaló felvétele. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Kép(ek) feltöltése</td>
      <td><code>POST</code></td>
      <td><code>/upload-image/:attractionID</code></td>
      <td>Képek hozzáadása meglévő látnivalóhoz. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Látnivaló módosítása</td>
      <td><code>PUT</code></td>
      <td><code>/updateatt/:attractionID</code></td>
      <td>Egy meglévő látnivaló adatainak frissítése. (Admin jogosultság szükséges)</td>
    </tr>
    <tr>
      <td>Látnivaló törlése</td>
      <td><code>DELETE</code></td>
      <td><code>/deleteatt/:attractionID</code></td>
      <td>Egy látnivaló törlése. (Admin jogosultság szükséges)</td>
    </tr>
  </tbody>
</table>
<br>
<p align="center">
  <img src="https://i.postimg.cc/pLyd8k89/kep-2026-04-29-212338157.png" alt="Látnivaló végpontok" width="70%">
</p>
</details>

<br>

## 🧪 Tesztelés

A végpontok manuálisan tesztelhetők a **Postman** alkalmazással.

> **Postman Dokumentáció:** [https://documenter.getpostman.com/view/48099677/2sBXqJJfp1](https://documenter.getpostman.com/view/48099677/2sBXqJJfp1)

<br>

## 💡 Továbbfejlesztési Lehetőségek

1.  **Légitársaság logók feltöltése**
    > Cél: A légitársaságok listájának és a járatoknak a vizuális megjelenítése a cégek logóival.
    > Előny: Professzionálisabb megjelenés, gyorsabb felismerhetőség a felhasználók számára.

2.  **Szobatípusok kezelése**
    > Cél: Az egyes szobák helyett általános "szobatípusok" (pl. Standard, Lakosztály) bevezetése, és a szállodákhoz darabszám szerint történő hozzárendelése.
    > Előny: Egyszerűbb adminisztráció, jobb szűrhetőség a felhasználóknak, és könnyebb árazás típusonként.

<br>

## 🖥️ Frontend Repository

A projekt frontend részének repository-ja itt érhető el:
> [https://github.com/vendel1123/WanderioFrontend](https://github.com/vendel1123/WanderioFrontend)

<br>

## 🧰 Használt Eszközök
- VS Code
- NPM
- Postman
- DrawSQL
- W3Schools
- GitHub
- PhpMyAdmin
- Gemini
- ChatGPT
