import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { TextService } from './example/_services/text.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'texteditor-angular';

  synoms: any;
  form: FormGroup;
  errorMsg: string;


  synFor: string;
  allSynons: any;
  defObj: any;
  defArray : any[];

  showSynon = false;
  showSection = false;
  text$: Promise<string>;
  maiText: any;
  constructor(private formBuilder: FormBuilder, private textService: TextService, ) { }

  ngOnInit() {


    this.maiText = this.textService.getMockText();

    this.form = this.formBuilder.group({
      signature: [this.maiText, Validators.required]
    });

  }

  searchSyn() {
    this.showSection = true;
    this.textService.saveSelection();
    if (this.textService.checkSelection()) {

      this.synFor = this.textService.selectedText;

      this.textService.getSynonyms(this.synFor).pipe()
        .subscribe(
          data => {

            if (data.length > 0) {
              this.allSynons = data;
             // this.fillTooltip(this.allSynons);
              this.showSynon = true;
              // this.textService.replaceSynom(data[0].word)
            } else {
              this.clearSynon();
            }


          }
        )

    } else {
      this.clearSynon();
    }
  }

  replaceWord(newWord) {
    this.textService.replaceSynom(newWord)
  }

  setDefinition(getWord){
    const arr :{}[] = [];
console.log('this.setDefinition')
    this.textService.getDefinition(getWord)
    .pipe(first())
    .subscribe(
      {
        next(data) {
          arr.push({
            word: getWord,
            definition: data[0].defs
          });


        },
        error(msg) {
          console.log('Error Getting Location: ', msg);
        }
      }
    );

    this.defObj = arr;
console.log(this.defObj)

  }

  fillTooltip(getWords) {


    const arr :{}[] = [];

    getWords.forEach(el => {

      this.textService.getDefinition(el.word)
      .pipe(first())
      .subscribe(
        {
          next(data) {
            arr.push({
              word: el.word,
              definition: data[0].defs
            });
          },
          error(msg) {
            console.log('Error Getting Location: ', msg);
          }
        }
      );


    });
    this.defArray = arr;
    console.log(this.defArray, 'todo')

  }
  clearSynon() {
    this.showSynon = false;
    this.errorMsg = "No Synonyms fund";
  }

}
