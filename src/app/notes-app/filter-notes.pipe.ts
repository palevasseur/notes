import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterNotes' })
export class FilterNotesPipe implements PipeTransform {
  transform(allNotes: any[], searchKeywords: string[][]) {
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

      // searchKeywords ex: input='js, obj test' => [['js'], ['obj', 'test']] => js OR (obj AND test)
      return searchKeywords.some( // must match one of kws list
        kwsNeedAllMatch => kwsNeedAllMatch.every( // must match all the kws of the list
          kw => note.keywords.some(
            kwNote => kwNote==kw
          )
        )
      );

    });
  }
}
