import { getAllNextMatchTickets } from './ticket.controller';
import TicketReport from './ticket.report.model';

export function runCron() {
    setInterval(createTicketsReport, 1000 * 60 * 60)
}

function createTicketsReport() {
    getAllNextMatchTickets()
        .then(ticketreport => {
            return TicketReport.remove({})
                .then(() => {
                    let result = new TicketReport(ticketreport);       
                    return result.save();
                })
            });
      }