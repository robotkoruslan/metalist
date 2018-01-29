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

  generateContent = (ticket, img) => `
    <div>
      <b>${this.translation[ticket.seat.tribune]}</b><br>
      <b>${ticket.seat.sector}</b><br>
      <b>${ticket.seat.row}</b><br>
      <b>${ticket.seat.seat}</b><br>
      <b>${ticket.amount}</b><br>
      <b>${ticket.accessCode}</b><br>
      <img src="data:image/png;base64, ${img}">
    </div>
  `;

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
                    font-size: 0.5cm;
                  }
                
                  img {
                    height: 50px;
                    width: auto;
                  }
                  
                  div {
                    margin-bottom: 110px;
                  }
                  
                  div:last-child {
                    margin-bottom: 0;
                  }
                  
                  @page {
                    size: 5.5cm 8.5cm;/* width height */
                  }
                }
              </style>
              <body onload="window.print(); window.close();">
                ${tickets.map((ticket, index) => this.generateContent(ticket, response[index].img)).join('<br>')}
              </body>  
            </html>
          `;
          win.document.write(content);
          win.document.close();
        },
        err => console.log(err)
      )
  }
}
