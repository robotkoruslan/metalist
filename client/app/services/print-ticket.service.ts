import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin} from 'rxjs/observable/forkJoin';

interface Response {
  img: string
}

@Injectable()
export class PrintTicketService {
  translation = {north: 'Северная', south: 'Южная', east: 'Восточная', west: 'Западная'};


  constructor(private http: HttpClient) {
  }

  print = (tickets) => {
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
                    margin-left: 100px
                  }
                  .rival {
                     margin: 30px 0 35px 100px;
                     height: 65px;
                     display: flex;
                     align-items: center;
                     text-align: center;
                  }
                  .rival span {
                    width: 100px;
                    white-space: inherit;
                    word-break: break-all;
                    overflow: hidden;
                    max-height: 65px;
                    font-weight: bold;
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
                ${tickets.map((ticket, index) => this.generateContent(ticket, response[index].img)).join('')}
              </body>
            </html>
          `;
          win.document.write(content);
          win.document.close();
        },
        err => console.log(err)
      )
  }

  generateContent = (ticket, img) => {
    const rival = ticket.match.headline.split(' ').reverse()[0];
    return `
    <div class="page-container">
      <div class="rival"><span>${rival}</span></div>
      <b>${this.translation[ticket.seat.tribune]}</b><br>
      <b>${ticket.seat.sector}</b><br>
      <b>${ticket.seat.row}</b><br>
      <b>${ticket.seat.seat}</b><br>
      <b>${ticket.amount}</b>
      <div class="code">
        <span style="font-size: 16px;text-align: center;font-weight: bold;">${ticket.accessCode}</span>
        <img height="50px" width="185px" src="data:image/png;base64, ${img}">
      </div>
    </div>
  `;
  }
}
