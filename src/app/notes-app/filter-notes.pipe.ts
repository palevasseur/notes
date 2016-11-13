import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterNotes' })
export class FilterNotesPipe implements PipeTransform {
  transform(allNotes: any[], keywordsFilter: string[][]) {
    if (!allNotes) {
      return [];
    }

    if (!keywordsFilter || keywordsFilter.length === 0) {
      return FilterNotesPipe.sortNotes(allNotes);
    }

    // filter notes according to the keywords
    let notesFiltered = allNotes.filter(note => {
      if (!note.keywords) {
        return false;
      }

      // keywordsFilter ex: input='js, obj test' => [['js'], ['obj', 'test']] => js OR (obj AND test)
      return keywordsFilter.some( // must match one of kws list
        kwsNeedAllMatch => kwsNeedAllMatch.every( // must match all the kws of the list
          kw => note.keywords.some(
            kwNote => kwNote === kw
          )
        )
      );

    });

    return FilterNotesPipe.sortNotes(notesFiltered);
  }

  private static sortNotes(notes: any[]) : any[] {
    return notes.sort((a, b) => {
      if(!a.date && !b.date) {
        return 0;
      }

      if(a.date && !b.date) {
        return -1;
      }

      if(!a.date && b.date) {
        return 1;
      }

      return a.date >= b.date ? -1 : 1;
    });
  }
}
