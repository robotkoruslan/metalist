import CashboxController from './cashbox.controller';
import AbonementTicketComponent from './abonement-ticket/abonement-ticket.component';

let cashboxModule = angular.module('metalistTicketsApp.cashbox', [])
  .controller('CashboxController', CashboxController)
  .component('abonementTicket', AbonementTicketComponent)
  .name;

export default cashboxModule;