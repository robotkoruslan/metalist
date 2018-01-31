import { Component, OnInit } from '@angular/core';
import uniq from 'lodash/uniq';

import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets-statistic',
  templateUrl: './tickets-statistic.component.html',
  styleUrls: ['./tickets-statistic.component.css'],
  providers: [ TicketService ]
})
export class TicketsStatisticComponent implements OnInit {

  eventsStatistics: any = [];
  daysStatistics: any = [];

  constructor(private ticketsService: TicketService) { }

  ngOnInit() {
    this.getEventsStatistics();
  }

  getEventsStatistics() {
    this.ticketsService.getStatistics({metod: 'admin'})
      .subscribe(
        response => {
          this.eventsStatistics = this.createEventsStatisticModel(response);
          this.daysStatistics = this.createDaysStatisticModel(response);
        },
        err => console.log(err),
      )

  }

  createEventsStatisticModel(statistic) {
    let uniqueDatesForMatch = uniq(statistic.map(item => item.date));
    return uniqueDatesForMatch.map(date => {
      let uniqueUserTypes = uniq(statistic.filter(item => item.date === date)
        .map(item => item.cashier));
      return uniqueUserTypes
        .map(buyer => {

          let itemsPrices = statistic.filter(item => item.date === date && item.cashier === buyer)
            .map(item => item.amount);
          let itemSectors = statistic.filter(item => item.date === date && item.cashier === buyer)
            .map(item => item.sector);

          return {
            date: new Date(date),
            headline: this.getHeadLineByDate(date, statistic),
            cashier: buyer,
            count: itemsPrices.length,
            sum: this.getSumOfArray(itemsPrices),
            details: this.getDetailsSectorsByEvent(itemSectors)
          }
        })
    })
  }

  createDaysStatisticModel(statistic) {
    let uniqueDates = uniq(statistic.map(item => item.dateBuy));

    return uniqueDates.map(date => {
      let uniqueUserTypes = uniq(statistic.filter(item => item.dateBuy === date)
        .map(item => item.cashier));
      return uniqueUserTypes
        .map(buyer => {
          let itemPrices = statistic.filter(item => item.dateBuy === date && item.cashier === buyer)
            .map(item => item.amount);
          return {
            cashier: buyer,
            date: new Date(date),
            sum: this.getSumOfArray(itemPrices),
            count: itemPrices.length,
            details: this.getDetailsPricesByDate(itemPrices)
          };
        })
    });
  }

  getHeadLineByDate(date, statistic) {
    return statistic.filter(item => item.date === date)[0].headline;
  }

  getSumOfArray(array) {
    return array.reduce((a, b) => a + b, 0);
  }

  getItemsByKey(key, items) {
    return items.filter(item => item === key);
  }

  getDetailsPricesByDate(itemPrices) {
    let uniquePrices = uniq(itemPrices);

    return uniquePrices.map(price => {
      return {
        price: price,
        count: this.getItemsByKey(price, itemPrices).length
      };
    });
  }

  getDetailsSectorsByEvent(itemSectors) {
    let uniqueSectors = uniq(itemSectors);

    return uniqueSectors.map(sector => {
      return {
        sector: sector,
        count: this.getItemsByKey(sector, itemSectors).length
      };
    });
  }

}
