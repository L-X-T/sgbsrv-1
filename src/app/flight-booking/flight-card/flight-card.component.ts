import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})
export class FlightCardComponent implements OnInit, OnChanges {
  debug = false;

  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<void>();

  ngOnChanges(): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - OnChanges()]');
      console.log(this.item);
      console.log('selected: ' + this.selected);
    }
  }

  ngOnInit(): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ngOnInit()]');
      console.log(this.item);
      console.log('selected: ' + this.selected);
    }
  }

  select(): void {
    this.selected = true;
    this.selectedChange.next(this.selected);
  }

  deselect(): void {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }
}
