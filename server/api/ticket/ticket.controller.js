'use strict';

import Ticket from './ticket.model';

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

export function index(req, res) {
    return Ticket.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

