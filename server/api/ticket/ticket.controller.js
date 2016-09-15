'use strict';

import Ticket from './ticket.model';
import * as mailer from '../../mailer/mailer.js';

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

export function index(req, res) {
    return Ticket.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function buy(req, res) {
    return Ticket.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(ticket => {
            ticket.available = false;

            var emailContent = 'Ticket is sold!';
            mailer.sendMail('ruslan.polutsygan@gmail.com', 'Test subject', emailContent);

            return ticket.save()
                .then((updated) => {
                    return updated;
                })

        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

