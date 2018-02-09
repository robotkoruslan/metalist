import {Component, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-days-statistic',
  templateUrl: './days-statistic.component.html',
  styleUrls: ['./days-statistic.component.css']
})
export class DaysStatisticComponent implements OnInit {

  statistics: any = [];
  date: Date = new Date();

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.getStatistics({
      date: event.value.toISOString(),
      metod: 'day'
    });
  }

  constructor(private ticketsService: TicketService) {
  }

  ngOnInit() {
    this.getStatistics({
      date: this.date.toISOString(),
      metod: 'day'
    });
  }

  getStatistics(date) {
    this.ticketsService.getStatistics(date).subscribe(statistic => {
      this.statistics = statistic;
    });
  }

  isStatistics() {
    return this.statistics;
  }

  getAmount() {
    return this.statistics.reduce((sum, current) => {
      return sum + current.sum;
    }, 0);
  }

}
