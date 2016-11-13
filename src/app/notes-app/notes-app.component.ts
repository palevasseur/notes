import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

/*
 todo:
  - manage firebase auth. : { "rules": { ".read": "auth != null", ".write": "auth != null" } }
 */

@Component({
  selector: 'app-notes-app',
  templateUrl: './notes-app.component.html',
  styleUrls: ['./notes-app.component.css'],
  providers: [NoteService]
})
export class NotesAppComponent implements OnInit {

  keywordsInput: string = ''; // ex: js, obj test
  keywordsFilter: string[][] = []; // ex: js, obj test => [['js'], ['obj', 'test']] => js OR (obj AND test)
  displayNewNote: boolean = false;
  newNote: Note = new Note();

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.setCategory('items'); // change default => change also html <select> / selected
  }

  private static flatten(keywords: string[][]): string[] {
    return [].concat.apply([], keywords);
  }

  formatDate(date: number) {
    return (new Date(date)).toString();
  }

  categoryChanged(newVal) {
    this.noteService.setCategory(newVal);
  }

  addNote() {
    if (this.keywordsInput) {
      this.newNote.keywords = NotesAppComponent.flatten(this.computeKeywords(this.keywordsInput));
    }

    this.noteService.addNote(this.newNote);
    this.newNote = new Note();

  }

  removeNote(note) {
    this.noteService.deleteNoteById(note.$key);
  }

  search() {
    this.keywordsFilter = this.computeKeywords(this.keywordsInput);
  }

  get notes() {
    return this.noteService.getAllNotes();
  }

  private computeKeywords(keywordsInput: string): string[][] {
    let keywordsFilter = [];
    if (keywordsInput) {
      keywordsInput
        .toLowerCase()
        .split(',')
        .forEach(
          keywords => keywordsFilter.push(
            keywords.split(' ').filter(kw => !!kw)
          )
        );
    }

    return keywordsFilter;
  }

}
