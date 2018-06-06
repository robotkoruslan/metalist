'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {BLOCK, PAID, RESERVE, SEASON_TICKET} from '../seat/seat.constants';

mongoose.Promise = require('bluebird');

const SeasonTicketSchema = new Schema({
  slug: {type: String, required: true},
  sector: {type: String, requried: true},
  row: {type: String, requried: true},
  tribune: {type: String, requried: true},
  seat: {type: Number, requried: true},
  reservedUntil: {type: Date},
  reservationType: {type: String, enum: [BLOCK, SEASON_TICKET]},
  reservedByCart: {type: String},
  status: {type: String, enum: [BLOCK, PAID, RESERVE]},
  accessCode: {
    type: String,
    required: true,
    default: 0
  },
});

export default mongoose.model('SeasonTicket', SeasonTicketSchema);
