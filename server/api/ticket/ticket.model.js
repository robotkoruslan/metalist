'use strict';

import mongoose from 'mongoose';

var TicketSchema = new mongoose.Schema({
    text: String,
    available: Boolean,
});

export default mongoose.model('Ticket', TicketSchema);
