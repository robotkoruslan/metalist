'use strict';

import mongoose from 'mongoose';

var TicketSchema = new mongoose.Schema({
    text: String,
    available: Boolean,
    code: String, /// generated when sold
});

export default mongoose.model('Ticket', TicketSchema);
