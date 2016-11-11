import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { FirebaseListObservable } from 'angularfire2';

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

  keywordsInput: string = '';
  searchKeywords: string[][] = []; // js, obj test => [['js'], ['obj', 'test']] => js OR (obj AND test)
  displayNewNote: boolean = false;
  newNote: Note = new Note();

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
  }

  addNote() {
    if(this.keywordsInput) {
      this.newNote.keywords = this.flatten(this.computeKeywords(this.keywordsInput));
    }

    this.noteService.addNote(this.newNote);
    this.newNote = new Note();

  }

  removeNote(note) {
    this.noteService.deleteNoteById(note.$key);
  }

  flatten(keywords: string[][]) : string[] {
    return [].concat.apply([], keywords);
  }

  computeKeywords(keywordsInput: string) : string[][] {
    let searchKeywords = [];
    if(keywordsInput) {
      keywordsInput.split(',').forEach(keywords => searchKeywords.push(keywords.split(' ').filter(kw => !!kw)));
    }

    return searchKeywords;
  }

  search() {
    this.searchKeywords = this.computeKeywords(this.keywordsInput);
  }

  get notes() {
    return this.noteService.getAllNotes();
  }

}
