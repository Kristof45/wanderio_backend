const { getTicketOrders, getTicketOrder, createTicketOrder, updateTicketStatus, deleteTicketOrder } = require('../models/ticketOrderModel')

//osszes jegy rendeles lekerese
async function getticketorders(req, res) {
    try {
        const result = await getTicketOrders()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a jegy rendelesek lekerdezesekor' })
    }
}

//osszes jegy rendeles lekerese userID alapjan
async function getticketorder(req, res) {
    try {
        const {userID} = req.body
        //console.log(userID);
        const result = await getTicketOrder(userID)

        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({ error: 'Hiba az id-hoz kotott jegy rendelesek lekerdezesekor' })
    }
}

//uj jegy rendeles leadasa
async function createticketorder(req, res) {
    try {
        const { userID, airlineId, status } = req.body

        const { insertId } = await createTicketOrder(userID, airlineId, status)
        return res.status(201).json({ message: 'Sikeres jegy rendeles leadva', insertId })
    } catch (err) {
        //console.log(err);
        return res.status(500).json({ error: 'Hiba az uj jegy rendeles letrehozasakor' })
    }
}

//jegy rendeles status megvaltoztatas
async function updateticketstatus(req, res) {
    try {
        const orderID = req.params.orderID
        const { status } = req.body
        //console.log(orderID, status);

        await updateTicketStatus(orderID, status)
        return res.status(201).json({ message: 'Sikeres status modositas' })
    } catch (err) {
        return res.status(500).json({ error: 'Hiba a jegy rendeles statusanak valtoztatasakor' })
    }
}

//jegy rendeles torlese
async function deleteticketorder(req, res) {
    try {
        const orderID = req.params.orderID
        //console.log(orderID);
        await deleteTicketOrder(orderID)
        return res.status(200).json({message: 'Sikeres jegy rendeles torles'})
    } catch (err) {
        console.log(err);
        
        return res.status(500).json({ error: 'Hiba a jegy rendeles torlesekor' })
    }
}

module.exports = { getticketorders, getticketorder, createticketorder, updateticketstatus, deleteticketorder }