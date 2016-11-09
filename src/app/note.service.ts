import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Note } from './note';

@Injectable()
export class NoteService {

  items: FirebaseListObservable<any[]>;

  constructor(fireBase: AngularFire) {
    this.items = fireBase.database.list('/items');
  }

  addNote(note: Note) {
    this.items.push(note);
  }

  deleteNoteById(id: string) {
    if(id) {
      this.items.remove(id);
    }
  }

  getAllNotes(): FirebaseListObservable<any[]> {
    return this.items;
  }

  /*
  // Simulate PUT /notes/:id
  updateNoteById(id: string, values: Object = {}): Note {
    let note = this.getNoteById(id);
    if (!note) {
      return null;
    }
    (<any>Object).assign(note, values);
    return note;
  }

  getNotes(keywords:string) : Note[] {
    this.updateDbgCache();
    let firstKeyword = keywords.split(' ')[0]; // todo: only take the first, add multiple keywords
    return this.notes.filter(note => {
      return !note.keywords ? false : note.keywords.some(k => {
        return (k === firstKeyword);
      });
    });
  }

  // Simulate GET /notes/:id
  getNoteById(id: string): Note {
    return this.notes
      .filter(note => note.id === id)
      .pop();
  }
*/
}
