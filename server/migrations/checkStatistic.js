import mongoose from 'mongoose';
import config from '../config/environment';
import Order from '../api/order/order.model';
import User from "../api/user/user.model";
import * as seasonTicketService from "../api/seasonTicket/seasonTicket.service";
import * as ticketService from '../api/ticket/ticket.service';
import * as seatService from '../api/seat/seat.service';
import Match from '../api/match/match.model';


mongoose.connect(config.mongo.uri, config.mongo.options);


Order.find({status: 'paid'}).populate({
  path: 'user.id',
  match: {
    role: 'cashier'
  },
  model: User
}).then((orders) => {
  orders = orders.filter(function (order) {
    return order.user.id;
  });
  Match.findOne({abonement: true})
    .then((match) => {
      orders.forEach((order) => {
        if (order.seasonTickets.length && !order.tickets.length) {
          getTickets(order.seasonTickets, match)
            .then((tickets) => {
              order.tickets = tickets;
              order.save();
            })
        }
      })
    });
});


function getTickets(seasonTickets, match) {
  return seasonTicketService.getSeasonTicketsByIds(seasonTickets)
    .then((seasonTickets) => {
      return Promise.all(seasonTickets.map((seasonTicket) => {
        return seatService.findForMatchBySlug(seasonTicket.slug, match._id)
          .then((seat) => {
            return ticketService.createTicket(seat);
          });
      }));
    })
}
