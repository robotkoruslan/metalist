'use strict';

import * as seasonTicketService from '../seasonTicket/seasonTicket.service';
import * as log4js from 'log4js';
import User from "../user/user.model";
import {PAID} from "../seat/seat.constants";
import {ObjectId} from "mongoose/lib/types/objectid";

let logger = log4js.getLogger('SeasonTicket');

export function getSeasonTickets(req, res) {
  return seasonTicketService.getActiveSeasonTickets()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getBlocks(req, res) {
  return seasonTicketService.getActiveBlockTickets()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function createSeasonTicket(req, res) {
  const ticket = req.body.ticket;
  ticket.seat.push(req.params.slug);

  return seasonTicketService.findBySlug(ticket.seat.slug)
    .then(seasonTicket => {
      if (seasonTicket && seasonTicket.reservedUntil > new Date()) {
        return res.status(409).end();
      }
      return seasonTicketService.createSeasonTicket(ticket.seat, ticket.reservedUntil)
        .then(respondWithResult(res));
    })
    .catch(handleError(res));
}

export function confirmSeasonTicket(req, res) {
  let ticketId = req.body.ticket,
    slug = req.params.slug;
  return Promise.all([
      seasonTicketService.findBySlug(slug),
      User.findOne({tickets: new ObjectId(ticketId)})
    ])
    .then(([seasonTicket, user]) => {
      if (!seasonTicket || !user) {
        return res.status(409).end();
      }
      seasonTicket.status = PAID;
      user.seasonTickets.push(seasonTicket);
      return Promise.all([
        user.save(),
        seasonTicket.save()
      ]);
    })
    .then(respondWithResult(res))
    .catch((error) => logger.error('registrationSeasonTicket error: ', error));
}

export function deleteSeasonTicket(req, res) {
  return seasonTicketService.removeBySlug(req.params.slug)
    .then(() => {
      res.status(204).end();
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function blockRow(req, res) {
  let blockRow = req.body.blockRow,
    sector = req.body.blockRow.sector,
    row = req.body.blockRow.row;

  return Promise.all([
    seasonTicketService.getBlockedRowSeats(sector, row),
    seasonTicketService.getRowSeats(sector, row)
  ])
    .then(([tickets, seats]) => {
      if (tickets.length) {
        tickets.forEach(ticket => {
          if (seats.includes(ticket.seat)) {
            seats.splice(seats.indexOf(ticket.seat), 1);
          }
        });
      }
      return seasonTicketService.createBlockRow(seats, blockRow);
    })
    .then(() => res.status(200).end())
    .catch(handleError(res));

}

export function deleteBlockRow(req, res) {
  let sector = req.params.sector,
    row = req.params.row;

  return seasonTicketService.getBlockRow(sector, row)
    .then(seasonTicketService.removeBlockRow)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// private functions ---------------------------------------
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    logger.error('handleError ' + err);
    res.status(statusCode).send(err);
  };
}
