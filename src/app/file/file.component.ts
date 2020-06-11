import { ChangeDetectorRef,
  ChangeDetectionStrategy, Component, OnInit,
  ViewChild,
  Input,
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
})
export class FileComponent implements OnInit {


  text$: Promise<string>;
  @ViewChild('editor', { static: true }) textArea: ElementRef;
  @ViewChild('editorWrapper', { static: true }) editorWrapper: ElementRef;
  @ViewChild('editorToolbar', { static: false }) editorToolbar: ControlPanelComponent;


  userSelection: any;

  @Input() id = '';
  constructor(
    private cd: ChangeDetectorRef,
    private textService: TextService,
    @Inject(DOCUMENT) private doc: any
  ) {
  }


  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }

  executeCommand(command: string) {
    this.textArea.nativeElement.focus();
    this.textService.executeCommand(command);
    this.exec();
  }

  exec() {
    if (this.doc.getSelection) {
      this.userSelection = this.doc.getSelection();
    }
    let a = this.userSelection.focusNode;
    const allSelection = [];
    while (a && a.id !== 'myeditor') {
      allSelection.unshift(a);
      a = a.parentNode;
    }
  }



}
