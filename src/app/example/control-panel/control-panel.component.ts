import { ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'editor-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ControlPanelComponent {
  htmlMode = false;
  linkSelected = false;
  block = 'default';


  buttons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter',
    'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'link'];

    @Input()
    set sinonimo(newWord: string ) {

    }

  @Output() execute: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private r: Renderer2,
    @Inject(DOCUMENT) private doc: any
  ) {
  }



  setCommand( option: string) {
    this.execute.emit(option);
  }

}
