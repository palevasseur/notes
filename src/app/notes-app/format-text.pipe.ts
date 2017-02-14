import {Pipe, PipeTransform} from '@angular/core';
import {plantUrl} from "../utils/plantuml";

@Pipe({name: 'formatText'})
export class FormatTextPipe implements PipeTransform {
  // note: to manage space, tab and \n <note> component use "white-space: pre-wrap;" for <md-card-content>
  transform(text: string) {
    // html link
    text = text.replace(/(https?:\/\/[^ \n\r()]+)/gi, (match, $1) => {
      return '<a href="' + $1 + '" >' + $1 + '</a>';
    });

    // plantuml tag => uml diagram
    text = text.replace(/@startuml((?:.|\n|\r)*?)@enduml/gi, (match, $1) => {
      return '<img src="' + plantUrl($1) + '" />';
    });

    // uml sequence tag => uml diagram
    text = text.replace(/@umlseq((?:.|\n|\r)*?)@umlseq/gi, (match, $1) => {
      let plantumlCode = this.diagramSequence($1);
      return '<img src="' + plantUrl(plantumlCode) + '" />';
    });

    // uml class tag => uml diagram
    text = text.replace(/@uml((?:.|\n|\r)*?)@uml/gi, (match, $1) => {
      let plantumlCode = this.diagramClass($1);
      return '<img src="' + plantUrl(plantumlCode) + '" />';
    });

    return text;
  }

  /*
   AbstractCacheManager <<abstract>>
     refresh()
     refreshIndex() {abstract}

   ComminglingCacheManager
     refreshIndex()
     --|> AbstractCacheManager
     ..> RcsIndexer
     --> "1" File
   */
  private diagramClass(code) {
    let plantCode = `
skinparam handwritten true
hide footbox
hide empty fields
hide empty methods
`;
    let currentClass = '';
    code.split('\n').forEach(line => {
      // set current class def
      if (/^([a-zA-Z]+)/g.test(line)) {
        currentClass = line.split(' ')[0];
      }

      // no tab => class name def
      // tab => class properties
      // class name => plantuml not need it
      // class with abstract prop => plantuml need to define
      [
        { regex: /^([a-zA-Z]+) *(<<abstract>>)/g,
          compute: (line, className) => (line)
        },
        { regex: /^ +(\w+)/g,
          compute: (line, className) => (className + ' : ' + line)
        },
        { regex: /^ +(\.\.>) +/g,
          compute: (line, className) => (className + line)
        },
        { regex: /^ +(-->) +/g,
          compute: (line, className) => (className + line)
        },
        { regex: /^ +(--\|>) +([a-zA-Z]+)/g,
          compute: (line, className) => line.replace(/^ +(--\|>) +([a-zA-Z]+)/g, (_, $1, $2) => ($2 + ' <|-- ' + className))
        }
      ].some(rule => {
        if(rule.regex.test(line)) {
          plantCode += rule.compute(line, currentClass) + '\n';
          return true;
        }
        return false;
      });

    });

    return plantCode;
  }

  private diagramSequence(code) {
    return '[SEQUENCE]';
  }
}
