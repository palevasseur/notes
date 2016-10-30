import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable()
export class NoteService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  notes: Note[] = [
    {
      'id': '91734fe9-ec5b-456a-a081-880e346b641b',
      'keywords':['js','code', 'object'],
      'title':'loop in json object',
      'text':'for (var key in p) {\nif (p.hasOwnProperty(key)) {\nalert(key + " -> " + p[key]);\n}\n}'
    },
    {
      'id': '7cf21204-6368-45a2-83ce-66af80ef6e61',
      'keywords':['js','code', 'array'],
      'title':'search in array',
      'text':'var a = fruits.indexOf("Apple"); // -1 = not found'
    },
    {
      'id': '9a88c66f-5a7b-4152-baab-462033884542',
      'keywords':['js','code', 'array'],
      'title':'push a new project to github',
      'text':'	create the myapp repo on github\n[git remote add origin https://github.com/palevasseur/myapp.git]\n[git push --set-upstream origin master]'
    }

  ];

  constructor() {
  }

  // Simulate POST /notes
  addNote(note: Note): NoteService {
    if (!note.id) {
      note.id = this.generateUUID();
    }
    this.notes.unshift(note);
    return this;
  }

  // Simulate DELETE /notes/:id
  deleteNoteById(id: string): NoteService {
    this.notes = this.notes
      .filter(note => note.id !== id);
    return this;
  }

  // Simulate PUT /notes/:id
  updateNoteById(id: string, values: Object = {}): Note {
    let note = this.getNoteById(id);
    if (!note) {
      return null;
    }
    (<any>Object).assign(note, values);
    return note;
  }

  // Simulate GET /notes
  getAllNotes(): Note[] {
    return this.notes;
  }

  // Simulate GET /notes/:id
  getNoteById(id: string): Note {
    return this.notes
      .filter(note => note.id === id)
      .pop();
  }

  generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
  }

}
