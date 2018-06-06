import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import moment from 'moment-timezone';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'block-row-seat-form',
  templateUrl: 'block-row-seat.html',
  styleUrls: ['./block-row-seat-form.css']
})

export class BlockRowSeatFormComponent implements OnInit {
  @Input() isSeatExist: boolean;
  @Input() message: string;
  @Output() add = new EventEmitter();
  date = moment(new Date(2018, 5, 30)).toISOString();
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      seat: new FormGroup({
        sector: new FormControl('', [Validators.required]),
        row: new FormControl('', [Validators.required]),
        seat: new FormControl('', [Validators.required]),
      }),
      reservedUntil: new FormControl(this.date, [Validators.required])
    });
  }

  public onAdd(): void {
    this.add.emit(this.form.value);
    this.form.setValue({
      seat: {
        sector: '',
        row: '',
        seat: ''
      },
      reservedUntil: this.date
    });
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
  }
}
