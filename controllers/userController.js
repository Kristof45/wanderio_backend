const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../config/dotenvConfig')
const { getAllUser, findByEmail, createUser, updatePsw, getUserById, updateName, updateEmail, modifyUser, deleteUser } = require('../models/userModel')


const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

//allUser

async function alluser(req, res) {
    try {
        const result = await getAllUser()

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a felhasznalo lekereseben.', err })
    }
}

//registration
async function register(req, res) {
    try {
        const { email, username, psw } = req.body
        //console.log(email, username, psw);

        if (!email || !username || !psw) {
            return res.status(400).json({ error: 'Töltsd ki az összes mezőt!' })
        }

        const exists = await findByEmail(email)
        //console.log(exists);

        if (exists === 1) {
            return res.status(409).json({ error: 'Az email már foglalt' })
        }

        const hash = await bcrypt.hash(psw, 10)

        const { insertId } = await createUser(username, email, hash)

        return res.status(201).json({ message: 'Sikeres regisztracio', insertId })
    } catch (err) {
        return res.status(500).json({ error: 'Regisztracios hiba', err })
    }
}

//login
async function login(req, res) {
    try {
        const { email, psw } = req.body
        //console.log(email, psw);

        if (!email || !psw) {
            return res.status(400).json({ error: 'Email es jelszo kotelezo' })
        }

        const exists = await findByEmail(email)
        //console.log(exists);

        if (!exists) {
            return res.status(401).json({ error: 'Hibas email' })
        }

        const ok = await bcrypt.compare(psw, exists.psw)
        //console.log(ok);
        if (!ok) {
            return res.status(401).json({ error: 'Hibas jelszo' })
        }

        const token = jwt.sign({ userID: exists.userID, username: exists.username, email: exists.email, role: exists.role },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )
        //console.log(token);

        res.cookie(config.COOKIE_NAME, token, cookieOpts)

        return res.status(200).json({ message: 'Sikeres login' })
    } catch (err) {
        return res.status(500).json({ error: 'Belépési hiba', err })
    }
}

//whoami
async function whoAmI(req, res) {
    try {
        const { user_id, username, email, role } = req.user
        //console.log(user_id, username, email, role);
        return res.status(200).json({ user_id: user_id, username: username, email: email, role: role })
    } catch (err) {
        return res.status(500).json({ error: 'whoAmI szerver oldali hiba' })
    }
}

//logout
async function logout(req, res) {
    try {
        return res.clearCookie(config.COOKIE_NAME, { path: '/' }).status(200).json({ message: 'Sikeres kijelentkezés' })
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a kijelentkezés során' })
    }
}

//pswChange
async function pswChange(req, res) {
    try {
        const userID = req.user.userID
        const { psw, newPsw } = req.body

        const user = await getUserById(userID)

        const match = bcrypt.compare(psw, user.psw)
        if (!match) {
            return res.status(400).json({ error: "Hibás régi jelszó" })
        }
        //console.log(user.psw,newPsw);
        const hash = await bcrypt.hash(newPsw, 10)

        await updatePsw(userID, hash)

        res.status(201).json({ message: "Sikeres jelszóváltoztatás" })
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a jelszó változtatás során' })
    }
}

async function nameChange(req, res) {
    try {
        const userID = req.user.userID
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ error: 'Kötelező megadni a nevet' })
        }

        await updateName(userID, username)
        return res.status(201).json({ message: 'Sikeres név változtatás' })
    } catch (err) {
        return res.status(500).json({ error: "Hiba a név változtatás során" })
    }
}

async function emailChange(req, res) {
    try {
        const userID = req.user.userID
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ error: 'Kötelező megadni az emailt' })
        }

        await updateEmail(userID, email)
        return res.status(201).json({ message: 'Sikeres email változtatás' })
    } catch (err) {
        return res.status(500).json({ error: "Hiba az email változtatás során" })
    }
}

//admin megvaltoztatja egy felhasznalo adatait
async function modifyuser(req, res) {
    try {
        const userID = req.params.userID
        const {username, email, role} = req.body

        await modifyUser(userID, username, email, role)
        return res.status(201).json({message: 'Sikeres valtoztatas'})
    } catch (err) {
        return res.status(500).json({ error: "Hiba amikor az admin probal adatot valtoztatni" })
    }
}

//admin felhasznalot torol
async function deleteuser(req, res) {
    try {
        const userID = req.params.userID
        await deleteUser(userID)
    } catch (err) {
        return res.status(500).json({ error: "Hiba amikor az admin probal felhasznalot torolni" })
    }
}

module.exports = { alluser, register, login, whoAmI, logout, pswChange, nameChange, emailChange, modifyuser, deleteuser }