import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Note } from './note';

@Injectable()
export class NoteService {

  items: FirebaseListObservable<any[]>;

  constructor(private fireBase: AngularFire) {
  }

  setDomain(notesDomain) {
    this.items = this.fireBase.database.list('/'+notesDomain);
  }

  addNote(note: Note) {
    if(this.items) {
      this.items.push(note);
    }
  }

  deleteNoteById(id: string) {
    if (this.items && id) {
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

  getNotes(keywordsInput:string) : Note[] {
    this.updateDbgCache();
    let firstKeyword = keywordsInput.split(' ')[0]; // todo: only take the first, add multiple keywordsInput
    return this.notes.filter(note => {
      return !note.keywordsInput ? false : note.keywordsInput.some(k => {
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
