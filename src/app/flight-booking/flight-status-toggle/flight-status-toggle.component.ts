import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css']
})
export class FlightStatusToggleComponent {
  @Input() status: boolean;
  @Output() statusChange = new EventEmitter<boolean>();

  toggle(): void {
    this.statusChange.emit(!this.status);
  }
}
