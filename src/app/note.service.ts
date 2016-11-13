import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Note } from './note';

@Injectable()
export class NoteService {

  items: FirebaseListObservable<any[]>;

  constructor(private fireBase: AngularFire) {
  }

  setCategory(notesCategory) {
    this.items = this.fireBase.database.list('/'+notesCategory);
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

}
