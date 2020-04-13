import {
  ChangeDetectionStrategy, Component, OnInit,
  ViewChild,
  Attribute,
  Input,
  Output,
  EventEmitter,
  Inject,
  ElementRef
} from '@angular/core';
import { TextService } from '../_services/text.service';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'editor-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {


  text$: Promise<string>;
  @ViewChild('editor', { static: true }) textArea: ElementRef;
  @ViewChild('editorWrapper', { static: true }) editorWrapper: ElementRef;
  @ViewChild('editorToolbar', { static: false }) editorToolbar: ControlPanelComponent;


  modeVisual = true;
  showPlaceholder = false;
  disabled = false;
  focused = false;
  touched = false;
  changed = false;

  userSelection;
  @Output('focus') focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  @Input() id = '';
  constructor(
    private textService: TextService,
    @Inject(DOCUMENT) private doc: any,
    private editorService: TextService,
    @Attribute('autofocus') private autoFocus: any
  ) {
  }


  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }



  executeCommand(command: string) {
    this.textArea.nativeElement.focus();
    this.editorService.executeCommand(command);
    this.exec();
  }


  exec() {


    if (this.doc.getSelection) {
      this.userSelection = this.doc.getSelection();
    }
    let a = this.userSelection.focusNode;

    const allSelection = [];
    while (a && a.id !== 'editor') {
      allSelection.unshift(a);
      a = a.parentNode;
    }
  }



}
