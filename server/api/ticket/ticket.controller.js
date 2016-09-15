'use strict';

import Ticket from './ticket.model';
import * as mailer from '../../mailer/mailer.js';
import * as crypto from 'crypto';
import * as barcode from 'bwip-js';
import * as fs from 'fs';

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
            ticket.code = crypto.randomBytes(16).toString('hex');



            var emailContent = 'Ticket is sold!';
            // mailer.sendMail('ruslan.polutsygan@gmail.com', 'Test subject', emailContent);

            return ticket.save()
                .then((updated) => {
                    return updated;
                })

        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function print(req, res, next) {
    return Ticket.findOne({code: req.params.code, available: false}).exec()
        .then(handleEntityNotFound(res))
        .then((ticket) => {
            if(ticket) {

                barcode.toBuffer({
                    bcid:        'code128',       // Barcode type
                    text:        ticket.code,     // Text to encode
                    scale:       3,               // 3x scaling factor
                    height:      10,              // Bar height, in millimeters
                    includetext: true,            // Show human-readable text
                    textxalign:  'center',        // Always good to set this
                    textsize:    13               // Font size, in points
                }, function (err, png) {
                    // png is a Buffer. can be saved into file if needed  fs.writeFile(ticket._id + '.png', png)

                    if (err) {
                        return res.status(500).send('Could not generate ticket');
                    } else {

                        return res.render('ticket/print', {
                            ticket: ticket,
                            barcodeUri: png.toString('base64'),
                        })

                    }
                });
            }
        })
        .catch(handleError(res));
}

