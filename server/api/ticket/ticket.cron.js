import path from 'path';
import { writeFile } from 'fs';
import { getAllNextMatchTickets } from './ticket.controller';

export function runCron() {
    setInterval(createTicketsReport, 1000 * 60 * 60)
}

function createTicketsReport() {
    getAllNextMatchTickets().then(result => {
        writeFile('./tickets.json', JSON.stringify(result), (err) => {
            if (!err) {
                console.log('Tickets report file written successfully')
            } else {
                console.log('Tickets report file error occured', err)
            }
        
        });
    });
}