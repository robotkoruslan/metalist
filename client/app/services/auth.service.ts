import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  messages: string[] = [];
  constructor() { }

    add(message: string) {
    console.log('MessageService add');
    this.messages.push(message);
  }

}


// import { Injectable } from '@angular/core';
//
// @Injectable()
// export class MessageService {
//   messages: string[] = [];
//
//   add(message: string) {
//     console.log('MessageService add');
//     this.messages.push(message);
//   }
//
//   clear() {
//     this.messages.length = 0;
//   }
// }
