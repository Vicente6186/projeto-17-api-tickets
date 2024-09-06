import { database } from "../models/Database.js"

function createTicket(request, response) {
    database.create('tickets', request.body)
    response.end()
}

function readTickets(request, response) {
    const tickets = database.read('tickets')
    response.end(JSON.stringify(tickets))
}

function updateTicket(request, response) {
    const updatedTicket = database.update('tickets', request.params.id, request.body)
    response.end(JSON.stringify(updatedTicket))
}

function deleteTicket(request, response) {
    database.delete('tickets', request.params.id)
    response.end()
}

export { createTicket, readTickets, updateTicket, deleteTicket }