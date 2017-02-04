import {Pipe, PipeTransform} from '@angular/core';
import {plantUrl} from "../utils/plantuml";

@Pipe({name: 'formatText'})
export class FormatTextPipe implements PipeTransform {
  transform(text: string) {
    // tab = 2 spaces
    text = text.replace(/\t/g, '  ');

    // html link
    text = text.replace(/(https?:\/\/[^ \n\r()]+)/gi, (match, $1) => {
      return '<a target="_top" href="' + $1 + '" >' + $1 + '</a>';
    });

    // uml tag => uml diagram
    text = text.replace(/@startuml((?:.|\n|\r)*?)@enduml/gi, (match, $1) => {
      return '<img src="' + plantUrl($1) + '" />';
    });

    // space => &nbsp;
    text = text.replace(/^( *)/gm, (match, $1) => {
      let nbrSpaces = match.length;
      let res = '';
      while (nbrSpaces) {
        res += '&nbsp;&nbsp;';
        nbrSpaces--;
      }
      return res;
    });

    // endline => <br>
    text = text.split('\n').reduce((valPre, valCur) => {
      return valPre + '<br>' + valCur;
    });

    return text;
  }

}
