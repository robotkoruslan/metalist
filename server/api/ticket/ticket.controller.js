'use strict';

import Ticket from './ticket.model';
import Seat from '../seat/seat.model';
import User from '../user/user.model';
import TicketReport from './ticket.report.model';
import moment from 'moment-timezone';
import * as barcode from 'bwip-js';
import * as ticketService from '../ticket/ticket.service';
import * as orderService from '../order/order.service';
import * as matchService from '../match/match.service';
import * as log4js from 'log4js';
import {clearReservation} from '../seat/seat.service';
import * as seasonTicketService from '../seasonTicket/seasonTicket.service';
import * as request from  'request';
import { readFile } from 'fs';

const logger = log4js.getLogger('Ticket');
const sectorsInVip = ['VIP_B', 'VIP_BR', 'VIP_BL', 'VIP_AR', 'VIP_AL', 'SB_1', 'SB_7'];

export function getTicketPdfById(req, res) {
  return ticketService.getByTicketNumber(req.params.ticketNumber)
    .then(handleEntityNotFound(res))
    .then(ticket => {
      if (ticket) {
        request.post({
          url: 'https://a43yea0iwg.execute-api.us-east-1.amazonaws.com/dev/ticket',
          headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/json',
          },
          json: true,
          body: ticket
        }).pipe(res);
      }
    })
    .catch(handleError(res));
}

