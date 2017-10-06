'use strict';

import * as fileService from './file.service';
import * as log4js from 'log4js';

let logger = log4js.getLogger('File');

export function uploadFile(req, res) {
  return fileService.uploadFile(req, res)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getTeamLogos(req, res) {
  return fileService.getTeamLogos()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//private functions

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      logger.info('respondWithResult ' + entity);
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
