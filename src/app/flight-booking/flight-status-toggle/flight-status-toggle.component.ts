import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css']
})
export class FlightStatusToggleComponent implements OnInit {
  @Input() status: boolean;
  @Output() statusChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggle(): void {
    this.statusChange.emit(!this.status);
  }
}
