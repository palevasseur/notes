import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatText' })
export class FormatTextPipe implements PipeTransform {
  transform(text: string) {
    return text.split('\n').reduce( (valPre, valCur) => {
      return valPre + '<br>' + valCur;
    });
  }

}
