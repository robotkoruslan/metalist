import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import bwipjs from 'bwip-js/browser-bwipjs';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.less']
})

export class TicketDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: any) {
  }

  ngOnInit() {
    bwipjs('mycanvas', {
      bcid: 'code128',
      text: this.ticket.accessCode,
      scale: 3,
      height: 10,
      includetext: false,
      textxalign: 'center',
    }, (err, cvs) => {
      if (err) {
        this.dialogRef.close();
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
