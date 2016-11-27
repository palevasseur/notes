import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Note} from './note';

@Injectable()
export class NoteService {

  private items: FirebaseListObservable<any[]>;

  constructor(private fireBase: AngularFire) {
  }

  getCategories() {
    return [
      {name: 'Items', value: 'items'},
      {name: 'Code', value: 'code'},
      {name: 'Photo', value: 'photo'},
      {name: 'Perso', value: 'perso'}
    ];
  }

  setCategory(notesCategory) {
    this.items = this.fireBase.database.list('/' + notesCategory);
  }

  addNote(note: Note) {
    if (this.items) {
      this.items.push(note);
    }
  }

  updateNote(key: string, note: Note) {
    if (this.items) {
      this.items.update(key, note);
    }
  }

  deleteNoteById(key: string) {
    if (this.items && key) {
      this.items.remove(key);
    }
  }

  getAllNotes(): FirebaseListObservable<any[]> {
    return this.items;
  }

}
