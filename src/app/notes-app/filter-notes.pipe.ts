import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterNotes' })
export class FilterNotesPipe implements PipeTransform {
  transform(allNotes: any[], searchKeywords) {
    if(!allNotes) {
      return [];
    }

    if(!searchKeywords || searchKeywords.length==0) {
      return allNotes;
    }

    return allNotes.filter(note => {
      if(!note.keywords) {
        return false;
      }

      return note.keywords.some(keyword => searchKeywords.some(searchKeyword => keyword==searchKeyword));
    });
  }
}
