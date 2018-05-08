import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin} from 'rxjs/observable/forkJoin';
import * as moment from 'moment';

interface Response {
  img: string
}

@Injectable()
export class PrintTicketService {
  translation = {north: 'Північна', south: 'Південна', east: 'Східна', west: 'Західна'};
  freeMessages = { invitation: 'Запрошення', zero: '0 грн.'};

  constructor(private http: HttpClient) {
  }

  print = (tickets, freeMessageStatus) => {
    forkJoin(tickets.map(ticket => this.http.get(`/api/tickets/abonticket/print/${ticket.accessCode}`)))
      .subscribe(
        (response: Response[]) => {
          let win = window.open(
              '',
              '',
              'left=0,top=0,width=552,height=477,toolbar=0,scrollbars=0,status =0'
            );
          let content = `
            <html>
              <style type=\"text/css\">
                @media print {
                  body {
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 1;
                  }
                  .page-container {
                    page-break-after: always;
                  }
                  b {
                    margin-left: 100px;
                    white-space: nowrap;
                  }
                  .rival {
                     margin: 15px 0 25px 85px;
                     height: 70px;
                     display: flex;
                     align-items: center;
                     text-align: center;
                     position: relative;
                     padding-bottom: 20px;
                     /*border: 1px dotted black;*/
                  }
                  .rival > span {
                    width: 100px;
                    white-space: inherit;
                    text-align: center;
                    max-height: 50px;
                    font-weight: bold;
                  }
                  .rival .date-time {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    font-size: 14px;
                    text-align: center;
                  }
                  .code {
                    padding: 35px 0 0 0;
                    text-align: center;
                  }
                }
                @page {
                  size: 5.5cm 8.5cm;
                }
              </style>
              <body onload="window.print(); window.close();">
                ${tickets.map((ticket, index) => this.generateContent(ticket, response[index].img, freeMessageStatus)).join('')}
              </body>
            </html>
          `;
          win.document.write(content);
          win.document.close();
        },
        err => console.log(err)
      )
  }

  generateContent = (ticket, img, freeMessageStatus) => {
    let label = `${ticket.amount} грн.`;
    if (freeMessageStatus) {
      label = this.freeMessages[freeMessageStatus];
    }
    if (freeMessageStatus === 'custom') {
      label = `${ticket.customPrice} грн.`;
    }
    const headline = ticket.match.headline;
    const rival = headline.substring(headline.indexOf('-') + 1);
    const date = moment(ticket.match.date).format('DD.MM.YYYY');
    const time = moment(ticket.match.date).format('HH:mm');

    return `
    <div class="page-container">
      <div class="rival">
        <span>${rival}</span>
        <div class="date-time">
          <span>${date}</span>
          <br/>
          <span>${time}</span>
        </div>
      </div>
      <b>${this.translation[ticket.tribune]}</b><br>
      <b>${ticket.sector}</b><br>
      <b>${ticket.row}</b><br>
      <b>${ticket.seat}</b><br>
      <b>${label}</b>
      <div class="code">
        <span style="font-size: 16px;text-align: center;font-weight: bold;">${ticket.accessCode}</span>
        <img height="50px" width="185px" src="data:image/png;base64, ${img}">
      </div>
    </div>
  `;
  }
}
