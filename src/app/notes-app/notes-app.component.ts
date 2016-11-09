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

  keywords: string = '';
  searchKeywords: string[] = [];
  displayNewNote: boolean = false;
  newNote: Note = new Note();

  constructor(private noteService: NoteService) {
  }

  ngOnInit() {
  }

  addNote() {
    if(this.keywords) {
      this.newNote.keywords = this.keywords.split(' ');
    }

    this.noteService.addNote(this.newNote);
    this.newNote = new Note();

  }

  removeNote(note) {
    this.noteService.deleteNoteById(note.$key);
  }

  search() {
    this.searchKeywords = this.keywords.split(' ');
  }

  get notes() {
    return this.noteService.getAllNotes();
  }

}
