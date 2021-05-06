'use strict';

import mongoose from 'mongoose';


const TicketReportSchema = new mongoose.Schema({
  name: { type:String,
    default:  "Ticket sold report"
  },
  reportCreated: {
    type: Date
  },
  headline: {type:String},
  amountSoldTickets: {
    type: Number
  },
});

export default mongoose.model('TicketReport', TicketReportSchema);
