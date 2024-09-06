import {createTicket, readTickets, updateTicket, deleteTicket} from '../controllers/ticketsController.js'

const ticketRoutes = [
    {
        method: 'POST',
        path: '/tickets',
        handler: createTicket
    },
    {
        method: 'GET',
        path: '/tickets',
        handler: readTickets
    },
    {
        method: 'GET',
        path: '/tickets/:id',
        handler: readTickets
    },
    {
        method: 'PUT',
        path: '/tickets/:id',
        handler: updateTicket
    },
    {
        method: 'DELETE',
        path: '/tickets/:id',
        handler: deleteTicket
    }
]

const routes = [...ticketRoutes]

export {routes}