export function getAbonticketTicketByAccessCode(req, res) {
  return ticketService.getTicketWithSeasonTicketByAccessCode(req.params.accessCode)
    .then(handleEntityNotFound(res))
    .then((ticket) => {
      logger.info('ticket ' + ticket);
      return ticket;
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getTicketByAccessCode(req, res, next) {
  return Ticket.findOne({accessCode: req.params.accessCode})
    .then((ticket) => {
      console.log('ticket', ticket);
      if (!ticket) {
        return res.status(200).json({message: 'Билет не найден.'});
      } else {
        return  res.status(200).json(getFormattedFullInfoTicket(ticket));
      }     
    })
    .catch(handleError(res));
}

export function checkTicketsBySteward(req, res, next) {
  let tribune = req.params.tribune;
  return Ticket.findOne({accessCode: req.params.accessCode})
    .then((ticket) => {
      console.log('ticket', ticket);
      if (!ticket) {
        return res.status(200).json({message: 'Билет не найден.'});
      } 
      let result = getFormattedFullInfoTicket(ticket);
      if (tribune === 'vip') {
        if (!sectorsInVip.includes(ticket.seat.sector)) {
          result.message = "Другая трибуна";
          return res.status(200).json(result);
        }
        ticket.status = 'used';
        return ticket.save()
          .then(() => res.status(200).json(result));
      } else {
        if (ticket.seat.tribune !== tribune || (ticket.seat.tribune === tribune && sectorsInVip.includes(ticket.seat.sector))) {
          result.message = "Другая трибуна";
          return res.status(200).json(result);
        }
        ticket.status = 'used';
        return ticket.save()
          .then(() => res.status(200).json(result));
      }
    })
    .catch(handleError(res));

}

export function getMyTickets(req, res) {
  return User.findById(req.user.id)
    .then(user => {
      return Promise.all([
        ticketService.getUserTickets(user.tickets),
        seasonTicketService.getSeasonTicketsByIds(user.seasonTickets)
      ]);
    })
    .then(([tickets, seasonTickets]) => {
      return {
        'tickets': tickets.filter(ticket => ticket),
        'seasonTickets': seasonTickets.filter(seasonTicket => seasonTicket)
      };
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function adminStatistics(req, res) {
  return orderService.getEventsStatistics()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

export function use(req, res, next) {
  let code = req.params.code,
    tribune = req.params.tribune;

  return getTicketByCode(code)
    .then((ticket) => {
      console.log('ticket', ticket);
      if (!ticket) {
        return res.status(200).json({count: 0, message: 'Билет не действительный.'});
      }
      let result = {
        ticket: getFormattedTicket(ticket),
        count: 0
      };
      if (tribune === 'vip') {
        if (!sectorsInVip.includes(ticket.seat.sector)) {
          result.message = "Другая трибуна";
          return res.status(200).json(result);
        }
        ticket.status = 'used';
        return ticket.save()
          .then(() => res.status(200).json(result));
      } else {
        if (ticket.seat.tribune !== tribune || (ticket.seat.tribune === tribune && sectorsInVip.includes(ticket.seat.sector))) {
          result.message = "Другая трибуна";
          return res.status(200).json(result);
        }
        ticket.status = 'used';
        return ticket.save()
          .then(() => res.status(200).json(result));
      }
    })
    .catch(handleError(res));
}

export function useAbonementTicket(req, res) {
  return Ticket.findById(req.params.ticketId).exec()
    .then(handleEntityNotFound(res))
    .then((ticket) => {
      ticket.status = 'used';
      return ticket.save()
        .then(() => res.status(200).json(ticket));
    })
    .catch(handleError(res));
}

export function getTicketsForCheckMobile(req, res) {

  return getNextMatchTickets()
    .then(tickets => {
      let result = tickets.map(ticket => {
        return {
          'status': ticket.status,
          'code': ticket.accessCode,
          'tribune': ticket.seat.tribune,
          'sector': ticket.seat.sector,
          'row': ticket.seat.row,
          'seat': ticket.seat.seat,
          'headline': ticket.match.headline
        };
      });

      return res.status(200).json(result);
    })
    .catch(handleError(res));
}

// export function getTicketsAmountSold(req, res) {
//   return TicketReport.find()
// }
export function getTicketsAmountSold(req, res) {
  return TicketReport.find()
    .then((result) => {
      console.log('result', result);
      if (!result) {
        return res.status(200).json({message: "We can't find report"});
      } else {
        return  res.status(200).json(result);
      }     
    })
    .catch(handleError(res));
}

export function getCountValidTicketsByTribune(req, res, next) {
  // let tribune = req.params.tribune;
// commentin this out for optimisation purposes
  // return getCountTicketsByTribune(tribune)
  //   .then(count => {
      return res.status(200).json(1);
    // })
    // .catch(handleError(res));
}

export function print(req, res, next) {
  return Ticket.findOne({accessCode: req.params.accessCode}).exec()
    .then(handleEntityNotFound(res))
    .then((ticket) => {
      if (ticket) {

        barcode.toBuffer({
          bcid: 'code128',       // Barcode type
          text: ticket.accessCode,     // Text to encode
          scale: 3,               // 3x scaling factor
          height: 10,              // Bar height, in millimeters
          includetext: false,            // Show human-readable text
          textxalign: 'center',        // Always good to set this
        }, function (err, png) {
          if (err) {
            return res.status(500).send('Could not generate ticket');
          }
          return res.status(200).json({img: png.toString('base64')});
        });
      }
    })
    .catch(handleError(res));
}

export function getStatistics(req, res) {
  if (req.query.metod === 'day') {
    dayStatistics(req, res)
  }
  if (req.query.metod === 'event') {
    eventStatistics(req, res)
  }
  if (req.query.metod === 'admin') {
    adminStatistics(req, res)
  }
}

function dayStatistics(req, res) {
  return orderService.getStatistics(req.user.id, req.query.date)
    .then((order) => {
      let tickets = [];
      return order.reduce((sum, current) => {
        return current.tickets.map(ticket => {
          return tickets.push({
            headline: ticket.match.headline,
            amount: ticket.amount,
            date: moment(ticket.reserveDate).format('MMM D, YYYY')
          })
        })
      }, 0), tickets;
    })
    .then((tickets) => {
      let amounts = tickets.map(ticket => {
        return ticket.amount
      });
      return [...new Set(amounts)].map(amount => {
        let price = {price: amount};
        price.sum = tickets.filter(ticket => ticket.amount === amount).map(ticket => ticket.amount)
          .reduce((sum, current) => {
            return sum + current
          }, 0);
        price.count = tickets.filter(ticket => ticket.amount === amount).map(ticket => ticket.amount).length;
        return price
      })
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function eventStatistics(req, res) {
  // return orderService.getStatistics(req.user.id, req.query.date )
  return orderService.getStatistics(req.user.id, req.query.date)
    .then((order) => {
      let tickets = [];
      return order.reduce((sum, current) => {
        return current.tickets.map(ticket => {
          return tickets.push({
            match: ticket.match,
            tribune: ticket.seat.tribune,
            sector: ticket.seat.sector,
            row: ticket.seat.row,
            seat: ticket.seat.seat,
            amount: ticket.amount,
            accessCode: ticket.accessCode,
            id: ticket.id,
            freeMessageStatus: ticket.freeMessageStatus,
            customPrice: ticket.customPrice
          })
        })
      }, 0), tickets;
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function deleteTicketAndClearSeatReservationById(req, res) {
  return Ticket.findOne({_id: req.params.id})
    .then(function (ticket) {
      return Seat.findOne({_id: ticket.seat.id})
    })
    .then((seat) => Promise.all([
      Ticket.findByIdAndRemove(req.params.id).exec(),
      // set seat reservedUntil property less than date now in order to
      // exclude seat from reserved on match seats
      clearReservation(seat)
    ]))
    .then(() => res.status(204).end())
    .catch(handleError(res));
}

//private functions
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    logger.error('handleError ' + err);
    res.status(statusCode).send(err);
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function getNextMatchTickets() {
  return Promise.all([
    matchService.getNextMatch(),
    Ticket.find({status: 'paid'})
  ])
    .then(([match, tickets]) => {
      return tickets.filter(ticket => ticket.match.id === match.id);
    });
}

export function getAllNextMatchTickets() {
  return Promise.all([
    matchService.getNextMatch(),
    Ticket.find()
  ])
    .then(([match, tickets]) => {
      return  {
        'reportCreated': Date.now(),
        'headline' : match.headline,
        'amountSoldTickets' : tickets.filter(ticket => ticket.match.id === match.id).length
      }
    });
}

function getFormattedTicket(ticket) {
  return {
    'tribune': ticket.seat.tribune,
    'sector': ticket.seat.sector,
    'row': ticket.seat.row,
    'seat': ticket.seat.seat,
    'headLine': ticket.match.headline,
  };
}
function getFormattedFullInfoTicket(ticket) {
  return {
    'tribune': ticket.seat.tribune,
    'sector': ticket.seat.sector,
    'row': ticket.seat.row,
    'seat': ticket.seat.seat,
    'headLine': ticket.match.headline,
    'ticketNumber': ticket.accessCode,
    'status': ticket.status,
    'price': ticket.amount,
  };
}

function getTicketByCode(code) {
  let dateNow = new Date();

  return Ticket.findOne({accessCode: code, status: 'paid'});
  // .where({
  //   $and: [
  //     {'valid.from': {$lte: dateNow}},
  //     {'valid.to': {$gt: dateNow}}
  //   ]
  // });
}

function getCountTicketsByTribune(tribune) {
  let dateNow = new Date();

  return getNextMatchTickets()
  /*.where({$and: [
   {'valid.from': { $lte: dateNow }},
   {'valid.to': { $gt: dateNow }}
   ]})*/
    .then(tickets => {
      if (tribune === 'vip') {
        return tickets.filter(ticket => sectorsInVip.includes(ticket.seat.sector)).length;
      }
      return tickets.filter(ticket => (ticket.seat.tribune === tribune && !sectorsInVip.includes(ticket.seat.sector))).length;
    });
}
