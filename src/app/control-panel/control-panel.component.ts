import { ChangeDetectionStrategy } from '@angular/core';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'editor-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})

export class ControlPanelComponent {
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();


  constructor( ) {
  }



  setCommand( option: string) {
    this.execute.emit(option);
  }

}
