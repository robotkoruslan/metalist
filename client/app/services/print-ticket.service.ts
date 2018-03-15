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
                  b {
                    margin-left: 100px
                  }
                  .rival {
                     margin: 50px 0 50px 100px;
                     text-align: center;
                     font-weight: bold;
                  }
                  .test {
                    margin-bottom: 20px;
                  }
                  .code {
                    padding: 30px 0 24px 0;
                    font-size: 20px;
                    width: 100%;
                    margin-right: -5px;
                    text-align: center;
                   
                  }
                  img {
                    margin-left: -5px;
                  }
                  
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
    <div style="border:1px solid transparent;">
      <div class="rival">
        <span>${rival}</span>
      </div>
      <b>${this.translation[ticket.seat.tribune]}</b><br>
      <b>${ticket.seat.sector}</b><br>
      <b>${ticket.seat.row}</b><br>
      <b>${ticket.seat.seat}</b><br>
      <b class="test">${ticket.amount}</b>
      <div class="code">
        <span style="font-size: 20px;text-align: center;font-weight: bold;">${ticket.accessCode}</span>
        <img height="52px" src="data:image/png;base64, ${img}">
      </div>
    </div>
  `;
  }
}
