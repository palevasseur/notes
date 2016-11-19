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

  category: string = 'items';

  // keywords search
  keywordsInput: string = ''; // ex: js, obj test
  keywordsFilter: string[][] = []; // ex: js, obj test => [['js'], ['obj', 'test']] => js OR (obj AND test)

  // new note
  newNote: Note = null;
  displayNewNote: boolean = false;
  keywordsNewNote: string = ''; // keywords list associated on note, ex; js, obj, test

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
    this.noteService.setCategory(this.category);
  }

  private static flatten(keywords: string[][]): string[] {
    return [].concat.apply([], keywords);
  }

  formatDate(date: number) {
    return (new Date(date)).toString();
  }

  categoryChanged() {
    this.noteService.setCategory(this.category);
  }

  toggleNewNote() {
    this.displayNewNote = !this.displayNewNote;
    if(this.displayNewNote) {
      this.newNote = new Note();
      // init new note keywords with current keywords search
      this.keywordsNewNote = NotesAppComponent.flatten(this.computeKeywords(this.keywordsInput)).join(',');
    }
  }

  addNote() {
    if (this.keywordsInput) {
      this.newNote.keywords = NotesAppComponent.flatten(this.computeKeywords(this.keywordsNewNote));
    }

    this.noteService.addNote(this.newNote);
    this.displayNewNote = false;
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
