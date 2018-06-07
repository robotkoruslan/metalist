'use strict';

import moment from 'moment';

import Match from './match.model';

export function findById(matchId) {
  return Match.findOne({_id: matchId}).populate("priceSchema");
}

export function getNextMatches() {
  // Select matches with start time more than 2 hours before now(match time).
  // Match is considered as next even if it has just started and is playing at this time
  return Match.find({
    $or: [
      {date: {$gt: moment().subtract(2, 'h')}},
      {date: null}
    ]
  })
    .populate("priceSchema")
    .sort({date: 1});
}

export function getPrevMatches() {
  // Select matches with start time less than 2 hours before now.
  // Match is considered as previous if it has already ended.
  return Match.find({date: {$lt: moment().add(2, 'h')}})
    .sort({date: -1});
}

export function getNextMatch() {
  // Select matches with start time more than 2 hours before now(match time).
  // Match is considered as next even if it started and is playing at this time
  return Match.find({ date: { $gt: moment().subtract(2, 'h') }})
    .sort({date: 1})
    .then( matches => matches[0] );
}

export function createMatch(newMatch) {
  let match = new Match({
    rival: newMatch.rival,
    info: newMatch.info,
    poster: newMatch.poster,
    priceSchema: newMatch.priceSchema.id,
    stadiumName: newMatch.priceSchema.priceSchema.stadiumName,
    abonement: newMatch.abonement
  });
  return match.save();
}

export function removeById(matchId) {
  return Match.findByIdAndRemove(matchId);
}

export function updateMatch(match, modifiedMatch) {
  match.round = modifiedMatch.round;
  match.rival = modifiedMatch.rival;
  match.date = modifiedMatch.date;
  match.poster = modifiedMatch.poster;
  match.info = modifiedMatch.info;
  match.abonement = modifiedMatch.abonement;
  match.priceSchema = modifiedMatch.priceSchema.id;

  return match.save();
}
