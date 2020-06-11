import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DOCUMENT } from '@angular/common';

@Injectable()
export class TextService {
  savedSelection: Range | null;
  selectedText: string;


  constructor(private http: HttpClient,
    @Inject(DOCUMENT) private doc: any) {
  }

  getMockText() {
    return new Promise<string>(function (resolve) {
      resolve('A year ago I was in the audience at a gathering of designers in San Francisco. ' +
        'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
        'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
        'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
        'that modern design problems were very complex. And we ought to need a license to solve them.');
    });
  };


  getSynonyms(word: string) {
    return this.http.get<any>('https://api.datamuse.com/words?rel_syn=' + word);
  }

  getDefinition(word: string) {
    return this.http.get<any>('https://api.datamuse.com/words?sp=' + word + '&md=d');

  }
  executeCommand(command: string) {
    this.doc.execCommand(command, false, null);
    this.saveSelection();
  }


  public saveSelection = (): void => {
    if (this.doc.getSelection) {
      const sel = this.doc.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        this.savedSelection = sel.getRangeAt(0);
        this.selectedText = sel.toString();
      }
    }
  }

/* replace word creating a new DOM element */
  replaceSynom(newWord) {
    let sel = this.savedSelection;
    let newNode = document.createElement("synom");
    newNode.setAttribute("id", "synom")
    newNode.appendChild(document.createTextNode(newWord));
  
    if (sel.toString() !== newWord) {
      sel.deleteContents();
      sel.insertNode(newNode);
    } 
  }

  /* check any selection is made or not */
  checkSelection(): any {
    const selectedText = this.savedSelection.toString();
    if (selectedText.length === 0) {
      return false;
    }
    return true;
  }

}
